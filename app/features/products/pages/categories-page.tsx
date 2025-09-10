import type { Route } from "./+types/categories-page";
import PageHeader from "~/common/components/page-header";
import CategoryCard from "~/features/products/components/category-card";
import { ProductPagination } from "~/common/components/product-pagination";
import { getCategories, getCategoryPages } from "~/features/products/queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

    const { client  } = makeSSRClient(request)

    const [categories, totalPages] = await Promise.all([
        getCategories(client, { page, limit: 12 }),
        getCategoryPages(client),
    ]);

    return {
        categories,
        totalPages,
    };
}

export const meta: Route.MetaFunction = () => [
    { title: "Categories | WeMake" },
    { name: "description", content: "Browse products by category" },
];

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
    return <div>
        <PageHeader title={"Categories"} description={"Browse products by category"}/>
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"}>
            {loaderData.categories.map((c: any) => (
                <CategoryCard
                    key={`${c.category_id}`}
                    categoryId={`${c.category_id}`}
                    name={c.name}
                    description={c.description}
                />
            ))}
        </div>
        <ProductPagination totalPages={loaderData.totalPages}/>
    </div>
}
