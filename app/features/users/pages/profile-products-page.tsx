import type { Route } from "./+types/profile-products-page";
import ProductCard from "~/features/products/components/product-card";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Products | wemake" }];
};

export default function ProfileProductsPage() {
    return (
        <div className="flex flex-col gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <ProductCard
                    key={`productId-${index}`}
                    productId={`productId-${index}`}
                    name="Product Name"
                    description="Product Description"
                    commentsCount={12}
                    viewsCount={12}
                    upvotes={120}
                />
            ))}
        </div>
    );
}