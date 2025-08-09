import type { Route } from "./+types/search-page";
import { z } from "zod";
import PageHeader from "~/common/components/page-header";
import ProductCard from "~/features/products/components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getSearchProductPages, searchProducts } from "~/features/products/queries";

// 입력 형태를 안전하게 필터링
const paramsSchema = z.object({
    query: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const parsed = paramsSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!parsed.success) throw parsed.error;

    const { query, page } = parsed.data;
    const trimmed = query.trim();

    if (!trimmed) {
        return {
            query: "",
            page,
            products: [],
            totalPages: 1,
        };
    }

    const [products, totalPages] = await Promise.all([
        searchProducts({ query: trimmed, page }),
        getSearchProductPages({ query: trimmed }),
    ]);

    return {
        query: trimmed,
        page,
        products,
        totalPages,
    };
}

export const meta: Route.MetaFunction = ({ data }) => {
    const q = data?.query ? `"${data.query}" ` : "";
    return [
        { title: `${q}search | WeMake` },
        { name: "description", content: "Search for products" },
    ];
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
    const { query, products, totalPages } = loaderData;
    return (
        <div className={"space-y-20"}>
            <PageHeader title={"Search for products by title or tagline"}/>
            <Form className={"flex max-w-screen-sm mx-auto gap-2"}>
                <Input name={"query"} placeholder={"Search for products"} defaultValue={query ?? ""}/>
                <Button type={"submit"}>Search</Button>
            </Form>

            <div className="grid grid-cols-2 gap-10 space-y-5 w-full max-w-screen mx-auto">
                {products.map((p: any) => (
                    <ProductCard
                        key={p.product_id}
                        productId={`${p.product_id}`}
                        name={p.name}
                        description={p.tagline}
                        commentsCount={p.reviews}
                        viewsCount={p.views}
                        upvotes={p.upvotes}
                    />
                ))}
            </div>
            <ProductPagination totalPages={totalPages}/>
        </div>
    );
}