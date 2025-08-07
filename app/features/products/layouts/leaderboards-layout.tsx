import { Outlet } from "react-router";
import type { Route } from "./+types/leaderboards-layout";
import { z } from "zod";

const searchParamsSchema = z.object({
    page: z.coerce.number().min(1).optional().default(1),
})

export const loader = ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const parseData = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!parseData.success) throw parseData.error;
}

export default function LeaderboardsLayout() {
    return <Outlet/>
}