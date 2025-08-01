import type { Route } from "./+types/categorie-page";
import PageHeader from "~/common/components/page-header";
import CategoryCard from "~/features/products/components/category-card";

export const meta: Route.MetaFunction = () => [
    { title:"categories | wemake" },
    { name:"discription", content:"Browse products by category" }
]

export default function CategoriesPage() {
    return <div>
        <PageHeader title={"Categories"} description={"Browse products by category"}/>
        <div className={"grid grid-cols-4 gap-10"}>
            {Array.from({ length:10 }).map((_, i) => (
                <CategoryCard
                    key={`${i}`}
                    categoryId={`categoryId-${i}`}
                    name="Category Name"
                    description="Category Discription"
                />
            ))}
        </div>
    </div>
}
