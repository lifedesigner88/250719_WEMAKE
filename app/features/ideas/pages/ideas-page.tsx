import type { Route } from "./+types/ideas-page";
import PageHeader from "~/common/components/page-header";
import IdeaCard from "~/features/ideas/components/idea-card";
import { getGptIdeas } from "~/features/ideas/queries";
import { DateTime } from "luxon";
import z from "zod";
import { getUserIdForSever } from "~/features/auth/querys";
import { updateGPTideaClaimed } from "~/features/ideas/mutations";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "IdeasGPT | wemake" },
        { name: "description", content: "Find ideas for your next project" },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const gptIdeas = await getGptIdeas(request, { limit: 30 });
    return { gptIdeas }
}

export const action = async ({ request }: Route.ActionArgs) => {

    const formData = await request.formData();
    const ideaIdSchema = z.object({ ideaId: z.string().regex(/^[0-9]+$/) })
    const result = ideaIdSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) throw { error: "Invalid ideaId" };
    const { ideaId: gpt_idea_id } = result.data;

    const userId = await getUserIdForSever(request);

    await updateGPTideaClaimed(request, gpt_idea_id, {
        claimed_by: userId,
        claimed_at: DateTime.now().toUTC().toISO(),
    })
}


export default function IdeasPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <PageHeader title="IdeasGPT" description="Find ideas for your next project"/>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
                {loaderData.gptIdeas.map((idea, i) => (
                    <IdeaCard
                        key={i}
                        ideaId={`${idea.gpt_idea_id}`}
                        title={idea.idea}
                        viewsCount={idea.views}
                        timeAgo={DateTime.fromISO(idea.created_at).toRelative()!}
                        likesCount={idea.likes}
                        claimed={idea.is_claimed}
                        claimed_by_username={idea.claimed_by_username}
                        claimed_by_avatar={idea.claimed_by_avatar}
                    />
                ))}
            </div>
        </div>
    );
}