import db from "@/db";
import { posts, postUpvotes, topics } from "~/features/community/schema";
import { asc, count, eq } from "drizzle-orm";
import { profiles } from "~/features/users/schema";

export const getTopics = async () => {
    return db.select({
        name: topics.name,
        slug: topics.slug,
    }).from(topics);
}

export const getPosts = async () => {
    return db.select({
        postId: posts.post_id,
        title: posts.title,
        timeAgo: posts.created_at,
        topics: topics.name,
        author: profiles.username,
        avatarSrc: profiles.avatar,
        voteCount: count(postUpvotes.post_id),
    }).from(posts)
        .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
        .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
        .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
        .groupBy(posts.post_id, topics.name, profiles.username, profiles.avatar)
        .orderBy(asc(posts.post_id))
}