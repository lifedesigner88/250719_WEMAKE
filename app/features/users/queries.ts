import { productRow } from "~/features/products/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import { type Database, makeSSRClient } from "~/supa-client";
import type { getProducdtsByUserIdForDashBoardType, getUserProfileByIdForEditType } from "~/features/users/userType";
import db from "@/db";
import { messageRoomMembers, messages, notifications, profiles, messageRooms } from "~/features/users/schema";
import { and, asc, eq, ne, desc } from "drizzle-orm";


export const getUserMessageRoom = async (userId: string) => {
    return db.query.messageRoomMembers.findMany({
        where: eq(messageRoomMembers.profile_id, userId),
        columns: {
            message_room_id: true,
        },
        with: {
            room: {
                columns: {
                    message_room_id: false,
                    created_at: false,
                },
                with: {
                    messages: {
                        columns: {
                            content: true,
                            created_at: true,
                        },
                        orderBy: [asc(messages.created_at)],
                        limit: 1,
                        with: {
                            sender: {
                                columns: {
                                    username: true,
                                }
                            }
                        }
                    },
                    members: {
                        columns: {
                            profile_id: false,
                            created_at: false,
                            message_room_id: false,
                        },
                        where: ne(messageRoomMembers.profile_id, userId),
                        with: {
                            member: {
                                columns: {
                                    username: true,
                                    avatar: true,
                                }
                            }
                        },
                    }
                }
            },
        }
    })
}

export const getMeessagesByRoomId = async (roomId: number) => {
    return db.query.messageRooms.findFirst({
        where: eq(messageRooms.message_room_id, roomId),
        with: {
            messages: {
                columns: {
                    content: true,
                    created_at: true,
                    sender_id: true,
                },
                with: {
                    sender: {
                        columns: {
                            avatar: true,
                            profile_id: true,
                            username: true,
                        }
                    }
                },
                orderBy: [asc(messages.created_at)],
            },
            members: {
                columns: {
                    profile_id: false
                },
                with: {
                    member: {
                        columns: {
                            avatar: true,
                            username: true,
                            profile_id: true,
                        }
                    }
                },

            },
        }

    })
}

export const postMessageToDMRoom = async ({ sender_id, message_room_id, content }: {
    senderId: string,
    message_room_id: number,
    content: string,
}) => {
    return db.insert(messages).values({
        content,
        message_room_id,
        sender_id,
    }).returning();
}

export const isThisUserRoomMember = async (roomId: number, userId: string) => {
    const result = await db.query.messageRoomMembers.findFirst({
        where: and(
            eq(messageRoomMembers.message_room_id, roomId),
            eq(messageRoomMembers.profile_id, userId)
        ),
        columns: {
            message_room_id: true,
        }
    })
    return result !== undefined;
}

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

export async function getProfileByUsername(
    client: SupabaseClient<Database>,
    username: string
): Promise<ProfileSummary | null> {
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

export async function getFollowStats(
    client: SupabaseClient<Database>,
    profileId: string
): Promise<ProfileStats> {
    const [{ count: followersCount, error: followersError }, {
        count: followingCount,
        error: followingError
    }] = await Promise.all([
        client.from("follows")
            .select("*", { count: "exact", head: true })
            .eq("following_id", profileId),
        client.from("follows")
            .select("*", { count: "exact", head: true })
            .eq("follower_id", profileId),
    ]);
    if (followersError) throw new Error(followersError.message);
    if (followingError) throw new Error(followingError.message);
    return { followers: followersCount ?? 0, following: followingCount ?? 0 };
}

export async function getProfileWithStatsByUsername(
    client: SupabaseClient<Database>,
    username: string): Promise<ProfileWithStats | null> {
    const profile = await getProfileByUsername(client, username);
    console.log(profile, "오ㅑ오ㅑ");
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

export const getUserProducts = async (
    client: SupabaseClient<Database>,
    username: string
): Promise<userProducts[]> => {
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


export const getProducdtsByUserIdForDashBoard = async (
    request: Request,
    userId: string
): Promise<getProducdtsByUserIdForDashBoardType[]> => {
    const { client } = makeSSRClient(request);
    const { data, error } = await client
        .from("products")
        .select(` product_id, name `)
        .eq("profile_id", userId);
    if (error) throw error;
    return data;
}

export const checkIfUserIsProductOwner = async (
    request: Request, {
        productId,
        userId
    }: { productId: number, userId: string }
): Promise<boolean> => {
    const { client } = makeSSRClient(request);
    const { data, error } = await client
        .from("products")
        .select(` profile_id `)
        .eq("product_id", productId)
        .single();
    if (error) throw error;
    return data.profile_id === userId;
}

export const getUserPosts = async (client: SupabaseClient<Database>, username: string) => {
    const { data, error } = await client
        .from("comunity_post_list_view")
        .select("*")
        .order("timeAgo", { ascending: false })
        .eq("author", username);
    if (error) throw error;
    return data;
};


export const getMyNotifications = async (userId: string) => {
    const result = await db.query.notifications.findMany({
        where: eq(notifications.target_id, userId),
        columns: {
            notification_id: true,
            type: true,
            created_at: true,
            seen: true,
        },
        orderBy: [desc(notifications.created_at)],
        with: {
            source: {
                columns: {
                    username: true,
                    avatar: true,
                }
            },
            product: {
                columns: {
                    product_id: true,
                    name: true,
                }
            },
            post: {
                columns: {
                    post_id: true,
                    title: true,
                }
            }
        }
    });

    // Date를 ISO string으로 변환
    return result.map(notification => ({
        ...notification,
        created_at: notification.created_at.toISOString()
    }));
}

export interface getUserProfileById {
    username: string,
    avatar: string | null,
    name: string,
    profile_id: string,
}

export const getUserProfileById = async (client: SupabaseClient<Database>, { userId }: {
    userId: string
}): Promise<getUserProfileById> => {
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


export const getUserProfileByIdWithDrizzle = async (userId: string) => {
    return db.query.profiles.findFirst({
        where: eq(profiles.profile_id, userId),
        columns: {
            profile_id: true,
            name: true,
            username: true,
            avatar: true,
        },
        with: {
            notifications: {
                columns: {
                    seen: true, // 최소한의 용량
                },
                where: eq(notifications.seen, false)
            }
        }
    });
}

export const getUserProfileByIdForEdit = async (
    request: Request,
    userId: string
): Promise<getUserProfileByIdForEditType> => {
    const { client } = makeSSRClient(request);
    const { data, error } = await client
        .from("profiles")
        .select(`
            name,
            username,
            avatar,
            headline,
            role,
            bio
        `)
        .eq("profile_id", userId)
        .single();
    if (error) throw error;
    return data;
}



