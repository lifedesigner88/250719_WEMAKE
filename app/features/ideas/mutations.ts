import type { TablesUpdate } from "@/database.types";
import { makeSSRClient } from "~/supa-client";
import db from "@/db";
import { gptIdeas } from "~/features/ideas/schema";


export const updateGPTideaClaimed = async (
    request: Request,
    gpt_idea_id: number,
    payload: TablesUpdate<"gpt_ideas">
) => {

    const { client } = makeSSRClient(request);

    const { error } = await client
        .from("gpt_ideas")
        .update(payload)
        .eq("gpt_idea_id", gpt_idea_id)

    if (error) throw error;
}


export const insertIdeas = async (
    ideas: string[]
) => {
   await db.insert(gptIdeas).values(
        ideas.map(idea => (
            { idea }
        ))
    )
};