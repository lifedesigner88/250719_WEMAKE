import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { Database } from "@/database.types";

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
