import supabase from "~/supa-client";
import type { DateTime } from "luxon";


export const getProductsByDateRange = async ({ startDate, endDate, limit, }: {
    startDate: DateTime;
    endDate: DateTime;
    limit: number;
}) => {
    const { data, error } = await supabase.from("products")
        .select(`
        product_id,
        name,
        description,
        upvotes:stats->>upvotes,
        views:stats->>views,
        reviews:stats->>reviews
        `)
        .order("stats->>upvotes", { ascending: true })
        .gte("created_at", startDate.toISO())
        .lte("created_at", endDate.toISO())
        .limit(limit)
    if (error) throw new Error(error.message);
    return data;
}