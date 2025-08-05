import { Link } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronUpIcon } from "lucide-react";
import { DateTime } from "luxon";

interface DiscussionCardProps {
    postId: number;
    title: string;
    author: string;
    category: string;
    timeAgo: Date;
    avatarSrc: string | null;
    avatarFallback: string;
    expanded?: boolean;
    votesCount?: number;
}

export default function DiscussionCard({
                                           postId,
                                           title,
                                           author,
                                           category,
                                           timeAgo,
                                           avatarSrc,
                                           avatarFallback,
                                           expanded = false,
                                           votesCount
                                       }: DiscussionCardProps) {
    return (
        <Link to={`/community/${postId}`} className="block">
            <Card className={cn(
                "bg-transparent hover:bg-card/50 transition-colors",
                expanded ? "flex flex-row items-center justify-between" : ""
            )}
            >
                <CardHeader className={"flex flex-row w-full items-center gap-5"}>
                    <Avatar className={"size-14"}>
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                        {avatarSrc && <AvatarImage src={avatarSrc}/>}
                    </Avatar>
                    <div className={"space-y-2"}>
                        <CardTitle>{title}</CardTitle>
                        <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
                            <span>{author} on</span>
                            <span>{category}</span>
                            <span>&middot;</span>
                            <span>{DateTime.fromJSDate(timeAgo).toRelative()}</span>
                        </div>
                    </div>
                </CardHeader>
                {!expanded && (
                    <CardFooter className="flex justify-end">
                        <Button variant="link">Reply &rarr;</Button>
                    </CardFooter>
                )}
                {expanded && (
                    <CardFooter className="flex justify-end  pb-0">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0"/>
                            <span>{votesCount}</span>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </Link>
    );
}