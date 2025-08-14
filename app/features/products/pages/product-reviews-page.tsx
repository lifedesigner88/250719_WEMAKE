import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import type { Route } from "./+types/product-reviews-page";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "~/features/products/components/create-review-dialog";
import { useState } from "react";

import { data } from "react-router";
import { z } from "zod";
import { getProductReviewCount, getProductReviews, createProductReview } from "~/features/products/queries";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Product Reviews | wemake" },
        { name: "description", content: "Read and write product reviews" },
    ];
}

export const loader = async ({ params: { productId }, request }: Route.LoaderArgs) => {

    const { client } = makeSSRClient(request);
    const parsed = z.coerce.number().safeParse(productId);
    if (!parsed.success)
        throw data({ error_code: "invalid_params", message: "Invalid product id" }, { status: 400 });
    const pid = parsed.data;
    const [reviews, count] = await Promise.all([
        getProductReviews(client, { productId: pid, page: 1, limit: 20 }),
        getProductReviewCount(client, { productId: pid })
    ]);

    return { reviews, count, productId: pid };
};

export const action = async ({ request, params: { productId } }: Route.ActionArgs) => {

    const formData = await request.formData();
    const parsedId = z.coerce.number().safeParse(productId);

    if (!parsedId.success) console.log("error");
    const product_id: number = parsedId.data!;

    const formSchema = z.object({
        rating: z.coerce.number().min(1).max(5),
        review: z.string().min(1).max(1000),
    })
    const { data, error } = formSchema.safeParse(Object.fromEntries(formData));
    if (error) throw error;
    const { rating, review } = data;

    const profile_id = await getLoggedInUserId(request)
    await createProductReview(request, { product_id, profile_id, rating, review });
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
                            username={r.profile.name}
                            handle={`@${r.profile.username}`}
                            avatarUrl={r.profile.avatar ?? ""}
                            rating={r.rating}
                            content={r.review}
                            postedAt={DateTime.fromISO(r.created_at!).toRelative()!}
                        />
                    ))}
                    {loaderData.reviews.length === 0 && (
                        <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
                    )}
                </div>
            </div>
            <CreateReviewDialog isDialogOpen={open}/>
        </Dialog>
    );
}