import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";
import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

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

export const makePublicClient = createBrowserClient<Database>(
    "https://sywxxgdcbyavrzesgkat.supabase.co",
    "sb_publishable_7p4B8xS1nBqPZUiFcwkOEg_Cnu0AxRu"
);

export function makeSSRClient(request: Request) {
    const headers: Headers = new Headers();
    const client = createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    const parsed = parseCookieHeader(request.headers.get("Cookie") ?? "");
                    return parsed?.map(({ name, value }) => ({ name, value: value ?? "" })) ?? [];
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        headers.append("Set-Cookie", serializeCookieHeader(name, value, options));
                    });
                },
            },
        }
    );

    return { client, headers };
}


export const adminClient = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);