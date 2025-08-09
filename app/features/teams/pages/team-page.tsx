import type { Route } from "./+types/team-page";
import { Button } from "~/common/components/ui/button";
import { data, Form } from "react-router";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import InputPair from "~/common/components/input-pair";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/common/components/ui/card";
import PageHeader from "~/common/components/page-header";
import { getTeam } from "~/features/teams/queries";

export const meta: Route.MetaFunction = () => [
    { title: "Team Details | wemake" },
];

export const loader = async ({ params }: Route.LoaderArgs) => {
    const teamId = Number(params.teamId);
    if (!teamId || Number.isNaN(teamId)) throw data(null, { status: 404 });
    const team = await getTeam(teamId);
    return { team };
};

function csvToList(value: string) {
    return value.split(",").map((v) => v.trim()).filter(Boolean);
}

export default function TeamPage({ loaderData }: Route.ComponentProps) {
    const { team } = loaderData;

    console.log(team);
    return (
        <div className="space-y-20">
            <PageHeader title={`Join ${team.product_name}'s team 🚀🚀 `} />
            <div className="grid grid-cols-6 gap-40 items-start">
                <div className="col-span-4 grid grid-cols-4 gap-5">
                    {[
                        {
                            title: "Product name",
                            value: team.product_name,
                        },
                        {
                            title: "Stage",
                            value: team.product_stage,
                        },
                        {
                            title: "Team size",
                            value: team.team_size,
                        },
                        {
                            title: "Available equity",
                            value: team.equity_split,
                        },
                    ].map((item) => (
                        <Card key={item.title}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                </CardTitle>
                                <CardContent className="p-0 font-bold text-2xl">
                                    <p>{item.value}</p>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Looking for
                            </CardTitle>
                            <CardContent className="p-0 font-bold text-2xl">
                                <ul className="text-lg list-disc list-inside">
                                    {csvToList(team.roles).map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Idea description
                            </CardTitle>
                            <CardContent className="p-0 font-medium text-xl">
                                <p>{team.product_description}</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>{team.leader.username.slice(0, 1).toUpperCase()}</AvatarFallback>
                            <AvatarImage src={team.leader.avatar} alt={team.leader.username} />
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">{team.product_name}</h4>
                            <Badge variant="secondary">{team.product_stage}</Badge>
                        </div>
                    </div>
                    <Form className="space-y-5">
                        <InputPair
                            label="Introduce yourself"
                            description="Tell us about yourself"
                            name="introduction"
                            type="text"
                            id="introduction"
                            required
                            textArea
                            placeholder="i.e. I'm a React Developer with 3 years of experience"
                        />
                        <Button type="submit" className="w-full">
                            Get in touch
                        </Button>
                    </Form>
                </aside>
            </div>
        </div>
    );
}