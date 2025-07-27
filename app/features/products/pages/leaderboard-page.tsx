import type { Route } from "../../../../.react-router/types/app/features/products/pages/+types/leaderboard-page";
import PageHeader from "~/common/components/page-header";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductCard from "~/features/products/components/product-card";

export const meta: Route.MetaFunction = () => {
    return [
        { title:"leaderboards | wemake" },
        {
            name:"discription",
            content:"Top products leaderboard"
        }
    ]
}

export default function LeaderboardPage() {
    return (
        <div>
            <PageHeader
                title="Leaderboards"
                description="The most popular products on wemake"
            />

            <div className="px-10 grid grid-cols-3 gap-4 mb-20">
                <div className={"px-3 flex flex-col justify-center"}>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Daily Leaderboard
                    </h2>
                    <p className="text-xl font-light">
                        the most popular products on wemake by the day.
                    </p>
                </div>
                {Array.from({ length:7 }).map((_, i) => (
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
                <Button variant={"link"} asChild className={"self-center text-lg"}>
                    <Link to="/products/leaderboards/daily">View all products &rarr;</Link>
                </Button>
            </div>
            <div className="px-10 grid grid-cols-3 gap-4 mb-20">
                <div className={"px-3 flex flex-col justify-center"}>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Weekly Leaderboard
                    </h2>
                    <p className="text-xl font-light">
                        the most popular products on wemake by the Weekly.
                    </p>
                </div>
                {Array.from({ length:7 }).map((_, i) => (
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
                <Button variant={"link"} asChild className={"self-center text-lg"}>
                    <Link to="/products/leaderboards/weekly">View all products &rarr;</Link>
                </Button>
            </div>
            <div className="px-10 grid grid-cols-3 gap-4 mb-20">
                <div className={"px-3 flex flex-col justify-center"}>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Monthly Leaderboard
                    </h2>
                    <p className="text-xl font-light">
                        the most popular products on wemake by the Monthly.
                    </p>
                </div>
                {Array.from({ length:7 }).map((_, i) => (
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
                <Button variant={"link"} asChild className={"self-center text-lg"}>
                    <Link to="/products/leaderboards/monthly">View all products &rarr;</Link>
                </Button>
            </div>
            <div className="px-10 grid grid-cols-3 gap-4 mb-20">
                <div className={"px-3 flex flex-col justify-center"}>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Yearly Leaderboard
                    </h2>
                    <p className="text-xl font-light">
                        the most popular products on wemake by the Yearly.
                    </p>
                </div>
                {Array.from({ length:7 }).map((_, i) => (
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
                <Button variant={"link"} asChild className={"self-center text-lg"}>
                    <Link to="/products/leaderboards/yearly">View all products &rarr;</Link>
                </Button>
            </div>
        </div>
    );
}