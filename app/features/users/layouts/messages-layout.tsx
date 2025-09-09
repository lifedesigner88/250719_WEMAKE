import { Outlet } from "react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarProvider,
} from "~/common/components/ui/sidebar";
import MessageRoomCard from "../components/message-room-card";
import type { Route } from "./+types/messages-layout";
import { getUserIdForSever } from "~/features/auth/querys";
import { getUserMessageRoom } from "~/features/users/queries";
import { DateTime } from "luxon";

export const loader = async ({ request }: Route.LoaderArgs) => {
    console.time("🕜 message layout loader")
    const userId = await getUserIdForSever(request);
    const myRooms = await getUserMessageRoom(userId);
    console.timeEnd("🕜 message layout loader")
    return { myRooms };
}

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
    const { myRooms } = loaderData;

    // 데이터를 평탄화하여 사용하기 쉽게 변환
    const flattenedRooms = myRooms.map(room => {
        const firstMessage = room.room.messages[0];
        const otherMember = room.room.members[0]?.member;

        return {
            id: room.message_room_id,
            name: otherMember?.username,
            avatar: otherMember?.avatar,
            lastMessage: firstMessage ? `${firstMessage.sender.username.slice(0, 4)}.. : ${firstMessage.content.slice(0, 4)}..` : '',
            timeAgo: firstMessage ? DateTime.fromJSDate(firstMessage.created_at).toRelative() : '',
        };
    });


    return (
        <SidebarProvider className="flex max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full">
            <Sidebar className="pt-16" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {flattenedRooms.map((room, index) => (
                                <MessageRoomCard
                                    key={index}
                                    id={room.id}
                                    name={room.name}
                                    lastMessage={room.lastMessage}
                                    timeAgo={room.timeAgo}
                                    avatarUrl={room.avatar}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className=" h-full flex-1">
                <Outlet/>
            </div>
        </SidebarProvider>
    );
}