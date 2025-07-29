import type { Route } from "./+types/daily-leaderboard-page";
import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";


export const loader = ({ params }: Route.LoaderArgs) => {

    const { year, month, day } = params;

    const date = DateTime.fromObject({
        year:Number(year),
        month:Number(month),
        day:Number(day)
    }).setZone("Asia/Seoul");

    if (!date.isValid)
        throw data({
                error_code:"invalid_date",
                message:"invalid date"
            },
            {
                status:400
            }
        )

}

export default function DailyLeaderboardPage() {
    return <h1>DailyLeaderboardPage</h1>;
}

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
        if(isRouteErrorResponse(error))
    return <h1>ErrorBoundary</h1>;


}
