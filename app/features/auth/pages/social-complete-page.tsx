import type { Route } from "./+types/social-complete-page";
import { redirect } from "react-router";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { paramforOAuthsSchema } from "~/features/auth/pages/social-start-page";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Complete Social Login - ProductHunt Clone" }];
};

export default function SocialCompletePage() {
    return <div></div>;
}


export const loader = async ({ params, request }: Route.LoaderArgs) => {

    const { success } = paramforOAuthsSchema.safeParse(params);
    if (!success) return redirect("/auth/login");

    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    if (!code) return redirect("/auth/login");

    const { client, headers } = makeSSRClient(request);
    const { error: authError } = await client.auth.exchangeCodeForSession(code);
    if (authError) throw authError;

    return redirect("/", { headers });
};
