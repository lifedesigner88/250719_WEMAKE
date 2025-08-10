import type { Route } from "./+types/daily-leaderboard-page";
import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link, useOutletContext } from "react-router";
import { z } from "zod";
import PageHeader from "~/common/components/page-header";
import ProductCard from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "~/features/products/queries";
import { PRODUCTS_PAGE_SIZE } from "~/features/products/constant";
import React from "react";
import { makeSSRClient } from "~/supa-client";

// 숫자로 변경 가능한지 검증 스키마.
const paramsSchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number(),
    day: z.coerce.number(),
})

export const loader = async ({ params, request }: Route.LoaderArgs) => {

    const { client, headers } = makeSSRClient(request)


    // 데이터 잘 들어왔는지 체크.
    const paramsData = paramsSchema.safeParse(params);

    if (!paramsData.success) {
        throw data(
            {
                error_code: "invalid_params",
                message: "invalid params"
            },
            {
                status: 400
            }
        )
    }

    // 객체를 date 형식으로 변경
    const date = DateTime.fromObject(paramsData.data);
    if (!date.isValid) {
        throw data({
                error_code: "invalid_date 날짜 형식이 아닙니다.",
                message: "invalid date 날짜 형식이 아닙니다."
            }, {
                status: 400
            }
        )
    }

    // 오늘 보다 이전 값은 예외처리.
    const today = DateTime.now().startOf("day");
    if (date > today) {
        throw data({
                error_code: "future_date",
                message: "Future_date"
            },
            {
                status: 400
            }
        )
    }

    // ✅ 데이터 Fetching

    const url = new URL(request.url);
    const products = await getProductsByDateRange(client,
        {
            startDate: date.startOf("day"),
            endDate: date.endOf("day"),
            limit: PRODUCTS_PAGE_SIZE,
            page: Number(url.searchParams.get("page") || 1),
        })

    const totalPages = await getProductPagesByDateRange(client, {
        startDate: date.startOf("day"),
        endDate: date.endOf("day")
    })

    return {
        ...paramsData.data,
        products,
        totalPages
    }
}

// 메타펑션에서 Loader 데이터를 가지고 올 수 있고, params 도 가지고 올 수 있다.
export const meta: Route.MetaFunction = ({ data }) => {

    if (!data) return [{ title: "WeMake" }]

    const { year, month, day } = data;
    const date = DateTime.fromObject({ year, month, day });

    return [
        { title: `${date.toLocaleString(DateTime.DATE_MED)} | WeMake` }
    ]
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {

    const urlDate = DateTime.fromObject({
        year: loaderData.year,
        month: loaderData.month,
        day: loaderData.day
    });

    const previousDay = urlDate.minus({ days: 1 });
    const nextDay = urlDate.plus({ days: 1 });
    const isToday = urlDate.equals(DateTime.now().startOf("day"));

    return <div>
        <PageHeader title={`The best products of ${urlDate.toLocaleString(DateTime.DATE_MED)}`}/>

        <div className="flex justify-center gap-4 pb-10">
            <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}>
                    &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}</Link>
            </Button>
            {!isToday ? <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}>
                    {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;</Link>
            </Button> : null}
        </div>

        <div className="space-y-5 w-full max-w-screen-md mx-auto">
            {loaderData.products.map((p, i) => (
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
        </div>
        <ProductPagination totalPages={loaderData.totalPages}/>
    </div>
}

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                {error.data.message} / {error.data.error_code}
            </div>
        )
    }
    if (error instanceof Error) {
        return <div>{error.message}</div>
    }
    return <div>Unknown error</div>;
}
