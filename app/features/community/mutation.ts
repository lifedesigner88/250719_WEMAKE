import { makeSSRClient } from "~/supa-client";


export const createPost = async (request: Request, { title, topic_id, content, userId }: {
    title: string,
    topic_id: string,
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
    return data as { post_id: string };
}