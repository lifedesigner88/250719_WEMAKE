import supabase from "~/supa-client";

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

export async function getProfileByUsername(username: string): Promise<ProfileSummary | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("profile_id, username, name, avatar, headline, bio, role")
        .eq("username", username)
        .single();

    if (error) {
        if (error.code === "PGRST116") return null; // not found
        throw new Error(error.message);
    }
    return data as ProfileSummary;
}

export async function getFollowStats(profileId: string): Promise<ProfileStats> {
    const [{ count: followersCount, error: followersError }, {
        count: followingCount,
        error: followingError
    }] = await Promise.all([
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", profileId),
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", profileId),
    ]);
    if (followersError) throw new Error(followersError.message);
    if (followingError) throw new Error(followingError.message);
    return { followers: followersCount ?? 0, following: followingCount ?? 0 };
}

export async function getProfileWithStatsByUsername(username: string): Promise<ProfileWithStats | null> {
    const profile = await getProfileByUsername(username);
    if (!profile) return null;
    const stats = await getFollowStats(profile.profile_id);
    return { profile, stats };
}


export async function getProductseWithByProfileId(profileId: string) {
    const { data, error } = await supabase
        .from("products")
        .select(`
              product_id,
              name,
              tagline,
              upvotes:stats->>upvotes,
              views:stats->>views,
              reviews:stats->>reviews
            `)
        .eq("profile_id", profileId)
        .order("created_at", { ascending: false });

    console.log(data);
    if (error) throw new Error(error.message);
    return data;
}