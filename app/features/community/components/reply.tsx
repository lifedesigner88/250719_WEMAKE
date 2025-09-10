import { Form, Link, useActionData } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { useState, useEffect } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
import type { ForLoggedInUserContext } from "~/common/type/forLoggedInUserType";
import { useOutletContext } from "react-router";


interface ReplyProps {
    post_reply_id: number;
    username: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
    topLevel?: boolean;
    postReplies?: {
        user: {
            name: string,
            username: string;
            avatar: string;
        },
        reply: string;
        created_at: string;
    }[]
}

export function Reply({
                          post_reply_id,
                          username,
                          avatarUrl,
                          content,
                          timestamp,
                          topLevel,
                          postReplies
                      }: ReplyProps) {
    const [replyWindow, setReplyWindow] = useState(false);
    const toggleReplying = () => setReplyWindow((prev) => !prev);

    const {
        isLoggedIn,
        avatar: loggedInAvatarUrl,
    } = useOutletContext<ForLoggedInUserContext>()

    const actionData = useActionData<{ ok: boolean } | undefined>();
    useEffect(() => {
        if (actionData?.ok) setReplyWindow(false);
    }, [actionData]);

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
                    {isLoggedIn &&
                        <Button variant="ghost" className="self-end" onClick={toggleReplying}>
                            <MessageCircleIcon className="size-4"/>
                            Open Reply
                        </Button>
                    }
                </div>
            </div>
            {replyWindow && (
                <Form className="flex items-start gap-5 w-3/4" method={"post"}>
                    <Avatar className="size-14">
                        <AvatarFallback>N</AvatarFallback>
                        <AvatarImage src={loggedInAvatarUrl ?? undefined}/>
                    </Avatar>
                    <div className="flex flex-col gap-5 items-end w-full">
                        <input type="hidden" name="parent_id" value={post_reply_id}/>
                        <Textarea
                            name="reply"
                            placeholder={`Write a reply to @${username} `}
                            className="w-full resize-none"
                            defaultValue={`@${username} `}
                            rows={5}
                        />
                        <Button>Post Reply</Button>
                    </div>
                </Form>
            )}
            {topLevel && postReplies && postReplies.length > 0 &&
                postReplies.map((reply, i) => (
                    <div className="ml-25 w-full">
                        <Reply
                            key={i}
                            post_reply_id={post_reply_id}
                            username={reply.user.username}
                            avatarUrl={reply.user.avatar}
                            content={reply.reply}
                            timestamp={DateTime.fromISO(reply.created_at).toRelative()!}
                        />
                    </div>
                ))
            }
        </div>
    );
}