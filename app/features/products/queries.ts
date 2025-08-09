import supabase from "~/supa-client";
import type { DateTime } from "luxon";
import { PRODUCTS_PAGE_SIZE } from "~/features/products/constant";


const productRow = `
    product_id,
    name,
    tagline,
    upvotes:stats->>upvotes,
    views:stats->>views,
    reviews:stats->>reviews
`;


export const getProductsByDateRange = async ({ startDate, endDate, limit, page = 1 }: {
    startDate: DateTime;
    endDate: DateTime;
    limit: number;
    page?: number;

}) => {
    const { data, error } = await supabase.from("products")
        .select(productRow)
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

// Categories list (paginated)
export async function getCategories({ page = 1, limit = PRODUCTS_PAGE_SIZE }: { page?: number; limit?: number; }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await supabase
        .from("categories")
        .select(`category_id, name, description`)
        .order("name", { ascending: true })
        .range(from, to);
    if (error) throw new Error(error.message);
    return data;
}

export async function getCategoryPages() {
    const { count, error } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE);
}

// Products by category (paginated)
export async function getProductsByCategory({ categoryId, page = 1, limit = PRODUCTS_PAGE_SIZE }: { categoryId: number; page?: number; limit?: number; }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await supabase
        .from("products")
        .select(productRow)
        .eq("category_id", categoryId)
        .order("stats->upvotes", { ascending: false })
        .range(from, to);
    if (error) throw new Error(error.message);
    return data;
}

export async function getProductPagesByCategory({ categoryId }: { categoryId: number; }) {
    const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("category_id", categoryId);
    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE);
}

// Search products by text (paginated)
export async function searchProducts({ query, page = 1, limit = PRODUCTS_PAGE_SIZE }: { query: string; page?: number; limit?: number; }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const q = `%${query}%`;
    const { data, error } = await supabase
        .from("products")
        .select(productRow)
        .or(`name.ilike.${q},tagline.ilike.${q}`)
        .order("stats->upvotes", { ascending: false })
        .range(from, to);
    if (error) throw new Error(error.message);
    return data;
}

export async function getSearchProductPages({ query }: { query: string; }) {
    const q = `%${query}%`;
    const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .or(`name.ilike.${q},tagline.ilike.${q}`);
    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE);
}

