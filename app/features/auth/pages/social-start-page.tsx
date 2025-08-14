import type { Route } from "./+types/social-start-page";
import { z } from "zod";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Social Login - ProductHunt Clone" }];
};

const BASE_URL = process.env.BASE_URL;

export const paramforOAuthsSchema = z.object({ provider: z.enum(["github", "kakao"]) });

export const loader = async ({ params, request }: Route.LoaderArgs) => {

    const { success, data } = paramforOAuthsSchema.safeParse(params);
    if (!success) return redirect("/auth/login");

    const { provider } = data;
    const redirectTo = `${BASE_URL}/auth/social/${provider}/complete`;
    const { client, headers } = makeSSRClient(request);
    const { data: { url }, error } = await client.auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (url) return redirect(url, { headers });
    if (error) throw error;
};
