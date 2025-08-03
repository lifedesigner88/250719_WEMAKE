import { Link, useLocation } from "react-router";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "~/common/components/ui/avatar";
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/common/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/common/components/ui/button";

interface MessageCardProps {
    id: string;
    avatarUrl?: string;
    name: string;
    lastMessage: string;
}

export default function MessageRoomCard({
                                            id,
                                            avatarUrl,
                                            name,
                                            lastMessage,
                                        }: MessageCardProps) {
    const location = useLocation();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                className={
                    cn(buttonVariants({ variant:"outline" }), "py-7",
                        (location.pathname === `/my/messages/${id}`) ? "bg-red-600 text-white hover:bg-red-600 hover:text-white" : "",
                    )}
                asChild
            >
                <Link to={`/my/messages/${id}`}>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={avatarUrl}/>
                            <AvatarFallback>{name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm">{name}</span>
                            <span className={
                                cn("text-xs",
                                    (location.pathname === `/my/messages/${id}`) ? "hover:text-white text-white" : "text-muted-foreground",
                                )}>
                                {lastMessage}
                            </span>
                        </div>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}