import { NotificationCard } from "../components/navigation";
import type { Route } from "./+types/notifications-page";
import { getUserIdForSever } from "~/features/auth/querys";
import { getMyNotifications } from "~/features/users/queries";


export const meta: Route.MetaFunction = () => {
    return [{ title: "Notifications | wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const userId = await getUserIdForSever(request);

    const notifications  = await getMyNotifications(userId)
    console.log(notifications);

    return {  };
}

export default function NotificationsPage() {
    return (
        <div className="space-y-20">
            <h1 className="text-4xl font-bold">Notifications</h1>
            <div className="flex flex-col items-start gap-5">
                <NotificationCard
                    avatarUrl="https://github.com/serranoarevalo.png"
                    avatarFallback="S"
                    userName="Steve Jobs"
                    message=" followed you."
                    timestamp="2 days ago"
                    seen={false}
                />
            </div>
        </div>
    );
}