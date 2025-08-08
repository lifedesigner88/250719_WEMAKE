import supabase from "~/supa-client";
import type { Enums, Tables, TablesInsert } from "@/database.types";

export type JobRow = Tables<"jobs">;
export type JobInsert = TablesInsert<"jobs">;

export interface GetJobsParams {
    limit: number;
    jobType?: string | null;
    jobLocation?: string | null;
    salaryRange?: string | null;
}

export async function getJobs({ limit, jobType, jobLocation, salaryRange }: GetJobsParams) {
    let query = supabase
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

export async function getJob(jobId: number) {
    const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("job_id", jobId)
        .single();
    if (error) throw error;
    return data as JobRow;
}

export async function createJob(payload: JobInsert) {
    const { data, error } = await supabase
        .from("jobs")
        .insert(payload)
        .select("*")
        .single();
    if (error) throw error;
    return data as JobRow;
}
