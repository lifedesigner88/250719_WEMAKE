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

export const meta: Route.MetaFunction = () => {
    return [{ title: "Community | wemake" }];
};

export const loader = async () => {
    const topics = await getTopics();
    const posts = await getPosts();
    return { topics, posts }
}


export default function CommunityPage({ loaderData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
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
                                        {SORT_OPTIONS.map((option) => (
                                            <DropdownMenuCheckboxItem
                                                className="capitalize cursor-pointer"
                                                key={option}
                                                onCheckedChange={(checked: boolean) => {
                                                    if (checked) {
                                                        searchParams.set("sorting", option);
                                                        setSearchParams(searchParams);
                                                    }
                                                }}
                                            >
                                                {option}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {sorting === "popular" && (
                                    <DropdownMenu>
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
                                    </DropdownMenu>
                                )}
                            </div>
                            <Form className="w-2/3">
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search for discussions"
                                />
                            </Form>
                        </div>
                        <Button asChild>
                            <Link to={`/community/submit`}>Create Discussion</Link>
                        </Button>
                    </div>
                    <div className="space-y-5">
                        {loaderData.posts.map((post, index) => (
                            <DiscussionCard
                                key={index}
                                postId={post.postId}
                                title={post.title}
                                author={post.author}
                                avatarSrc={post.avatarSrc}
                                avatarFallback={post.author.slice(0, 2).toUpperCase()}
                                category={post.topics}
                                timeAgo={post.timeAgo}
                                expanded
                                votesCount={post.votesCount}
                            />
                        ))}
                    </div>
                </div>
                <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Topics
          </span>
                    <div className="flex flex-col gap-2 items-start">
                        {loaderData.topics.map((topic) => (
                            <Button asChild variant={"link"} key={topic.slug} className="pl-0">
                                <Link to={`/community?topic=${topic.name}`}>{topic.name}</Link>
                            </Button>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}