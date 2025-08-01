import type { Route } from "./+types/categorie-page";
import PageHeader from "~/common/components/page-header";
import ProductCard from "~/features/products/components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = () => [
    { title:"categories | wemake" },
    { name:"discription", content:"Browse products by category" }
]

export default function CategoriesPage() {
    return (
        <div className="space-y-10">
            <PageHeader title={"Developer Tools"} description={"Browse products by category"}/>
            <div className={"space-y-5 w-full max-w-screen-md mx-auto"}>
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
    )
}