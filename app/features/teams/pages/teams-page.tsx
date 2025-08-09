import type { Route } from "./+types/teams-page";
import PageHeader from "~/common/components/page-header";
import TeamCard from "~/features/teams/components/team-card";
import { getTeams } from "~/features/teams/queries";

export const meta: Route.MetaFunction = () => [{ title: "Teams | wemake" }];

export const loader = async () => {
    const teams = await getTeams({ limit: 60 });
    return { teams };
};

function csvToList(value: string) {
    return value.split(",").map((v) => v.trim()).filter(Boolean);
}

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <PageHeader title="Teams" description="Find a team looking for a new member." />
            <div className="grid grid-cols-4 gap-4">
                {loaderData.teams.map((team) => (
                    <TeamCard
                        key={team.team_id}
                        teamId={team.team_id}
                        username={team.product_name}
                        avatarSrc={team.leader.avatar}
                        avatarFallback={team.product_name.slice(0, 2).toUpperCase()}
                        roles={csvToList(team.roles)}
                        projectDescription={team.product_description}
                    />
                ))}
            </div>
        </div>
    );
}