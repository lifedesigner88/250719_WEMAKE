import type { Route } from "./+types/yearly-leaderboard-page";
import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import PageHeader from "~/common/components/page-header";
import ProductCard from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "~/features/products/queries";
import { PRODUCTS_PAGE_SIZE } from "~/features/products/constant";

// 숫자로 변경 가능한지 검증 스키마.
const paramsSchema = z.object({
    year: z.coerce.number(),
})

export const loader = async ({ params, request }: Route.LoaderArgs) => {

    // 데이터 잘 들어왔는지 체크.
    const { success, data: parseData } = paramsSchema.safeParse(params);
    if (!success){

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
    const date = DateTime.fromObject({
        year: parseData.year
    });
    if (!date.isValid){
        throw data({
                error_code: "invalid_date 날짜 형식이 아닙니다.",
                message: "invalid date 날짜 형식이 아닙니다."
            }, {
                status: 400
            }
        )
    }

    // 현재 년도보다 이후 값은 예외처리.
    const currentYear = DateTime.now().startOf("year");
    if (date > currentYear) {
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
    const products = await getProductsByDateRange({
        startDate: date.startOf("year"),
        endDate: date.endOf("year"),
        limit: PRODUCTS_PAGE_SIZE,
        page: Number(url.searchParams.get("page") || 1),
    })

    const totalPages = await getProductPagesByDateRange({
        startDate: date.startOf("year"),
        endDate: date.endOf("year")
    })

    return {
        ...parseData,
        products,
        totalPages
    }
}

export const meta: Route.MetaFunction = ({ data }) => {
    if (!data) return [{ title: "WeMake" }]
    const date = DateTime.fromObject({ year: data.year });

    return [{
        title: `${date.year} | WeMake`
    }]
}

export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {

    const urlDate = DateTime.fromObject({
        year: loaderData.year
    });

    const previousYear = urlDate.minus({ years: 1 });
    const nextYear = urlDate.plus({ years: 1 });
    const isCurrentYear = urlDate.year === DateTime.now().year;

    // 년도의 시작일과 종료일 계산
    const yearStart = urlDate.startOf("year");
    const yearEnd = urlDate.endOf("year");

    return <div>
        <PageHeader title={`Best of ${urlDate.year}`}/>

        <div className="flex justify-center gap-4 pb-10">
            <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
                    &larr; {previousYear.year}</Link>
            </Button>
            {!isCurrentYear ? <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
                    {nextYear.year} &rarr;</Link>
            </Button> : null}
        </div>

        <div className="text-center text-gray-500 mb-6">
            {yearStart.toLocaleString(DateTime.DATE_MED)} - {yearEnd.toLocaleString(DateTime.DATE_MED)}
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