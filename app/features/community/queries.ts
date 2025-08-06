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


import supabase from "~/supa-client";

export const getTopics = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const { data, error } = await supabase.from("topics").select("name, slug");
    if (error) throw new Error(error.message);
    return data;
}

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


export const getPosts = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const { data, error } = await supabase.from("comunity_post_list_view").select(`*`);
    if (error) throw new Error(error.message);
    return data;
}
