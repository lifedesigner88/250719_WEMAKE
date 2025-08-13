import { DateTime } from "luxon";
import type { SupabaseClient } from "@supabase/supabase-js";
import { type Database, makePublicClient } from "~/supa-client";
import type { getTopicsType } from "~/features/community/community-type";

export const getTopics = async () => {
    const { data, error } = await makePublicClient.from("topics").select("topic_id, name, slug");
    if (error) throw new Error(error.message);
    return data as getTopicsType[]
}

export const getPosts = async (client: SupabaseClient<Database>, {
    limit,
    sorting = "newest",
    period = "all",
    topic,
    keyword
}: {
    limit: number,
    sorting?: "newest" | "popular";
    period?: "all" | "today" | "week" | "month" | "year";
    topic?: string | null;
    keyword?: string | null;
}) => {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    let query = client.from("comunity_post_list_view")
        .select(`*`)
        .limit(limit);

    // sorting에 따라 정렬 조건 추가 (limit 전에)
    if (sorting === "newest") {
        query = query.order("timeAgo", { ascending: false });
    } else if (sorting === "popular") {

        const today = DateTime.now();
        if (period === "today")
            query = query.gte("timeAgo", today.startOf("day").toISO());
        else if (period === "week")
            query = query.gte("timeAgo", today.startOf("week").minus({ weeks: 1 }).toISO());
        else if (period === "month")
            query = query.gte("timeAgo", today.startOf("month").minus({ month: 1 }).toISO());
        else if (period === "year")
            query = query.gte("timeAgo", today.startOf("year").minus({ years: 1 }).toISO());

        query = query.order("voteCount", { ascending: false });
    }

    if (topic) query = query.eq("topic_slug", topic);
    if (keyword) query = query.ilike("title", `%${keyword}%`);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
}


export const getPostById = async (client: SupabaseClient<Database>, postId: number) => {
    const { data, error } = await client
        .from("community_post_detail")
        .select("*")
        .eq("post_id", postId)
        .single();
    if (error) throw new Error(error.message);
    return data;
}

type UserProfile = {
    name: string;
    username: string;
    avatar: string;
};

export type PostComment = {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: UserProfile;
    post_replies: Omit<PostComment, 'post_replies'>[]; // Nested replies without further nesting
};

export type PostCommentsResponse = PostComment[];


export const getPostComments = async (client: SupabaseClient<Database>, postId: number): Promise<PostCommentsResponse> => {

    const query = `
        post_reply_id,
        reply,
        created_at, 
        user:profile_id ( name, username, avatar )`;

    const { data, error } = await client
        .from("post_replies")
        .select(`
            ${query},
            post_replies:post_replies( ${query} ) 
        `)
        .eq("post_id", postId)
        .is("parent_id", null)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data as unknown as PostCommentsResponse;
}




