import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";
import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

const supabaseUrl = (globalThis as any).window
    ? (import.meta as any).env?.VITE_SUPABASE_URL ?? undefined
    : process.env.SUPABASE_URL;
const supabaseKey = (globalThis as any).window
    ? (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? undefined
    : process.env.SUPABASE_ANON_KEY;

// 디버깅용 (임시)
console.log('Environment check:', {
    isWindow: !!(globalThis as any).window,
    supabaseUrl: supabaseUrl ? 'SET' : 'MISSING',
    supabaseKey: supabaseKey ? 'SET' : 'MISSING'
});


if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing. Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for client, or SUPABASE_URL and SUPABASE_ANON_KEY for server.");
}

export type Database = MergeDeep<
    SupabaseDatabase,
    {
        public: {
            Views: {
                community_post_list_view: {
                    Row: SetFieldType<
                        SetNonNullable<SupabaseDatabase["public"]["Views"]["comunity_post_list_view"]["Row"]>,
                        "avatarSrc", string | null>;
                };
                product_overview_view: {
                    Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]>;
                };
                community_post_detail: {
                    Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]>;
                };
                gpt_ideas_view: {
                    Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["get_ideas_view"]["Row"]>;
                };
            };
        };
    }
>;

export const makePublicClient = createBrowserClient<Database>(supabaseUrl, supabaseKey);

export function makeSSRClient(request: Request) {
    const headers: Headers = new Headers();

    // // 디버깅을 위한 로그 추가
    // console.log('Request type:', typeof request);
    // console.log('Request headers type:', typeof request?.headers);
    // console.log('Headers get method:', typeof request?.headers?.get);

    // 안전한 쿠키 추출
    let cookieHeader: string | null = null;

    if (request && request.headers && typeof request.headers.get === 'function') {
        cookieHeader = request.headers.get("Cookie");
    } else if (request && request.headers && request.headers.cookie) {
        // 다른 형태의 headers 구조일 경우
        cookieHeader = request.headers.cookie;
    }

    const client = createServerClient<Database>(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                if (!cookieHeader) return [];

                try {
                    const parsed = parseCookieHeader(cookieHeader);
                    return parsed?.map(({ name, value }) => ({ name, value: value ?? "" })) ?? [];
                } catch (error) {
                    console.error('Cookie parsing error:', error);
                    return [];
                }
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    headers.append("Set-Cookie", serializeCookieHeader(name, value, options));
                });
            },
        },
    });

    return { client, headers };
}


// export function makeSSRClient(request: Request) {
//     const headers: Headers = new Headers();
//     const client = createServerClient<Database>(supabaseUrl, supabaseKey, {
//         cookies: {
//             getAll() {
//                 const parsed = parseCookieHeader(request.headers.get("Cookie") ?? "");
//                 return parsed?.map(({ name, value }) => ({ name, value: value ?? "" })) ?? null;
//             },
//             setAll(cookiesToSet) {
//                 cookiesToSet.forEach(({ name, value, options }) => {
//                     headers.append("Set-Cookie", serializeCookieHeader(name, value, options));
//                 });
//             },
//         },
//     });
//
//     return { client, headers };
// }
