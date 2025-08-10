import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";
import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

const supabaseUrl = (globalThis as any).window
  ? (import.meta as any).env?.VITE_SUPABASE_URL ?? undefined
  : process.env.SUPABASE_URL;
const supabaseKey = (globalThis as any).window
  ? (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? undefined
  : process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Fail early to surface misconfiguration during dev/SSR
  throw new Error("Supabase environment variables are missing. Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for client, or SUPABASE_URL and SUPABASE_ANON_KEY for server.");
}

export const browserClient = createBrowserClient<Database>(supabaseUrl, supabaseKey);


export type Database = MergeDeep<
    SupabaseDatabase,
    {
      public: {
        Views: {
          community_post_list_view: {
            Row: SetFieldType<
                SetNonNullable<
                    SupabaseDatabase["public"]["Views"]["comunity_post_list_view"]["Row"]
                >,
                "avatarSrc",
                string | null
            >;
          };
          product_overview_view: {
            Row: SetNonNullable<
                SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
            >;
          };
          community_post_detail: {
            Row: SetNonNullable<
                SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
            >;
          };
          gpt_ideas_view: {
            Row: SetNonNullable<
                SupabaseDatabase["public"]["Views"]["get_ideas_view"]["Row"]
            >;
          };
        };
      };
    }
>;

export function makeSSRClient(request: Request) {
  const headers: Headers = new Headers();
  const client = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        const parsed = parseCookieHeader(request.headers.get("Cookie") ?? "");
        return parsed?.map(({ name, value }) => ({ name, value: value ?? "" })) ?? null;
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
