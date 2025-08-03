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

export const meta: Route.MetaFunction = () => {
    return [{ title:"Message | wemake" }];
};



export default function MessagePage() {
    return (
        <div className="h-full flex flex-col justify-between">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-14">
                        <AvatarImage src="https://github.com/stevejobs.png"/>
                        <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                        <CardTitle className="text-xl">Steve Jobs</CardTitle>
                        <CardDescription>2 days ago</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
                {messagesData.map((message, index) => (
                    <MessageBubble
                        key={index}
                        avatarUrl="https://github.com/stevejobs.png"
                        avatarFallback="S"
                        content={message.content}
                        isCurrentUser={message.isCurrentUser}
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

const messagesData = [
    { content:"Hey Steve, how are you doing?", isCurrentUser:true },
    { content:"Hi! I'm doing great, thanks for asking. How about you?", isCurrentUser:false },
    { content:"I'm good! Just working on some new project ideas.", isCurrentUser:false },
    { content:"That sounds interesting! What kind of projects?", isCurrentUser:false },
    { content:"Mainly focusing on AI and machine learning applications.", isCurrentUser:true },
    { content:"That's exactly what I've been researching lately!", isCurrentUser:false },
    { content:"Would you be interested in collaborating?", isCurrentUser:true },
    { content:"Absolutely! I'd love to hear more about your ideas.", isCurrentUser:true },
    { content:"Great! When are you free to discuss?", isCurrentUser:true },
    { content:"How about tomorrow afternoon?", isCurrentUser:false },
    { content:"Perfect! 2 PM works for me.", isCurrentUser:true },
    { content:"Sounds good! I'll prepare some notes.", isCurrentUser:false },
    { content:"Should we meet virtually or in person?", isCurrentUser:true },
    { content:"Virtual would be better for me this time.", isCurrentUser:true },
    { content:"No problem! I'll send you a meeting link.", isCurrentUser:true },
    { content:"Thanks! Looking forward to it.", isCurrentUser:false },
    { content:"By the way, have you seen the latest AI developments?", isCurrentUser:true },
    { content:"Yes! The progress is incredible.", isCurrentUser:false },
    { content:"We should definitely incorporate those ideas.", isCurrentUser:true },
    { content:"Agreed! Let's discuss tomorrow.", isCurrentUser:false }
]