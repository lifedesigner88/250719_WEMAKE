import type { Route } from "./+types/seen";
import { toggleNotificationRead } from "~/fetcher/notifications/mutations";
import { z } from "zod";

export const action = async ({ request }: Route.ActionArgs) => {
    if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const formData = await request.formData();

        const schema = z.object({
            notificationId: z.coerce.number()
        });

        const { notificationId } = schema.parse({
            notificationId: formData.get("notificationId")
        });

        const newSeenStatus = await toggleNotificationRead(notificationId);

        return new Response(JSON.stringify({ seen: newSeenStatus }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error toggling notification read status:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}