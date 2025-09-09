import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLocation, useNavigation
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navigation from "./common/components/navigation";
import { Settings } from "luxon";
import { cn } from "~/lib/utils";
import { makeSSRClient } from "~/supa-client";
import { getUserProfileByIdWithDrizzle } from "~/features/users/queries";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    Settings.defaultLocale = "ko";
    Settings.defaultZone = "Asia/Seoul";
    return (
        <html lang="en" className="">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {/* Head 경고로 빈 타이틀 삽입하였음*/}
            <title></title>
            <Links/>
            <Meta/>
        </head>
        <body>
        <main>
            {children}
        </main>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}


export const loader = async ({ request }: Route.LoaderArgs) => {
    console.time("🕜 root loader")
    const { client } = makeSSRClient(request);
    const { data: { session }, error: sessionError } = await client.auth.getSession();
    // 세션에서 오류가 나면
    if (sessionError || !session) {
        // getUser에서 데이터 가지고옴. 
        const { data: userData, error: userError } = await client.auth.getUser();

        console.timeEnd("🕜 root loader")

        // 둘다 문제 있으면 로그인 안한걸로 처리.
        if (userError) return { userData };
        const profile = await getUserProfileByIdWithDrizzle(userData.user.id!);
        console.timeEnd("🕜 root loader")
        return { userData, profile };
    }
    // 세션에 정보 있으면 DB에서 사용자 정보 가지고 옴
    const profile = await getUserProfileByIdWithDrizzle(session.user.id);
    console.timeEnd("🕜 root loader")
    return { userData: { user: session.user }, profile };
}

export default function App({ loaderData }: Route.ComponentProps) {

    const { pathname } = useLocation();
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    const isLoggedIn = loaderData.userData.user !== null; // 이거 한 가지만 체크 하면 됨.
    const loginedUserData = loaderData.profile;

    return (
        <div className={
            cn({
                "py-28 px-5 lg:px-20": !pathname.includes("/auth/"),
                "transition-opacity animate-pulse": isLoading,
            })
        }>
            {pathname.includes("/auth/") ? null :
                // loaderData.profile 이 존재하지 않으면 undefined 로 전달.
                <Navigation
                    isLoggedIn={isLoggedIn}
                    hasMessages={true}
                    hasNotification={loginedUserData?.notifications?.length! > 0}
                    username={loginedUserData?.username}
                    avatar={loginedUserData?.avatar}
                    name={loginedUserData?.name}
                />
            }

            {/*loginUserData 가 undefined 이면 isLoading 만 전달됨*/}
            <Outlet context={{ isLoggedIn, ...loginedUserData }}/>
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
