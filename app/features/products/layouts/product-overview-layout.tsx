import { StarIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { NavLink, Outlet, data, Link } from "react-router";
import { Avatar, AvatarImage } from "~/common/components/ui/avatar";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";
import { getProductFromId } from "~/features/products/queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export function meta({ data }: Route.MetaArgs) {
    if (!data) return [{ title: "Product Overview | wemake" }];
    return [
        { title: `${data.product.name} Overview | wemake` },
        { name: "description", content: "View product details and information" },
    ];
}

export const loader = async ({ params: { productId }, request }: Route.LoaderArgs) => {
    const { client  } = makeSSRClient(request)
    const parsed = z.coerce.number().safeParse(productId);
    if (!parsed.success)
        throw data({ error_code: "invalid_params", message: "Invalid product id" }, { status: 400 });
    const product = await getProductFromId(client, parsed.data);
    return { product }
}

export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
    const { product } = loaderData;
    return (
        <div className="space-y-10">
            <div className="flex justify-between">
                <div className="flex gap-10">
                    <div className="size-40 rounded-xl shadow-xl bg-primary/50">
                        <Avatar className="w-full h-full rounded-xl">
                            <AvatarImage
                                src={product.icon}
                                alt={product.name}
                                className="object-cover rounded-xl"
                            />
                        </Avatar>
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p className=" text-2xl font-light">{product.tagline}</p>
                        <div className="mt-5 flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className="size-4"
                                        fill={
                                            i < Math.floor(loaderData.product.average_rating || 0)
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground ">{product.reviews} reviews</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5">
                    <Button
                        variant={"secondary"}
                        size="lg"
                        className="text-lg h-14 px-10"
                        asChild
                    >
                        <Link to={`/products/${loaderData.product.product_id}/visit`}>
                            Visit Website
                        </Link>
                    </Button>
                    <Button size="lg" className="text-lg h-14 px-10">
                        <ChevronUpIcon className="size-4"/>
                        Upvote ({product.upvotes})
                    </Button>
                </div>
            </div>
            <div className="flex gap-2.5">
                <NavLink
                    end
                    className={({ isActive }) =>
                        cn( // 버튼 의 속성을 가지고 오는 함수.
                            buttonVariants({ variant: "outline" }),
                            isActive && "hover:bg-red-600  hover:text-white bg-red-600 text-white "
                        )
                    }
                    to={`/products/${product.product_id}/overview`}
                >
                    Overview
                </NavLink>
                <NavLink
                    end
                    className={({ isActive }) =>
                        cn(
                            buttonVariants({ variant: "outline" }),
                            isActive && "hover:bg-red-600 hover:text-white bg-red-600 text-white "
                        )
                    }
                    to={`/products/${product.product_id}/reviews`}
                >
                    Reviews
                </NavLink>
            </div>
            <div>
                <Outlet context={{
                    description: product.description,
                    how_it_works: product.how_it_works
                }}/>
            </div>
        </div>
    );
}