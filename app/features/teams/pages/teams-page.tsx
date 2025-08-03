import type { Route } from "./+types/teams-page";
import PageHeader from "~/common/components/page-header";
import TeamCard from "~/features/teams/components/team-card";

export const meta: Route.MetaFunction = () => [{ title: "Teams | wemake" }];

export default function TeamsPage() {
    return (
        <div className="space-y-20">
            <PageHeader title="Teams" description="Find a team looking for a new member." />
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <TeamCard
                        key={`teamId-${index}`}
                        teamId={`teamId-${index}`}
                        username="lynn"
                        avatarSrc="https://github.com/inthetiger.png"
                        avatarFallback={"LN"}
                        roles={[
                            "React Developer",
                            "Backend Developer",
                            "Product Manager",
                        ]}
                        projectDescription="a new social media platform"
                    />
                ))}
            </div>
        </div>
    );
}