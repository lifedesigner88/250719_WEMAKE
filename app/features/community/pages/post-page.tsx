import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link, useOutletContext } from "react-router";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "~/features/community/components/reply";
import { getPostById, getPostComments } from "~/features/community/queries";
import { DateTime } from "luxon";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import type { ForLoggedInUserContext } from "~/common/type/forLoggedInUserType";
import { getLoggedInUserId } from "~/features/users/queries";
import { createReply } from "~/features/community/mutation";
import { useEffect, useRef } from "react";


export const meta: Route.MetaFunction = ({ params }) => {
    return [{ title: `${params.postId} | wemake` }];
};


export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);

    const paramsSchema = z.object({ postId: z.coerce.number(), });
    const { postId } = paramsSchema.parse(params);

    const post = await getPostById(client, postId);
    const replies = await getPostComments(client, postId);

    return { postId, post, replies };
};


export const action = async ({ params, request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const profile_id = await getLoggedInUserId(request);

    const replySchema = z.object({
        reply: z.string().min(1),
        parent_id: z.coerce.number().optional(),
    })
    const { reply, parent_id } = replySchema.parse(Object.fromEntries(formData));

    const postIdParam = z.object({ postId: z.coerce.number() });
    const { postId: post_id } = postIdParam.parse(params);

    await createReply(request, { parent_id, post_id, profile_id, reply });
    return { ok: true };
}


export default function PostPage({ loaderData, actionData }: Route.ComponentProps) {
    const { postId, post, replies } = loaderData;

    const {
        isLoggedIn,
        avatar,
    } = useOutletContext<ForLoggedInUserContext>();

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (actionData?.ok) formRef.current?.reset();
    }, [actionData?.ok]);

    return (
        <div className="space-y-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/community">Community</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/community?topic=${post.topic_slug}`}>
                                {post.topic_name}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/community/${postId}`}>{post.title}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-6 gap-40 items-start">
                <div className="col-span-4 space-y-10">
                    <div className="flex w-full items-start gap-10">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0"/>
                            <span>{post.upvotes}</span>
                        </Button>
                        <div className="space-y-20 w-full">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">{post.title}</h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{post.author_name}</span>
                                    <DotIcon className="size-5"/>
                                    <span>
                                        {DateTime.fromISO(post.created_at).toRelative()}
                                    </span>
                                    <DotIcon className="size-5"/>
                                    <span>{post.replies} replies</span>
                                </div>
                                <p className="text-muted-foreground w-3/4">
                                    {post.content}
                                </p>
                            </div>
                            {isLoggedIn &&
                                <Form className="flex items-start gap-5 w-3/4" method="post" ref={formRef}>
                                    <Avatar className="size-14">
                                        <AvatarFallback>N</AvatarFallback>
                                        <AvatarImage src={avatar ?? undefined}/>
                                    </Avatar>
                                    <div className="flex flex-col gap-5 items-end w-full">
                                        <Textarea
                                            placeholder="Write a reply"
                                            className="w-full resize-none"
                                            rows={5}
                                            name="reply"
                                            required
                                        />
                                        <Button type="submit">Reply</Button>
                                    </div>
                                </Form>
                            }
                            <div className="space-y-10">
                                <h4 className="font-semibold">
                                    {post.replies} Replies
                                </h4>
                                <div className="flex flex-col gap-5">
                                    {replies && replies.length > 0 &&
                                        replies.map((reply, i) => (
                                            <Reply
                                                key={i}
                                                post_reply_id={reply.post_reply_id}
                                                username={reply.user.username}
                                                avatarUrl={reply.user.avatar}
                                                content={reply.reply}
                                                timestamp={DateTime.fromISO(reply.created_at).toRelative()!}
                                                topLevel
                                                postReplies={reply.post_replies}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>{post.author_name[0]}</AvatarFallback>
                            {post.author_avatar ? (
                                <AvatarImage src={post.author_avatar}/>
                            ) : null}
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <h4 className="text-lg font-medium">
                                {post.author_name}
                            </h4>
                            <Badge variant="secondary" className="capitalize">
                                {post.author_role}
                            </Badge>
                        </div>
                    </div>
                    <div className="gap-2 text-sm flex flex-col">
            <span>
              🎂 Joined{" "}
                {DateTime.fromISO(post.author_created_at).toRelative()}{" "}
              ago
            </span>
                        <span>🚀 Launched {post.products} products</span>
                    </div>
                    <Button variant="outline" className="w-full">
                        Follow
                    </Button>
                </aside>
            </div>
        </div>
    );
}