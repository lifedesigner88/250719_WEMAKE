import type { SupabaseClient } from "@supabase/supabase-js";
import type { Tables, TablesInsert, Database } from "@/database.types";

export type TeamRow = Tables<"team">;
export type TeamInsert = TablesInsert<"team">;

export interface GetTeamsParams {
    limit: number;
}

type RawTeam = TeamRow & {
    leader: {
        username: string;
        avatar: string;
    };
};

export async function getTeams(client: SupabaseClient<Database>, { limit }: GetTeamsParams): Promise<RawTeam[]> {
    const { data, error } = await client
        .from("team")
        .select(`*,      
            leader:profiles( username, avatar)
        `)
        .order("created_at", { ascending: false })
        .limit(limit);
    if (error) throw error;
    return data as RawTeam[];
}

export async function getTeam(client: SupabaseClient<Database>, teamId: number): Promise<RawTeam> {
    const { data, error } = await client
        .from("team")
        .select(`*,      
            leader:profiles( username, avatar )
        `)
        .eq("team_id", teamId)
        .single();
    if (error) throw error;
    return data as RawTeam;
}

export async function createTeam(client: SupabaseClient<Database>, payload: TeamInsert): Promise<TeamRow> {
    const { data, error } = await client
        .from("team")
        .insert(payload)
        .select("team_id")
        .single();
    if (error) throw error;
    return data as TeamRow;
}
