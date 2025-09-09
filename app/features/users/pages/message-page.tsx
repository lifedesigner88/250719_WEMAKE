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
import { SendIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { MessageBubble } from "../components/message-bubble";
import { getMeessagesByRoomId, isThisUserRoomMember, postMessageToDMRoom } from "~/features/users/queries";
import { getUserIdForSever } from "~/features/auth/querys";
import { useRef } from "react";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Message | wemake" }];
};


export const loader = async ({ request, params }: Route.LoaderArgs) => {
    console.time("message page loader")
    const { roomId } = params
    const userId = await getUserIdForSever(request);
    const result = await isThisUserRoomMember(Number(roomId), userId);
    if(!result) throw new Response("You are not a member of this room")
    const roomData  = await getMeessagesByRoomId(Number(roomId), userId);
    console.timeEnd("message page loader")
    return { roomData, userId }
}
export const action = async ({ request, params }: Route.ActionArgs) => {
    console.time("action")
    const { roomId  } = params
    const message_room_id = Number(roomId);
    const sender_id = await getUserIdForSever(request);
    const result = await isThisUserRoomMember(message_room_id, sender_id);
    if(!result) throw new Response("You are not a member of this room")

    const formData = await request.formData();
    const content = formData.get("content") as string;
    if(!content) throw new Response("Content is required")

    const messageSendingResult = await postMessageToDMRoom({
        sender_id,
        message_room_id,
        content,
    })
    if(!messageSendingResult) throw new Response("Failed to send message")
    console.timeEnd("action")

    return { ok: true }
}


export default function MessagePage({loaderData, actionData}: Route.ComponentProps) {
    const { roomData, userId } = loaderData;
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if(actionData?.ok) {
            formRef.current?.reset()
        }

    }, [actionData]);

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
                    <Form
                        ref={formRef}
                        method={"post"}
                        className="relative flex justify-end items-center">
                        <Textarea
                            placeholder="Write a message..."
                            rows={2}
                            className="resize-none"
                            required
                            name={"content"}
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
