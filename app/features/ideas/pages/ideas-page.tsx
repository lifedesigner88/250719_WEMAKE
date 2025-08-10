import type { Route } from "./+types/ideas-page";
import PageHeader from "~/common/components/page-header";
import IdeaCard from "~/features/ideas/components/idea-card";
import { getGptIdeas } from "~/features/ideas/queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "IdeasGPT | wemake" },
        { name: "description", content: "Find ideas for your next project" },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);

    const gptIdeas = await getGptIdeas(client, { limit: 30 });
    return { gptIdeas }
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <PageHeader title="IdeasGPT" description="Find ideas for your next project"/>
            <div className="grid grid-cols-4 gap-4">
                {loaderData.gptIdeas.map((idea, i) => (
                    <IdeaCard
                        key={i}
                        ideaId={idea.gpt_idea_id}
                        title={idea.idea}
                        viewsCount={idea.views}
                        timeAgo={DateTime.fromISO(idea.created_at).toRelative()!}
                        likesCount={idea.likes}
                        claimed={idea.is_claimed}
                    />
                ))}
            </div>
        </div>
    );
}