import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface IdeaCardProps {
    ideaId: string;
    title: string;
    viewsCount: number;
    timeAgo: string;
    likesCount: number;
    claimed?: boolean;
}

export default function IdeaCard({
                                     ideaId,
                                     title,
                                     viewsCount,
                                     timeAgo,
                                     likesCount,
                                     claimed
                                 }: IdeaCardProps) {
    return (
        <Card className={"bg-transparent hover:bg-card/50 transition-colors"}>
            <CardHeader>
                <Link to={`/ideas/${ideaId}`}>
                    <CardTitle className={"text-xl"}>
                        <span
                            className={cn(claimed ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground" : "")}>
                            {title}
                        </span>
                    </CardTitle>
                </Link>
            </CardHeader>
            <CardContent className={"flex items-center"}>
                <div className={"flex items-center gap-2"}>
                    <EyeIcon className={"size-4"}/>
                    <span>{viewsCount}</span>
                </div>
                <DotIcon className={"size-4"}/>
                <span>{timeAgo}</span>
            </CardContent>
            <CardFooter className={"flex justify-end gap-2"}>
                <Button variant={"outline"}>
                    <HeartIcon className={"size-4"}/>
                    <span>{likesCount}</span>
                </Button>
                {!claimed ? (
                    <Button asChild>
                        <Link to={`/ideas/${ideaId}/claim`}>
                            Claim idea now &rarr;
                        </Link>
                    </Button>
                ) : <Button variant={"outline"} className={"cursor-not-allowed"}>
                    <LockIcon className={"size-4"}></LockIcon>
                    Claimed
                </Button>
                }

            </CardFooter>
        </Card>
    );
}