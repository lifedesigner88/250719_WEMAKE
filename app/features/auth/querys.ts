import { makeSSRClient } from "~/supa-client";
import { redirect } from "react-router";
import { jwtDecode } from "jwt-decode";
import { parseCookieHeader } from "@supabase/ssr";

export const checkUsernameExists = async (request: Request, { username }: { username: string }) => {
    const { client } = makeSSRClient(request);

    const { error } = await client
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single()
    return !error
}

export const getUserIdForSever = async (request: Request) => {
    let userId = getUserIdFromCookieSync(request);
    if (userId) return userId;
    userId = await getUserIdFromSession(request);
    if (userId) return userId;
    userId = await getLoggedInUserId(request);
    return userId;
}

export const getUserIdFromCookieSync = (request: Request): string | null => {
    try {
        const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");

        // Supabase 프로젝트 ID 추출
        const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const projectId = supabaseUrl?.split('//')[1]?.split('.')[0];

        // 토큰 청크들 찾아서 합치기
        const tokenChunks = cookies
            .filter(c => c.name.startsWith(`sb-${projectId}-auth-token.`))
            .sort((a, b) => {
                const getIndex = (name: string) => parseInt(name.split('.')[1]) || 0;
                return getIndex(a.name) - getIndex(b.name);
            })
            .map(c => c.value || '');

        // 토큰 데이터 디코딩
        const fullTokenData = tokenChunks.join('');
        const decodedData = fullTokenData.startsWith('base64-')
            ? atob(fullTokenData.replace('base64-', ''))
            : fullTokenData;

        // JWT에서 userId 추출
        const { access_token } = JSON.parse(decodedData);
        const result = jwtDecode<{ sub: string }>(access_token);

        return result.sub;
    } catch {
        return null;
    }
};


export const getUserIdFromSession = async (request: Request): Promise<string | null> => {
    const { client } = makeSSRClient(request);
    const { data: { session }, error } = await client.auth.getSession();
    if (error || !session?.user) return null;
    return session.user.id;
};


export const getLoggedInUserId = async (request: Request): Promise<string> => {
    const { client } = makeSSRClient(request);
    const { data, error } = await client.auth.getUser();
    if (error || data.user === null) throw redirect("/auth/login");
    return data.user.id;
}