import type { Route } from "./+types/community-page";
import { Form, Link, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "~/common/components/ui/input";
import PageHeader from "~/common/components/page-header";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../components/constants";
import DiscussionCard from "~/features/community/components/discussion-card";

export const meta: Route.MetaFunction = () => {
    return [{ title:"Community | wemake" }];
};

export default function CommunityPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sorting = searchParams.get("sorting") || "newest";
    const period = searchParams.get("period") || "all";
    return (
        <div>
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
                        {Array.from({ length:11 }).map((_, index) => (
                            <DiscussionCard
                                key={`postId-${index}`}
                                postId={`postId-${index}`}
                                title="What is the best productivity tool?"
                                author="Nico"
                                avatarSrc="https://github.com/apple.png"
                                avatarFallback={"Nico"}
                                category="Productivity"
                                timeAgo="12 hours ago"
                                expanded
                                votesCount={index}
                            />
                        ))}
                    </div>
                </div>
                <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Topics
          </span>
                    <div className="flex flex-col gap-2 items-start">
                        {[
                            "AI Tools",
                            "Design Tools",
                            "Dev Tools",
                            "Note Taking Apps",
                            "Productivity Tools",
                        ].map((category) => (
                            <Button asChild variant={"link"} key={category} className="pl-0">
                                <Link to={`/community?topic=${category}`}>{category}</Link>
                            </Button>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}