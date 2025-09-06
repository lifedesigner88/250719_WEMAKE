import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/common/components/ui/chart";

import type { Route } from "./+types/dashboard-page";
import { makeSSRClient } from "~/supa-client";
import { getUserIdForSever } from "~/features/auth/querys";

export const description = "A line chart"

const chartConfig = {
    views: {
        label: "👁️",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig


export const loader = async ({ request }: Route.LoaderArgs) => {
    const userId = await getUserIdForSever(request);
    const { client } = makeSSRClient(request)
    const { data, error } = await client.rpc("get_dashboard_stats", {
        user_id: userId
    })
    if (error) throw error;
    return { data } as { data: DashboardStats };
}

type DashboardStats = {
    views: number;
    month: string;
}[];

type LoaderData = {
    data: DashboardStats;
};

export default function ChartLineDefault({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData as LoaderData;
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <Card className={"w-1/2"}>
                <CardHeader>
                    <CardTitle>Profile Views</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={data}
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
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel/>}
                            />
                            <Line
                                dataKey="views"
                                type="natural"
                                stroke="var(--color-views)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Showing total visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}