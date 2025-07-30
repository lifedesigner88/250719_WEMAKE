import type { Route } from "./+types/daily-leaderboard-page";
import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import PageHeader from "~/common/components/page-header";
import ProductCard from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

// 숫자로 변경 가능한지 검증 스키마.
const paramsSchema = z.object({
    year:z.coerce.number(),
    month:z.coerce.number(),
    day:z.coerce.number(),
})

export const loader = ({ params }: Route.LoaderArgs) => {

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
    const date = DateTime.fromObject(parseData);
    if (!date.isValid)
        throw data({
                error_code:"invalid_date 날짜 형식이 아닙니다.",
                message:"invalid date 날짜 형식이 아닙니다."
            }, {
                status:400
            }
        )

    // 오늘 보다 이전 값은 예외처리.
    const today = DateTime.now().startOf("day");
    if (date > today) {
        throw data({
                error_code:"future_date",
                message:"Future_date"
            },
            {
                status:400
            }
        )
    }

    return {
        ...parseData,
    }
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {

    const urlDate = DateTime.fromObject({
        year:loaderData.year,
        month:loaderData.month,
        day:loaderData.day
    });

    const previouDay = urlDate.minus({ days:1 });
    const nextDay = urlDate.plus({ days:1 });
    const isToday = urlDate.equals(DateTime.now().startOf("day"));

    return <div>
        <PageHeader title={`The best products of ${urlDate.toLocaleString(DateTime.DATE_MED)}`}/>

        <div className="flex justify-center gap-4 pb-10">
            <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/daily/${previouDay.year}/${previouDay.month}/${previouDay.day}`}>
                    &larr; {previouDay.toLocaleString(DateTime.DATE_SHORT)}</Link>
            </Button>
            {!isToday ? <Button variant={"outline"} asChild>
                <Link to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}>
                    {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;</Link>
            </Button> : null}
        </div>

        <div className="space-y-5 w-full max-w-screen-md mx-auto">
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
        </div>
        <ProductPagination totalPages={10}/>

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
