import type { TablesUpdate } from "@/database.types";
import { makeSSRClient } from "~/supa-client";


export const updateGPTideaClaimed = async (
    request: Request,
    gpt_idea_id: string,
    payload: TablesUpdate<"gpt_ideas">
) => {

    const { client } = makeSSRClient(request);

    const { error } = await client
        .from("gpt_ideas")
        .update(payload)
        .eq("gpt_idea_id", gpt_idea_id)

    if (error) throw error;
}