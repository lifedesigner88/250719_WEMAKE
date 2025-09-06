import type { Route } from "./+types/notifications-page";
import { getUserIdForSever } from "~/features/auth/querys";
import { getMyNotifications } from "~/features/users/queries";
import NotificationCard from "~/features/users/components/navigation";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Notifications | wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const userId = await getUserIdForSever(request);
    const notifications = await getMyNotifications(userId);

    return { notifications };
}

export default function NotificationsPage({ loaderData }: Route.ComponentProps) {
    const { notifications } = loaderData;

    // 타입별로 알림 그룹화
    const groupedNotifications = {
        follow: notifications.filter(n => n.type === "follow"),
        review: notifications.filter(n => n.type === "review"),
        reply: notifications.filter(n => n.type === "reply"),
    };

    const unreadCount = notifications.filter(n => !n.seen).length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">Notifications</h1>
                    {unreadCount > 0 && (
                        <p className="text-muted-foreground mt-2">
                            You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No notifications yet</p>
                    <p className="text-muted-foreground text-sm mt-2">
                        When you get notifications, they'll show up here
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Follow Notifications */}
                    {groupedNotifications.follow.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <span>👥</span>
                                Follows ({groupedNotifications.follow.length})
                            </h2>
                            <div className="space-y-3">
                                {groupedNotifications.follow.map((notification, index) => (
                                    <NotificationCard key={index} notification={notification}/>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Review Notifications */}
                    {groupedNotifications.review.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <span>⭐</span>
                                Reviews ({groupedNotifications.review.length})
                            </h2>
                            <div className="space-y-3">
                                {groupedNotifications.review.map((notification, index) => (
                                    <NotificationCard key={index} notification={notification}/>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reply Notifications */}
                    {groupedNotifications.reply.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <span>💬</span>
                                Replies ({groupedNotifications.reply.length})
                            </h2>
                            <div className="space-y-3">
                                {groupedNotifications.reply.map((notification, index) => (
                                    <NotificationCard key={index} notification={notification}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
