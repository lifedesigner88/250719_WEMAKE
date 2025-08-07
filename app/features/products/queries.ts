import supabase from "~/supa-client";
import type { DateTime } from "luxon";
import { PRODUCTS_PAGE_SIZE } from "~/features/products/constant";


export const getProductsByDateRange = async ({ startDate, endDate, limit, page = 1 }: {
    startDate: DateTime;
    endDate: DateTime;
    limit: number;
    page?: number;

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
        .gte("created_at", startDate.toISO())
        .lte("created_at", endDate.toISO())
        // 필터한 뒤에 정렬해야 속도에 좋음.
        // ->> 이건 스트링으로 정렬해서 정렬 문제 발생, -> 하나로 해서 숫자로 변경
        .order("stats->upvotes", { ascending: false })
        .range((page - 1) * PRODUCTS_PAGE_SIZE, PRODUCTS_PAGE_SIZE * page - 1);
    if (error) throw new Error(error.message);
    return data;
}

export const getProductPagesByDateRange = async ({ startDate, endDate }: {
    startDate: DateTime;
    endDate: DateTime;
}) => {
    const { count, error } = await supabase.from("products")
        .select(`*`, { count: "exact", head: true })
        .gte("created_at", startDate.toISO())
        .lte("created_at", endDate.toISO());

    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE)
}

