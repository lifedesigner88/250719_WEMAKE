import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { Form } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";
import { getMeessagesByRoomId, isThisUserRoomMember } from "~/features/users/queries";
import { getUserIdForSever } from "~/features/auth/querys";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Message | wemake" }];
};


export const loader = async ({ request, params }: Route.LoaderArgs) => {

    const { roomId } = params
    const userId = await getUserIdForSever(request);
    const result = await isThisUserRoomMember(Number(roomId), userId);

    if(!result) throw new Response(
        "You are not a member of this room",
        { status: 403 }
    )
    const roomData  = await getMeessagesByRoomId(Number(roomId), userId);

    return { roomData, userId }
}


export default function MessagePage({loaderData}: Route.ComponentProps) {
    const { roomData, userId } = loaderData;

    return (
        <div className="h-full flex flex-col justify-between">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-14">
                        <AvatarImage src={roomData.members[0].member.avatar ?? undefined} alt="avatar"/>
                        <AvatarFallback>{roomData.members[0].member.username.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                        <CardTitle className="text-xl">{roomData.members[0].member.username}</CardTitle>
                        <CardDescription>{DateTime.fromJSDate(roomData.members[0].member.created_at).toRelative()}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
                {roomData.messages.map((message, index) => (
                    <MessageBubble
                        key={index}
                        avatarUrl={message.sender.avatar ?? undefined}
                        avatarFallback={message.sender.username.slice(0, 2).toUpperCase()}
                        content={message.content}
                        isCurrentUser={message.sender.profile_id === userId}
                    />
                ))}
            </div>
            <Card>
                <CardHeader>
                    <Form className="relative flex justify-end items-center">
                        <Textarea
                            placeholder="Write a message..."
                            rows={2}
                            className="resize-none"
                        />
                        <Button type="submit" size="icon" className="absolute right-2">
                            <SendIcon className="size-4"/>
                        </Button>
                    </Form>
                </CardHeader>
            </Card>
        </div>
    );
}
