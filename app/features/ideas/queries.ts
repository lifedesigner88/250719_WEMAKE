import supabase from "~/supa-client";

export const getGptIdeas = async ({ limit }: { limit: number }) => {

    const { data, error } = await supabase
        .from("get_ideas_view")
        .select("*")
        .limit(limit)
    if (error) throw error;
    return data;
}

export const getGptIdea = async (ideaId: number) => {
    const { data, error } = await supabase
        .from("get_ideas_view")
        .select("*")
        .eq("gpt_idea_id", ideaId)
        .single();
    if (error) throw error;
    return data;
};