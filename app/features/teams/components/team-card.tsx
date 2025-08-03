import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

interface TeamCardProps {
    teamId: string;
    username: string;
    avatarSrc: string;
    avatarFallback: string;
    roles: string[];
    projectDescription: string;
}

export default function TeamCard({
                                     teamId,
                                     username,
                                     avatarSrc,
                                     avatarFallback,
                                     roles,
                                     projectDescription
                                 }: TeamCardProps) {
    return (
        <Link to={`/teams/${teamId}`}>
            <Card className={"bg-transparent hover:bg-card/50 transition-colors"}>
                <CardHeader className={"flex flex-row items-center"}>
                    <CardTitle className={"text-base leading-loose"}>
                        <Badge variant={"secondary"} className={"inline-flex shadow-sm items-center"}>
                            <span>@{username}</span>
                            <Avatar className={"size-5"}>
                                <AvatarFallback>{avatarFallback}</AvatarFallback>
                                <AvatarImage src={avatarSrc}/>
                            </Avatar>
                        </Badge>
                        <span> is looking for </span>
                        {roles.map((role, index) => (
                            <Badge key={index} className={"text-base"}>
                                {role}
                            </Badge>
                        ))}
                        <span> to build {projectDescription}</span>
                    </CardTitle>
                </CardHeader>
                <CardFooter className={"justify-end"}>
                    <Button variant={"link"}>
                        Join team &rarr;
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}