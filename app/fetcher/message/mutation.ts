import db from "@/db";
import { sql } from "drizzle-orm";
import { messages } from "~/features/users/schema";

export const findOrCreateChatRoom = async (
    user1Id: string,
    user2Id: string
): Promise<number> => {
    const result = await db.execute(
        sql`SELECT find_or_create_chat_room(${user1Id}::uuid, ${user2Id}::uuid) as room_id`
    );
    return result[0].room_id as number;
};

export const insertMessageInRoom = async ({ sender_id, message_room_id, content }: {
    sender_id: string,
    message_room_id: number,
    content: string
}) => {
    await db.insert(messages).values({
        content,
        sender_id,
        message_room_id,
    });
};