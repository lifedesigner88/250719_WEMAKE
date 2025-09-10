import db from "@/db";
import { sql } from "drizzle-orm";

export const togglePostUpvote = async (postId: number, profileId: string) => {
    await db.execute(sql`
        WITH deleted AS (
            DELETE FROM post_upvotes
                WHERE post_id = ${postId} AND profile_id = ${profileId}
                RETURNING 1 as deleted)
        INSERT
        INTO post_upvotes (post_id, profile_id)
        SELECT ${postId}, ${profileId}
        WHERE NOT EXISTS (SELECT 1 FROM deleted)
    `);
};

