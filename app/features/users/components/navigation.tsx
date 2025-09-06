import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Card, CardContent } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Link, useFetcher } from "react-router";
import { DateTime } from "luxon";
import { Eye, EyeOff, Heart, MessageCircle, User } from "lucide-react";
import React from "react";
import { Button } from "~/common/components/ui/button";

interface NotificationCardProps {
    notification: {
        notification_id: number;
        type: "follow" | "review" | "reply";
        created_at: string;
        seen: boolean;
        source: {
            username: string;
            avatar: string | null;
        } | null;
        product: {
            product_id: number;
            name: string;
        } | null;
        post: {
            post_id: number;
            title: string;
        } | null;
    };
}

export default function NotificationCard({ notification }: NotificationCardProps) {
    const getNotificationIcon = () => {
        switch (notification.type) {
            case "follow":
                return <User className="size-4 text-blue-500"/>;
            case "review":
                return <Heart className="size-4 text-orange-400"/>;
            case "reply":
                return <MessageCircle className="size-4 text-green-500"/>;
            default:
                return null;
        }
    };

    const getNotificationMessage = () => {
        const sourceUsername = notification.source?.username || "Someone";

        switch (notification.type) {
            case "follow":
                return `${sourceUsername} started following you`;
            case "review":
                return notification.product
                    ? `${sourceUsername} reviewed your product "${notification.product.name}"`
                    : `${sourceUsername} left a review`;
            case "reply":
                return notification.post
                    ? `${sourceUsername} replied to your post "${notification.post.title}"`
                    : `${sourceUsername} replied to your post`;
            default:
                return "New notification";
        }
    };

    const getNotificationLink = () => {
        switch (notification.type) {
            case "follow":
                return notification.source ? `/${notification.source.username}` : "#";
            case "review":
                return notification.product ? `/products/${notification.product.product_id}` : "#";
            case "reply":
                return notification.post ? `/community/${notification.post.post_id}` : "#";
            default:
                return "#";
        }
    };

    const timeAgo = DateTime.fromISO(notification.created_at).toRelative();

    const fetcher = useFetcher();
    const isToggling = fetcher.state === "submitting";

    const handleToggleRead = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (notification.notification_id) {
            fetcher.submit(
                { notificationId: notification.notification_id.toString() },
                { method: "POST", action: "/fetcher/notifications/seen" }
            );
        }
    };


    return (
        <Link to={getNotificationLink()}>
            <Card
                className={`transition-colors ${!notification.seen ? 'bg-yellow-100 dark:bg-blue-950/20' : ''}`}>
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <Avatar className="size-10">
                            <AvatarImage src={notification.source?.avatar || ""}/>
                            <AvatarFallback>
                                {notification.source?.username?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                {getNotificationIcon()}
                                <Badge
                                    variant={notification.type === "follow" ? "secondary" : notification.type === "review" ? "outline" : "secondary"}>
                                    {notification.type}
                                </Badge>
                                {!notification.seen && (
                                    <div className="size-2 bg-blue-900 rounded-full"/>
                                )}
                            </div>

                            <p className="text-sm text-foreground mb-1">
                                {getNotificationMessage()}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {timeAgo}
                            </p>


                        </div>
                        {notification.notification_id && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleToggleRead}
                                disabled={isToggling}
                                className="h-6 px-2 text-xl"
                            >
                                {notification.seen ? (
                                    <>
                                        <EyeOff className="size-5 mr-1"/>
                                        Mark unread
                                    </>
                                ) : (
                                    <>
                                        <Eye className="size-5 mr-1"/>
                                        Mark read
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
