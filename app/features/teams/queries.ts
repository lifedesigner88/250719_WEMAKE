import supabase from "~/supa-client";
import type { Tables, TablesInsert } from "@/database.types";

export type TeamRow = Tables<"team">;
export type TeamInsert = TablesInsert<"team">;

export interface GetTeamsParams {
    limit: number;
}

type RawTeam = TeamRow & {
    // 조인으로 가져오는 중첩 결과(컬럼명은 원하는 대로 alias)
    leader: { username: string };
};


export async function getTeams({ limit }: GetTeamsParams) {
    const { data, error } = await supabase
        .from("team")
        .select(`*,      
            leader:profiles( username, avatar)
        `)
        .order("created_at", { ascending: false })
        .limit(limit);
    if (error) throw error;
    return data as RawTeam[];
}

export async function getTeam(teamId: number) {
    const { data, error } = await supabase
        .from("team")
        .select(`*,      
            leader:profiles( username, avatar )
        `)
        .eq("team_id", teamId)
        .single();
    if (error) throw error;
    return data as RawTeam;
}

export async function createTeam(payload: TeamInsert) {
    const { data, error } = await supabase
        .from("team")
        .insert(payload)
        .select("*")
        .single();
    if (error) throw error;
    return data as TeamRow;
}
