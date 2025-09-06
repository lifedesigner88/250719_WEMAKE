import db from "@/db";
import { notifications } from "~/features/users/schema";
import { eq, sql } from "drizzle-orm";

export const toggleNotificationRead = async (notificationId: number) => {
    const result = await db
        .update(notifications)
        .set({
            seen: sql`NOT ${notifications.seen}`
        })
        .where(eq(notifications.notification_id, notificationId))
        .returning({ seen: notifications.seen });

    if (result.length === 0) {
        throw new Error("Notification not found");
    }

    return result[0].seen; // 새로운 상태 반환
};
