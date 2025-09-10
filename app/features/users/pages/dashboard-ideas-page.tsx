import IdeaCard from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import { getUserIdForSever } from "~/features/auth/querys";
import { DateTime } from "luxon";
import { getMyClaimedIdeas } from "~/features/ideas/queries";


export const meta: Route.MetaFunction = () => {
    return [{ title: "My Ideas | wemake" }];
};


export const loader = async ({ request }: Route.LoaderArgs) => {
    const claimed_by = await getUserIdForSever(request);
    const claimedIdeas = await getMyClaimedIdeas(request, claimed_by);
    console.log(request);
    return { claimedIdeas };
}

export default function DashboardIdeasPage({ loaderData }: Route.ComponentProps) {
    const { claimedIdeas } = loaderData;
    return (
        <div className="space-y-5 h-full w-[calc(100vw-25rem)]">
            <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
                {claimedIdeas.map((idea, index) => (
                    <IdeaCard
                        key={index}
                        ideaId={`${idea.gpt_idea_id}`}
                        title={idea.idea}
                        timeAgo={DateTime.fromISO(idea.claimed_at!).toRelative()!}
                        owner
                    />
                ))}
            </div>
        </div>
    );
}