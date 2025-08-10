import type { Route } from "./+types/profile-products-page";
import ProductCard from "~/features/products/components/product-card";
import { getUserProducts } from "~/features/users/queries";
import type { userProducts } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Products | wemake" }];
};


export async function loader({ params }: Route.LoaderArgs): Promise<{
    products: Awaited<ReturnType<typeof getUserProducts>>
}> {
    const normalizedUsername = params.username?.trim();
    if (!normalizedUsername) {
        throw new Error("Username is required");
    }

    const userProducts = await getUserProducts(normalizedUsername);

    // 예상치 못한 반환 형태 방어적 점검 (빈 배열은 허용)
    if (!userProducts || (typeof userProducts !== "object")) {
        throw new Error("Products failed to load");
    }

    return { products: userProducts };
}


export default function ProfileProductsPage({ loaderData }: Route.ComponentProps) {

    const { products }: { products: userProducts[] } = loaderData;

    if (!products || products.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No products found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {products.map((product : userProducts) => (
                <ProductCard
                    key={product.product_id}
                    productId={product.product_id}
                    name={product.name}
                    description={product.tagline}
                    commentsCount={product.reviews}
                    viewsCount={product.views}
                    upvotes={product.upvotes}
                />
            ))}
        </div>
    );
}