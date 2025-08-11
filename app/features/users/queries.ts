import { productRow } from "~/features/products/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export interface ProfileSummary {
    profile_id: string;
    username: string;
    name: string;
    avatar: string | null;
    headline: string | null;
    bio: string | null;
    role: import("@/database.types").Database["public"]["Enums"]["role"];
}

export interface ProfileStats {
    followers: number;
    following: number;
}

export interface ProfileWithStats {
    profile: ProfileSummary;
    stats: ProfileStats;
}

export async function getProfileByUsername(client: SupabaseClient<Database>, username: string): Promise<ProfileSummary | null> {
    const { data, error } = await client
        .from("profiles")
        .select("profile_id, username, name, avatar, headline, bio, role")
        .eq("username", username)
        .single();

    if (error) {
        if ((error as any).code === "PGRST116") return null; // not found
        throw new Error(error.message);
    }
    return data as ProfileSummary;
}

export async function getFollowStats(client: SupabaseClient<Database>, profileId: string): Promise<ProfileStats> {
    const [{ count: followersCount, error: followersError }, {
        count: followingCount,
        error: followingError
    }] = await Promise.all([
        client.from("follows").select("*", { count: "exact", head: true }).eq("following_id", profileId),
        client.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", profileId),
    ]);
    if (followersError) throw new Error(followersError.message);
    if (followingError) throw new Error(followingError.message);
    return { followers: followersCount ?? 0, following: followingCount ?? 0 };
}

export async function getProfileWithStatsByUsername(client: SupabaseClient<Database>, username: string): Promise<ProfileWithStats | null> {
    const profile = await getProfileByUsername(client, username);
    if (!profile) throw new Error("User not found");
    const stats = await getFollowStats(client, profile.profile_id);
    return { profile, stats };
}


export interface userProducts {
    product_id: number;
    name: string;
    tagline: string;
    upvotes: number;
    views: number;
    reviews: number;
    author: {
        username: string;
    };
}

export const getUserProducts = async (client: SupabaseClient<Database>, username: string): Promise<userProducts[]> => {
    const { data, error } = await client
        .from("products")
        .select(`
            ${productRow},
            author:profile_id!inner(username)
        `)
        .eq("profile_id.username", username);

    if (error) throw error;
    return data as unknown as userProducts[];
};


export const getUserPosts = async (client: SupabaseClient<Database>, username: string) => {
    const { data, error } = await client
        .from("comunity_post_list_view")
        .select("*")
        .order("timeAgo", { ascending: false })
        .eq("author", username);
    if (error) throw error;
    return data;
};

export const getUserProfileById = async (client: SupabaseClient<Database>, { userId }: {
    userId: string
}) => {
    const { data, error } = await client
        .from("profiles")
        .select(`
            profile_id,
            name,
            username,
            avatar
        `)
        .eq("profile_id", userId)
        .single();
    if (error) throw error;
    return data;
}
