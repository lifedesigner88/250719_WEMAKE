import type { Route } from "./+types/community-page";
import { Form, Link, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import PageHeader from "~/common/components/page-header";
import DiscussionCard from "~/features/community/components/discussion-card";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../components/constants";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "~/common/components/ui/input";
import { getPosts, getTopics } from "~/features/community/queries";
import { DateTime } from "luxon";
import { z } from "zod";
import { useState } from "react";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Community | wemake" }];
};


export const loader = async ({ request }: Route.LoaderArgs) => {

    const { client  } = makeSSRClient(request);

    const topics = await getTopics(client);
    const topicsArray: string[] = [];

    topics.map(topic => {
        topicsArray.push(topic.slug);
    })

    const searchParamsSchema = z.object({
        sorting: z.enum(SORT_OPTIONS).optional().default("newest"),
        period: z.enum(PERIOD_OPTIONS).optional().default("all"),
        topic: z.enum(topicsArray).optional().default(""),
        keyword: z.string().optional().default(""),
    })

    const url = new URL(request.url);
    const { success, data: parsedData } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!success) throw new Error("Invalid search params");

    const posts = await getPosts(client, { limit: 10, ...parsedData });

    return { topics, posts }
}

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputKeyword, setinputKeyword] = useState("");

    const { topics, posts } = loaderData;
    const sorting = searchParams.get("sorting") || "newest";
    const period = searchParams.get("period") || "all";

    return (
        <div className="space-y-20">
            <PageHeader
                title="Community"
                description="Ask questions, share ideas, and connect with other developers"
            />
            <div className="grid grid-cols-6 items-start gap-40">
                <div className="col-span-4 space-y-10">
                    <div className="flex justify-between">
                        <div className="space-y-5 w-full">
                            <div className="flex items-center gap-5">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1">
                                        <span className="text-sm capitalize">{sorting}</span>
                                        <ChevronDownIcon className="size-5"/>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {SORT_OPTIONS.map((option) => <DropdownMenuCheckboxItem
                                            className="capitalize cursor-pointer"
                                            key={option}
                                            onCheckedChange={(checked: boolean) => {
                                                if (checked) {
                                                    searchParams.set("sorting", option);
                                                    setSearchParams(searchParams);
                                                    if (searchParams.get("sorting") === "newest"){
                                                        searchParams.delete("period");
                                                        setSearchParams(searchParams);
                                                    }
                                                }
                                            }}
                                        >
                                            {option}
                                        </DropdownMenuCheckboxItem>)}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {sorting === "popular" && <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1">
                                        <span className="text-sm capitalize">{period}</span>
                                        <ChevronDownIcon className="size-5"/>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {PERIOD_OPTIONS.map((option) => (
                                            <DropdownMenuCheckboxItem
                                                className="capitalize cursor-pointer"
                                                key={option}
                                                onCheckedChange={(checked: boolean) => {
                                                    if (checked) {
                                                        searchParams.set("period", option);
                                                        setSearchParams(searchParams);
                                                    }
                                                }}
                                            >
                                                {option}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>}
                            </div>
                            <Form className="w-2/3" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const keyword = formData.get("keyword") as string;
                                if (keyword?.trim()) {
                                    searchParams.set("keyword", keyword.trim());
                                    setSearchParams(searchParams);
                                }
                            }}>
                                <Input
                                    type="text"
                                    name="keyword"
                                    value={inputKeyword}
                                    onChange={(e) => {
                                        setinputKeyword(e.target.value)
                                        if (!e.target.value.trim()) {
                                            searchParams.delete("keyword");
                                            setSearchParams(searchParams);
                                            setinputKeyword("");
                                        }
                                    }}
                                    placeholder="Search for discussions"
                                />
                            </Form>
                        </div>
                        <Button asChild>
                            <Link to={`/community/submit`}>Create Discussion</Link>
                        </Button>
                    </div>
                    {/*로딩중에 보게 될 화면*/}

                    <div className="space-y-5">
                        {posts.map((post, index) => <DiscussionCard
                            key={index}
                            postId={post.postId}
                            title={post.title}
                            author={post.author}
                            avatarSrc={post.avatarSrc}
                            avatarFallback={post.author.slice(0, 2).toUpperCase()}
                            category={post.topics}
                            timeAgo={DateTime.fromISO(post.timeAgo).toRelative()!}
                            expanded
                            votesCount={post.voteCount}
                        />)}
                    </div>

                </div>
                <aside className="col-span-2 space-y-5">
                    <span className="text-sm font-bold text-muted-foreground uppercase">
                    Topics
                    </span>
                    <div className="flex flex-col gap-2 items-start">
                        {topics.map((topic) =>
                            <Button variant={"link"} key={topic.slug} className="pl-0" onClick={() => {
                                searchParams.set("topic", topic.slug);
                                setSearchParams(searchParams)
                            }}>
                                {topic.name}
                            </Button>)}
                    </div>
                </aside>
            </div>
        </div>
    );
}

// export function HydrateFallback() {
//     return (
//         <div className="space-y-20">
//             <PageHeader
//                 title="Community"
//                 description="Ask questions, share ideas, and connect with other developers"
//             />
//             <div className="grid grid-cols-6 items-start gap-40">
//                 <div className="col-span-4 space-y-10">
//                     <div className="flex justify-between"></div>
//                 </div>
//             </div>
//         </div>
//     )
// }
