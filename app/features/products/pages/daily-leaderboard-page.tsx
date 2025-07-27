import type { Route } from "./+types/daily-leaderboard-page";
import { DateTime } from "luxon";


export const loader = ({ params }: Route.LoaderArgs) => {

    const { year, month, day } = params;

    const date = DateTime.fromObject({
        year:Number(year),
        month:Number(month),
        day:Number(day)
    }).setZone("Asia/Seoul");

    if (!date.isValid)
        throw new Error("Invalid date");

}