import type { Route } from "./+types/categorie-page";
import { data } from "react-router";
import PageHeader from "~/common/components/page-header";
import ProductCard from "~/features/products/components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductsByCategory, getProductPagesByCategory } from "~/features/products/queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const categoryParam = params.category;

    const categoryId = Number(categoryParam);
    if (!categoryParam || Number.isNaN(categoryId)) {
        throw data({ error_code: "invalid_params", message: "Invalid category id" }, { status: 400 });
    }
    const { client, headers } = makeSSRClient(request)

    // fetch category info
    const { data: category, error: categoryError } = await client
        .from("categories")
        .select("category_id, name, description")
        .eq("category_id", categoryId)
        .single();
    if (categoryError) throw new Error(categoryError.message);



    const [products, totalPages] = await Promise.all([
        getProductsByCategory(client,{ categoryId, page, limit: 8 }),
        getProductPagesByCategory(client, { categoryId }),
    ]);

    return {
        category,
        products,
        totalPages,
    };
}

export const meta: Route.MetaFunction = ({ data: loaderData }) => {
    if (!loaderData) return [{ title: "Category | WeMake" }];
    return [
        { title: `${loaderData.category?.name} | WeMake` },
        { name: "description", content: loaderData.category?.description ?? "Browse products by category" },
    ];
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
    const { category, products, totalPages } = loaderData;
    return (
        <div className="space-y-10">
            <PageHeader title={category.name} description={category.description} />
            <div className={"space-y-5 w-full max-w-screen-md mx-auto"}>
                {products.map((p: any) => (
                    <ProductCard
                        key={p.product_id}
                        productId={p.product_id}
                        name={p.name}
                        description={p.tagline}
                        commentsCount={p.reviews}
                        viewsCount={p.views}
                        upvotes={p.upvotes}
                    />
                ))}
            </div>
            <ProductPagination totalPages={totalPages} />
        </div>
    )
}