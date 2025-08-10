import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import PageHeader from "~/common/components/page-header";
import { getGptIdea } from "~/features/ideas/queries";
import type { Route } from "./+types/idea-page";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta = ({ data }: Route.MetaArgs) => {
    const { gptIdea }: any = data;
    return [
        { title: `Idea #${gptIdea.gpt_idea_id}: ${gptIdea.idea} | wemake` },
        { name: "description", content: "Find ideas for your next project" },
    ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const numParam = parseInt(params.ideaId!, 10)
    const gptIdea = await getGptIdea(client, numParam);
    return { gptIdea }
}

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="">
            <PageHeader title={`# ${loaderData.gptIdea.gpt_idea_id}`}/>
            <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
                <p className="italic text-center">"{loaderData.gptIdea.idea}"</p>

                <div className="flex items-center text-sm">
                    <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4"/>
                        <span>{loaderData.gptIdea.views}</span>
                    </div>
                    <DotIcon className="w-4 h-4"/>
                    <span>
                    {DateTime.fromISO(loaderData.gptIdea.created_at).toRelative()}
                    </span>
                    <DotIcon className="w-4 h-4"/>
                    <Button variant="outline">
                        <HeartIcon className="w-4 h-4"/>
                        <span>{loaderData.gptIdea.likes}</span>
                    </Button>
                </div>
                <Button size="lg">Claim idea now &rarr;</Button>
            </div>
        </div>
    );
}