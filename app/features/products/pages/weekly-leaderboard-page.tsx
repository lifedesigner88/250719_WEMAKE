import type { Route } from "./+types/weekly-leaderboard-page";
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
    year:z.coerce.number(),
    week:z.coerce.number(),
})

export const loader = async ({ params, request }: Route.LoaderArgs) => {

    // 데이터 잘 들어왔는지 체크.
    const { success, data:parseData } = paramsSchema.safeParse(params);
    if (!success)
        throw data(
            {
                error_code:"invalid_params",
                message:"invalid params"
            },
            {
                status:400
            }
        )

    // 객체를 date 형식으로 변경
    const date = DateTime.fromObject({
        weekYear:parseData.year,
        weekNumber:parseData.week
    });
    if (!date.isValid)
        throw data({
                error_code:"invalid_date 날짜 형식이 아닙니다.",
                message:"invalid date 날짜 형식이 아닙니다."
            }, {
                status:400
            }
        )

    // 현재 주보다 이후 값은 예외처리.
    const currentWeek = DateTime.now().startOf("week");
    if (date > currentWeek) {
        throw data({
                error_code:"future_date",
                message:"Future_date"
            },
            {
                status:400
            }
        )
    }

    // ✅ 데이터 Fetching
    const url = new URL(request.url);
    const products = await getProductsByDateRange({
        startDate: date.startOf("week"),
        endDate: date.endOf("week"),
        limit: PRODUCTS_PAGE_SIZE,
        page: Number(url.searchParams.get("page") || 1),
    })

    const totalPages = await getProductPagesByDateRange({
        startDate: date.startOf("week"),
        endDate: date.endOf("week")
    })

    return {
        ...parseData,
        products,
        totalPages
    }
}

export const meta: Route.MetaFunction = ({ data }) => {
    if (!data) return [{ title:"WeMake" }]
    const date = DateTime.fromObject({
        weekYear:data.year,
        weekNumber:data.week
    })
    return [{
        title:`Week ${date.weekNumber}, ${date.weekYear} | WeMake`
    }]
}

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {

    const urlDate = DateTime.fromObject({
        weekYear:loaderData.year,
        weekNumber:loaderData.week
    });

    const previousWeek = urlDate.minus({ weeks:1 });
    const nextWeek = urlDate.plus({ weeks:1 });
    const isCurrentWeek = urlDate.weekNumber === DateTime.now().weekNumber && urlDate.year === DateTime.now().year;

    // 주의 시작일과 종료일 계산
    const weekStart = urlDate.startOf("week");
    const weekEnd = urlDate.endOf("week");

    return <div>
        <PageHeader title={`Best of week ${urlDate.weekNumber}, ${urlDate.year}`}/>

        <div className="flex justify-center gap-4 pb-10">
            <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}>
                    &larr; Week {previousWeek.weekNumber}, {previousWeek.year}</Link>
            </Button>
            {!isCurrentWeek ? <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}>
                    Week {nextWeek.weekNumber}, {nextWeek.year} &rarr;</Link>
            </Button> : null}
        </div>

        <div className="text-center text-gray-500 mb-6">
            {weekStart.toLocaleString(DateTime.DATE_MED)} - {weekEnd.toLocaleString(DateTime.DATE_MED)}
        </div>

        <div className="space-y-5 w-full max-w-screen-md mx-auto">
            {loaderData.products.map((p, i) => (
                <ProductCard
                    key={i}
                    productId={p.product_id}
                    name={p.name}
                    description={p.description}
                    commentsCount={p.reviews}
                    viewsCount={p.views}
                    upvotes={p.upvotes}
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