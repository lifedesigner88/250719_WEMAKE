import type { Route } from "./+types/leaderboard-page";
import PageHeader from "~/common/components/page-header";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductCard from "~/features/products/components/product-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "leaderboards | wemake" },
        {
            name: "discription",
            content: "Top products leaderboard"
        }
    ]
}

export const loader = async ({ request }: Route.LoaderArgs) => {

    const { client, headers } = makeSSRClient(request)


    const [dailyProduct, weeklyProducts, monthlyProducts, yearlyProducdts] =
        await Promise.all([
            getProductsByDateRange(client,
                {
                startDate: DateTime.now().startOf("day"),
                endDate: DateTime.now().endOf("day"),
                limit: 7,
            }),
            getProductsByDateRange(client,{
                startDate: DateTime.now().startOf("week"),
                endDate: DateTime.now().endOf("week"),
                limit: 7
            }),
            getProductsByDateRange(client,{
                startDate: DateTime.now().startOf("month"),
                endDate: DateTime.now().endOf("month"),
                limit: 7
            }),
            getProductsByDateRange(client,{
                startDate: DateTime.now().startOf("year"),
                endDate: DateTime.now().endOf("year"),
                limit: 7
            })
        ])
    return { dailyProduct, weeklyProducts, monthlyProducts, yearlyProducdts }

}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
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
                {loaderData.dailyProduct.map((p, i) => (
                    <ProductCard
                        key={i}
                        productId={p.product_id}
                        name={p.name}
                        description={p.tagline}
                        commentsCount={Number(p.reviews)}
                        viewsCount={Number(p.views)}
                        upvotes={Number(p.upvotes)}
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
                {loaderData.weeklyProducts.map((p, i) => (
                    <ProductCard
                        key={i}
                        productId={p.product_id}
                        name={p.name}
                        description={p.tagline}
                        commentsCount={Number(p.reviews)}
                        viewsCount={Number(p.views)}
                        upvotes={Number(p.upvotes)}
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
                {loaderData.monthlyProducts.map((p, i) => (
                    <ProductCard
                        key={i}
                        productId={p.product_id}
                        name={p.name}
                        description={p.tagline}
                        commentsCount={Number(p.reviews)}
                        viewsCount={Number(p.views)}
                        upvotes={Number(p.upvotes)}
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
                {loaderData.yearlyProducdts.map((p, i) => (
                    <ProductCard
                        key={i}
                        productId={p.product_id}
                        name={p.name}
                        description={p.tagline}
                        commentsCount={Number(p.reviews)}
                        viewsCount={Number(p.views)}
                        upvotes={Number(p.upvotes)}
                    />
                ))}
                <Button variant={"link"} asChild className={"self-center text-lg"}>
                    <Link to="/products/leaderboards/yearly">View all products &rarr;</Link>
                </Button>
            </div>
        </div>
    );
}