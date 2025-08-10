import type { Tables, TablesInsert } from "@/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export type JobRow = Tables<"jobs">;
export type JobInsert = TablesInsert<"jobs">;

export async function getJobs(client: SupabaseClient<Database>, {
    limit, jobType, jobLocation, salaryRange
}: GetJobsParams) {
    let query = client
        .from("jobs")
        .select("*")
        .order("create_at", { ascending: false })
        .limit(limit);

    if (jobType) query = query.eq("job_types", jobType);
    if (jobLocation) query = query.eq("job_location", jobLocation);
    if (salaryRange) query = query.eq("salary_range", salaryRange);

    const { data, error } = await query;
    if (error) throw error;
    return data as JobRow[];
}

export interface GetJobsParams {
    limit: number;
    jobType?: string | null;
    jobLocation?: string | null;
    salaryRange?: string | null;
}

export async function getJob(client: SupabaseClient<Database>,
                             jobId: number) {
    const { data, error } = await client
        .from("jobs")
        .select("*")
        .eq("job_id", jobId)
        .single();
    if (error) throw error;
    return data as JobRow;
}

export async function createJob(client: SupabaseClient<Database>,
    payload: JobInsert) {
    const { data, error } = await client
        .from("jobs")
        .insert(payload)
        .select("*")
        .single();
    if (error) throw error;
    return data as JobRow;
}
