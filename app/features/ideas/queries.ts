import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getGptIdeas = async (
  client: SupabaseClient<Database>,
  { limit }: { limit: number }
) => {
  const { data, error } = await client
    .from("get_ideas_view")
    .select("*")
    .limit(limit);
  if (error) throw error;
  return data as any[];
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