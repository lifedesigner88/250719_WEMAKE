import type { Route } from "../../../../.react-router/types/app/features/products/pages/+types/product-overview-page";

export function meta() {
    return [
        { title:"Product Overview | wemake" },
        { name:"description", content:"View product details and information" },
    ];
}

export default function ProductOverviewPage({ params:{ productId }, }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <span className={"text-4xl font-bold space-y-3 block"}>{productId}</span>
            <div className="space-y-1">
                <h3 className="text-lg font-bold">What is this product?</h3>
                <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                    quos.
                </p>
            </div>
            <div className="space-y-1">
                <h3 className="text-lg font-bold">How does it work?</h3>
                <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                    quos.
                </p>
            </div>
        </div>
    );
}