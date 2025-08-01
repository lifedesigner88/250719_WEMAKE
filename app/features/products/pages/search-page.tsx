import type { Route } from "./+types/search-page";
import { z } from "zod";
import PageHeader from "~/common/components/page-header";
import ProductCard from "~/features/products/components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

// 입력 형테를 안전하게 필터링 해주는 역할.
const paramssSchema = z.object({
    query:z.string().optional().default(""),
    page:z.coerce.number().optional().default(1)
})

export const loader = ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    console.log(url.searchParams);
    const params = paramssSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!params.success) throw params.error;
    console.log(params.data);
}

export const meta: Route.MetaFunction = () => {
    return [
        { title:"search | wemake" },
        { name:"discription", content:"Search for products" }
    ];
}


export default function SearchPage() {
    return (
        <div className={"space-y-20"}>
            <PageHeader title={"Search "} description={"Search for products by title or description"}/>

            <Form className={"flex max-w-screen-sm mx-auto gap-2"}>
                <Input name={"query"} placeholder={"Search for products"}/>
                <Button type={"submit"}>Search</Button>
            </Form>

            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {Array.from({ length:8 }).map((_, i) => (
                    <ProductCard
                        key={i}
                        productId={`productId-${i}`}
                        name={`ProductName-${i}`}
                        description="Product Description"
                        commentsCount={i}
                        viewsCount={12}
                        upvotes={120}
                    />
                ))}
            </div>
            <ProductPagination totalPages={10}/>
        </div>
    );
}