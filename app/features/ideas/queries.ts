import type { SupabaseClient } from "@supabase/supabase-js";
import { type Database, makeSSRClient } from "~/supa-client";
import type { getGptIdeasType, getMyClaimedIdeasType } from "~/features/ideas/idea-types";



export const getGptIdeas = async (
    request: Request,
    { limit }: { limit: number }
) : Promise<getGptIdeasType[]> => {
    const { client } = makeSSRClient(request);
    const { data, error } = await client
        .from("get_ideas_view")
        .select("*")
        .limit(limit);
    if (error) throw error;
    return data;
};

export const getGptIdea = async (
    client: SupabaseClient<Database>,
    ideaId: number
) => {
    const { data, error } = await client
        .from("get_ideas_view")
        .select("*")
        .eq("gpt_idea_id", ideaId)
        .single();
    if (error) throw error;
    return data;
};



export const getMyClaimedIdeas = async (
    request: Request,
    claimed_by: string
) : Promise<getMyClaimedIdeasType[]> => {
    console.log(request);
    const { client } = makeSSRClient(request);
    const { data, error } = await client
        .from("gpt_ideas")
        .select("claimed_at, idea, gpt_idea_id")
        .eq("claimed_by", claimed_by)
    if (error) throw error;
    return data
}