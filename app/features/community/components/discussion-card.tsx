import { Link } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";

interface DiscussionCardProps {
    postId: string;
    title: string;
    author: string;
    category: string;
    timeAgo: string;
    avatarSrc: string;
    avatarFallback: string;
}

export default function DiscussionCard({
                                           postId,
                                           title,
                                           author,
                                           category,
                                           timeAgo,
                                           avatarSrc,
                                           avatarFallback
                                       }: DiscussionCardProps) {
    return (
        <Link to={`/community/${postId}`}>
            <Card className={"bg-transparent hover:bg-card/50 transition-colors"}>
                <CardHeader className={"flex flex-row items-center gap-5"}>
                    <Avatar className={"size-14"}>
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                        <AvatarImage src={avatarSrc}/>
                    </Avatar>
                    <div className={"space-y-2"}>
                        <CardTitle>{title}</CardTitle>
                        <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
                            <span>{author} on</span>
                            <span>{category}</span>
                            <span>&middot;</span>
                            <span>{timeAgo}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className={"flex justify-end"}>
                    <Button variant={"link"} asChild>
                        <Link to={`/community/${postId}`}>
                            Reply  &rarr;
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}