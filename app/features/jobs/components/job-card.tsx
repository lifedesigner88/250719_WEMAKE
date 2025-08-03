import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { index } from "@react-router/dev/routes";
import { Link } from "react-router";

interface JobCardProps {
    jobId: String;
    companyName: string;
    companyLogoSrc: string;
    companyHQ: string;
    timeAgo: string;
    title: string;
    jobType: string;
    positionLocation: string;
    salary: string;
}

export default function JobCard({
                                    jobId,
                                    companyName,
                                    companyLogoSrc,
                                    companyHQ,
                                    timeAgo,
                                    title,
                                    jobType,
                                    positionLocation,
                                    salary
                                }: JobCardProps) {
    return (
        <Link to={`/jobs/${jobId}`}>
            <Card className="transition-colors bg-transparent hover:bg-card/50">
                <CardHeader>
                    <div className={"flex items-center gap-4 mb-4"}>
                        <img src={companyLogoSrc}
                             className={"size-12 rounded-full"} alt={"Company Logo"}/>
                        <div className={"space-y-2"}>
                            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
                                <span className={"text-accent-foreground"}>{companyName}</span>
                                <span className={"text-xs text-muted-foreground"}>
                                {timeAgo}
                            </span>
                            </div>
                        </div>
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant={"outline"}>{jobType}</Badge>
                    <Badge variant={"outline"}>{positionLocation}</Badge>
                </CardContent>
                <CardFooter className={"flex justify-between"}>
                    <div className={"flex flex-col"}>
                    <span className={"text-sm font-medium text-muted-foreground"}>
                        {salary}
                    </span>
                        <span className={"text-sm text-muted-foreground"}>
                        {companyHQ}
                    </span>
                    </div>
                    <Button variant={"secondary"} size="sm"> Apply now </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}