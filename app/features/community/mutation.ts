import { makeSSRClient } from "~/supa-client";
import type { TablesInsert } from "@/database.types";


export const createPost = async (request: Request, { title, topic_id, content, userId }: {
    title: string,
    topic_id: number,
    content: string,
    userId: string,
}) => {
    const { client } = makeSSRClient(request);
    const { data, error } = await client.from("posts").insert({
        title,
        content,
        topic_id,
        profile_id: userId
    })
        .select("post_id")
        .single();
    if (error) throw error;
    return data;
}


export const createReply = async (
    request: Request,
    payload: TablesInsert<"post_replies">
) => {
    const { client } = makeSSRClient(request);

    const { error } = await client
        .from("post_replies")
        .insert(payload)

    if (error) throw error;
}