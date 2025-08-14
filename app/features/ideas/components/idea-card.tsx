import { Form, Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

interface IdeaCardProps {
    ideaId: string;
    title: string;
    viewsCount?: number;
    timeAgo: string;
    likesCount?: number;
    claimed?: boolean;
    owner?: boolean;
    claimed_by_username?: string | null,
    claimed_by_avatar?: string | null,
}

export default function IdeaCard({
                                     ideaId,
                                     title,
                                     viewsCount,
                                     timeAgo,
                                     likesCount,
                                     claimed,
                                     owner,
                                     claimed_by_avatar,
                                     claimed_by_username,
                                 }: IdeaCardProps) {
    return (
        <Card className={"bg-transparent flex flex-col justify-between hover:bg-card/50 transition-colors min-h-[230px]"}>
            <CardHeader>
                <Link to={(owner || !claimed) ? `/ideas/${ideaId}` : ""}>
                    <CardTitle className={"text-xl"}>
                        <span
                            className={cn(claimed
                                ? "bg-muted-foreground break-all selection:bg-muted-foreground text-muted-foreground"
                                : "")}>
                            {title}
                        </span>
                    </CardTitle>
                </Link>
            </CardHeader>
            <div>
                <CardContent className={"flex items-center"}>
                    {!owner && (<>
                        <div className={"flex items-center gap-2"}>
                            <EyeIcon className={"size-4"}/>
                            <span>{viewsCount}</span>
                        </div>
                        <DotIcon className={"size-4"}/>
                    </>)}
                    <span>{timeAgo}</span>
                </CardContent>
                {!owner && (
                    <CardFooter className={"flex justify-between gap-2"}>
                        {claimed ?
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={claimed_by_avatar ?? ""}/>
                                    <AvatarFallback>{claimed_by_username?.[0]?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <p className={"text-sm"}>
                                    {claimed_by_username}
                                </p>
                            </div>
                            : <div/>
                        }

                        <div className={"flex gap-2"}>
                            <Button variant={"outline"}>
                                <HeartIcon className={"size-4"}/>
                                <span>{likesCount}</span>
                            </Button>
                            {!claimed ? (
                                <Form method={"post"}>
                                    <input type="hidden" name="ideaId" value={ideaId}/>
                                    <Button>
                                        Claim idea now &rarr;
                                    </Button>
                                </Form>
                            ) : <Button variant={"outline"} className={"cursor-not-allowed bg-gray-200"}>
                                <LockIcon className={"size-4"}></LockIcon>
                                Claimed
                            </Button>
                            }
                        </div>

                    </CardFooter>
                )}
            </div>
        </Card>
    )
        ;
}