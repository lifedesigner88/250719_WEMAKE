import {
    Card,
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
import { useEffect, useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { MessageBubble } from "../components/message-bubble";
import { getMeessagesByRoomId, isThisUserRoomMember, postMessageToDMRoom } from "~/features/users/queries";
import { getUserIdForSever } from "~/features/auth/querys";
import { useRef } from "react";
import { makePublicClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Message | wemake" }];
};


export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const message_room_id = Number(params.roomId);
    const userId = await getUserIdForSever(request);

    // 채팅방에 속한 맴버인지 검사.
    const result = await isThisUserRoomMember(message_room_id, userId);
    if (!result) throw new Response("You are not a member of this room")

    // 채팅방의 메시지와 참가자 정보 획득
    const roomData = await getMeessagesByRoomId(message_room_id)
    return { roomData, userId }
}


export const action = async ({ request, params }: Route.ActionArgs) => {
    const message_room_id = Number(params.roomId);
    const sender_id = await getUserIdForSever(request);

    // 채팅방에 속한 맴버인지 검사
    const result = await isThisUserRoomMember(message_room_id, sender_id);
    if (!result) throw new Response("You are not a member of this room")

    const formData = await request.formData();
    const content = formData.get("content") as string;
    if (!content) throw new Response("Content is required")

    // 메시지 저장
    const messageSendingResult = await postMessageToDMRoom({
        sender_id,
        message_room_id,
        content,
    })
    if (!messageSendingResult) throw new Response("Failed to send message")

    return { ok: true }
}

export default function MessagePage({ loaderData, actionData }: Route.ComponentProps) {
    const { roomData, userId } = loaderData;
    const formRef = useRef<HTMLFormElement>(null);
    const roomMembers = roomData?.members.map(member => member.member)
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [messages, setMessages] = useState<{
        created_at: Date;
        content: string;
        sender: {
            profile_id: string;
            username: string;
            avatar: string | null;
        },
        sender_id: string;
    }[]>(roomData?.messages!);


    // 스크롤 위치 감지
    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (container) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isBottom = scrollHeight - scrollTop - clientHeight < 10; // 10px 여유
            setIsAtBottom(isBottom);
        }
    };
    useEffect(() => {
        setMessages(roomData?.messages!);
    }, [roomData?.message_room_id]); // roomId가 변경될 때마다 실행

    // 맨 아래에 있을 때만 자동 스크롤
    useEffect(() => {
        if (isAtBottom) {
            const container = messagesContainerRef.current;
            if (container) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
    }, [messages, isAtBottom]);


    const otherUser = roomMembers?.filter(member => member.profile_id !== userId)[0]
    const getUserInfobyId = (userId: string) =>
        roomMembers?.filter(member => member.profile_id === userId)[0]

    // 채팅메시지 창 리셋
    useEffect(() => {
        if (actionData?.ok) {
            formRef.current?.reset()
        }
    }, [actionData]);

    // 채팅방 구독.
    useEffect(() => {
        const change = makePublicClient
            .channel(`room:${userId}-${otherUser?.profile_id}`)
            .on("postgres_changes", {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `message_room_id=eq.${roomData?.message_room_id}`
                }, (payload) => {
                    const rawdata = payload.new
                    const newMessage = {
                        ...rawdata,
                        sender: getUserInfobyId(rawdata.sender_id)
                    }
                    // @ts-ignore
                    setMessages(prev => [...prev, newMessage])
                }
            ).subscribe();
        return () => void change.unsubscribe();
    }, [userId, otherUser?.profile_id, roomData?.message_room_id]);

    return (
        <div className="h-full flex flex-col justify-between">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-14">
                        <AvatarImage src={otherUser?.avatar ?? undefined} alt="avatar"/>
                        <AvatarFallback>{otherUser?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                        <CardTitle className="text-xl">{roomData?.members[0].member.username}</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
                {messages.map((message, index) => (
                    <MessageBubble
                        key={index}
                        avatarUrl={message.sender.avatar!}
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

export const shouldRevalidate = ({ actionResult }: any) => {
    return !actionResult?.ok;
}

