import type { DateTime } from "luxon";
import { PRODUCTS_PAGE_SIZE } from "~/features/products/constant";
import type { SupabaseClient } from "@supabase/supabase-js";
import { type Database, makeSSRClient } from "~/supa-client";
import type { Json, Tables, TablesInsert } from "@/database.types";


export const productRow = `
    product_id,
    name,
    tagline,
    upvotes:stats->upvotes,
    views:stats->views,
    reviews:stats->reviews
`;

export const getProductsByDateRange = async (
    client: SupabaseClient<Database>,
    { startDate, endDate, page = 1 }: { startDate: DateTime; endDate: DateTime; page?: number; }
) => {
    const { data, error } = await client.from("products")
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

export const getProductPagesByDateRange = async (
    client: SupabaseClient<Database>,
    { startDate, endDate }: { startDate: DateTime; endDate: DateTime; }
) => {
    const { count, error } = await client.from("products")
        .select(`*`, { count: "exact", head: true })
        .gte("created_at", startDate.toISO())
        .lte("created_at", endDate.toISO());

    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE)
}

// Categories list (paginated)
export async function getCategories(
    client: SupabaseClient<Database>,
    { page = 1, limit = PRODUCTS_PAGE_SIZE }: { page?: number; limit?: number; }
) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await client
        .from("categories")
        .select(`category_id, name, description`)
        .order("name", { ascending: true })
        .range(from, to);
    if (error) throw new Error(error.message);
    return data;
}

export async function getCategoryPages(client: SupabaseClient<Database>) {
    const { count, error } = await client
        .from("categories")
        .select("*", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE);
}

// Products by category (paginated)
export async function getProductsByCategory(client: SupabaseClient<Database>, {
    categoryId,
    page = 1,
    limit = PRODUCTS_PAGE_SIZE
}: {
    categoryId: number;
    page?: number;
    limit?: number;
}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await client
        .from("products")
        .select(productRow)
        .eq("category_id", categoryId)
        .order("stats->upvotes", { ascending: false })
        .range(from, to);
    if (error) throw new Error(error.message);
    return data;
}

export async function getProductPagesByCategory(client: SupabaseClient<Database>, { categoryId }: {
    categoryId: number;
}) {
    const { count, error } = await client
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("category_id", categoryId);
    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE);
}

// Search products by text (paginated)
export async function searchProducts(client: SupabaseClient<Database>, {
    query,
    page = 1,
    limit = PRODUCTS_PAGE_SIZE
}: {
    query: string;
    page?: number;
    limit?: number;
}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const q = `%${query}%`;
    const { data, error } = await client
        .from("products")
        .select(productRow)
        .or(`name.ilike.${q},tagline.ilike.${q}`)
        .order("stats->upvotes", { ascending: false })
        .range(from, to);
    if (error) throw new Error(error.message);
    return data;
}

export async function getSearchProductPages(client: SupabaseClient<Database>, { query }: { query: string; }) {
    const q = `%${query}%`;
    const { count, error } = await client
        .from("products")
        .select("*", { count: "exact", head: true })
        .or(`name.ilike.${q},tagline.ilike.${q}`);
    if (error) throw new Error(error.message);
    if (!count) return 1;
    return Math.ceil(count / PRODUCTS_PAGE_SIZE);
}

// 제품 1개

// Products 테이블의 필수 필드들
type ProductRequiredFields = Pick<Tables<"products">,
    'product_id' | 'name' | 'tagline' | 'description' | 'how_it_works' | 'icon' | 'url'
>;

export type JsonNumber = Extract<Json, number>;

// 합쳐서 최종 타입
export type ProductOverview = ProductRequiredFields & {
    average_rating: number | null;
    reviews: JsonNumber | null;  // number | null
    upvotes: JsonNumber | null;  // number | null
    views: JsonNumber | null;    // number | null
};

export async function getProductFromId(client: SupabaseClient<Database>, productId: number) : Promise<ProductOverview>{
    const { data, error } = await client
        .from("product_overview_view")
        .select("*")
        .eq("product_id", productId)
        .single();
    if (error) throw new Error(error.message);
    return data;
}

interface Profile {
    name: string;
    username: string;
    avatar: string;
}

export interface ProductReview {
    review_id: number;
    rating: number;
    review: string;
    created_at: string;
    profile: Profile;
}

export async function getProductReviews(client: SupabaseClient<Database>, { productId, page = 1, limit = 20 }: {
    productId: number;
    page?: number;
    limit?: number;
}): Promise<ProductReview[]> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await client
        .from("reviews")
        .select(`
            review_id, 
            rating, 
            review, 
            created_at, 
            profile:profile_id(name, username, avatar)
        `)
        .eq("product_id", productId)
        .order("created_at", { ascending: false })
        .range(from, to);
    if (error) throw new Error(error.message);
    return data as unknown as ProductReview[];
}

export async function getProductReviewCount(client: SupabaseClient<Database>, { productId }: { productId: number; }) {
    const { count, error } = await client
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("product_id", productId);
    if (error) throw new Error(error.message);
    if (count == null) return 0;
    return count ?? 0;
}


export async function createProductReview(
    request: Request,
    payload: TablesInsert<"reviews">
) {
    const { client } = makeSSRClient(request);
    const { error } = await client
        .from("reviews")
        .insert(payload)
    if (error) throw new Error(error.message);
}

