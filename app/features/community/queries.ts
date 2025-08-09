import supabase from "~/supa-client";
import { DateTime } from "luxon";

export const getTopics = async () => {
    const { data, error } = await supabase.from("topics").select("name, slug");
    if (error) throw new Error(error.message);
    return data;
}


export const getPosts = async ({ limit, sorting = "newest", period = "all", topic, keyword }: {
    limit: number,
    sorting?: "newest" | "popular";
    period?: "all" | "today" | "week" | "month" | "year";
    topic?: string | null;
    keyword?: string | null;
}) => {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    let query = supabase.from("comunity_post_list_view")
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


export const getPostById = async (postId: number) => {
    const { data, error } = await supabase
        .from("community_post_detail")
        .select("*")
        .eq("post_id", postId)
        .single();
    if (error) throw new Error(error.message);
    return data;
}

export const getPostComments = async (postId: number) => {

    const query = `
        post_reply_id,
        reply,
        created_at, 
        user:profile_id ( name, username, avatar )`;

    const { data, error } = await supabase
        .from("post_replies")
        .select(`
            ${query},
            post_replies:post_replies( ${query} ) 
        `)
        .eq("post_id", postId)
        .is("parent_id", null)
        .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
}


// import db from "@/db";
// import { posts, postUpvotes, topics } from "~/features/community/schema";
// import { asc, count, eq } from "drizzle-orm";
// import { profiles } from "~/features/users/schema";
//
// export const getTopics = async () => {
//     return db.select({
//         name: topics.name,
//         slug: topics.slug,
//     }).from(topics);
// }
//
// export const getPosts = async () => {
//     return db.select({
//         postId: posts.post_id,
//         title: posts.title,
//         timeAgo: posts.created_at,
//         topics: topics.name,
//         author: profiles.username,
//         avatarSrc: profiles.avatar,
//         voteCount: count(postUpvotes.post_id),
//     }).from(posts)
//         .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//         .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//         .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//         .groupBy(posts.post_id, topics.name, profiles.username, profiles.avatar)
//         .orderBy(asc(posts.post_id))
// }

// export const getPosts = async () => {
//     const { data, error } = await supabase.from("posts").select(`
//         post_id,
//         title,
//         created_at,
//         topic:topic_id ( name ),
//         author:profile_id ( name, username, avatar ),
//         upvote:post_upvotes ( count )
//   `);
//     if (error) throw new Error(error.message);
//     return data;
// }


