import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";

interface ReplyProps {
    username: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
    topLevel: boolean;
    postReplies?: ReplyProps[];
}

export function Reply({
                          username,
                          avatarUrl,
                          content,
                          timestamp,
                          topLevel,
                          postReplies
                      }: ReplyProps) {
    const [replying, setReplying] = useState(false);
    const toggleReplying = () => setReplying((prev) => !prev);
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-start gap-5 w-2/3">
                <Avatar className="size-14">
                    <AvatarFallback>{username[0]}</AvatarFallback>
                    <AvatarImage src={avatarUrl}/>
                </Avatar>
                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="flex gap-2 items-center">
                        <Link to={`/users/${username}`}>
                            <h4 className="font-medium">{username}</h4>
                        </Link>
                        <DotIcon className="size-5"/>
                        <span className="text-xs text-muted-foreground">{timestamp}</span>
                    </div>
                    <p className="text-muted-foreground">{content}</p>
                    <Button variant="ghost" className="self-end" onClick={toggleReplying}>
                        <MessageCircleIcon className="size-4"/>
                        Reply
                    </Button>
                </div>
            </div>
            {replying && (
                <Form className="flex items-start gap-5 w-3/4">
                    <Avatar className="size-14">
                        <AvatarFallback>N</AvatarFallback>
                        <AvatarImage src="https://github.com/serranoarevalo.png"/>
                    </Avatar>
                    <div className="flex flex-col gap-5 items-end w-full">
                        <Textarea
                            placeholder="Write a reply"
                            className="w-full resize-none"
                            rows={5}
                        />
                        <Button>Reply</Button>
                    </div>
                </Form>
            )}
            {topLevel && postReplies && postReplies.length > 0 &&
                postReplies.map((reply) => (
                    <div className="ml-25 w-full" key={reply.username}>
                        <Reply
                            username={reply.user.username}
                            avatarUrl={reply.user.avatar}
                            content={reply.reply}
                            timestamp={DateTime.fromISO(reply.created_at).toRelative()}
                        />
                    </div>
                ))
            }
        </div>
    );
}