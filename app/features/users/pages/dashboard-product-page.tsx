import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-product-page";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "~/common/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { checkIfUserIsProductOwner, getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Product Dashboard | wemake" }];
};


const chartConfig = {
    views: {
        label: "Page Views",
        color: "var(--primary)",
    },
    visitors: {
        label: "Visitors",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig;


export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const productIdSchema = z.object({ productId: z.coerce.number() })

    const result = productIdSchema.safeParse(params);
    if (!result.success) throw result.error
    const { productId } = result.data;

    const userId = await getLoggedInUserId(request);
    const isOwner = await checkIfUserIsProductOwner(request, { productId, userId })
    if (!isOwner) throw redirect("/my/dashboard/products");

    const { client } = makeSSRClient(request);
    const { data: productState, error } = await client.rpc("get_product_stats", {
        product_id: productId
    })
    if (error) throw error;

    return { productState }
}


export default function DashboardProductPage({ loaderData }: Route.ComponentProps) {

    const { productState } = loaderData as {
        productState: {
            product_views: number;
            product_visits: number;
            month: string;
        }[]
    }
    console.log(productState)

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={productState}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                padding={{ left: 15, right: 15 }}
                            />
                            <Area
                                dataKey="product_views"
                                type="natural"
                                stroke="var(--color-views)"
                                fill="var(--color-views)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Area
                                dataKey="product_visits"
                                type="natural"
                                stroke="var(--color-visitors)"
                                fill="var(--color-visitors)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                wrapperStyle={{ minWidth: "200px" }}
                                content={<ChartTooltipContent indicator="dot"/>}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}