import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import type { Route } from "./+types/product-reviews-page";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "~/features/products/components/create-review-dialog";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
    return [
        { title:"Product Reviews | wemake" },
        { name:"description", content:"Read and write product reviews" },
    ];
}

import { data, redirect } from "react-router";
import { z } from "zod";
import { getProductReviewCount, getProductReviews, createProductReview } from "~/features/products/queries";
import supabase from "~/supa-client";

export const loader = async ({ params: { productId } }: Route.LoaderArgs) => {
    const parsed = z.coerce.number().safeParse(productId);
    if (!parsed.success)
        throw data({ error_code: "invalid_params", message: "Invalid product id" }, { status: 400 });
    const pid = parsed.data;
    const [reviews, count] = await Promise.all([
        getProductReviews({ productId: pid, page: 1, limit: 20 }),
        getProductReviewCount({ productId: pid })
    ]);
    return { reviews, count, productId: pid };
};

export const action = async ({ request, params: { productId } }: Route.ActionArgs) => {
    const formData = await request.formData();
    const parsedId = z.coerce.number().safeParse(productId);
    if (!parsedId.success)
        throw data({ error: "Invalid product id" }, { status: 400 });
    const pid = parsedId.data;

    const rating = z.coerce.number().int().min(1).max(5).safeParse(formData.get("rating"));
    const review = z.string().min(1).max(1000).safeParse(formData.get("review"));
    if (!rating.success || !review.success)
        throw data({ error: "Invalid form data" }, { status: 400 });

    // 임시로 가지고 온 프로파일.
    const { data: profileRow, error: profileError } = await supabase
        .from("profiles")
        .select("profile_id")
        .limit(1)
        .single();
    if (profileError || !profileRow?.profile_id)
        throw data({ error: "No profile available" }, { status: 400 });

    await createProductReview({ productId: pid, profileId: profileRow.profile_id, rating: rating.data, review: review.data });
    return redirect(`/products/${pid}/reviews`);
};

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog onOpenChange={() => setOpen(!open)}>
            <div className="space-y-10 max-w-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{loaderData.count} Reviews</h2>
                    <DialogTrigger asChild>
                        <Button variant={"secondary"}>Write a review</Button>
                    </DialogTrigger>
                </div>
                <div className="space-y-20">
                    {loaderData.reviews.map((r) => (
                        <ReviewCard
                            key={r.review_id}
                            username={r.profile.name ?? "Anonymous"}
                            handle={r.profile.username ? `@${r.profile.username}` : ""}
                            avatarUrl={r.profile.avatar ?? ""}
                            rating={r.rating}
                            content={r.review}
                            postedAt={new Date(r.created_at).toLocaleDateString()}
                        />
                    ))}
                    {loaderData.reviews.length === 0 && (
                        <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
                    )}
                </div>
            </div>
            <CreateReviewDialog isDialogOpen={open} />
        </Dialog>
    );
}