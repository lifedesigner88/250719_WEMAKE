import type { Route } from "./+types/send-first"
import { getUserIdForSever } from "~/features/auth/querys";
import { findOrCreateChatRoom, insertMessageInRoom } from "~/fetcher/message/mutation";
import { redirect } from "react-router";

export const action = async ({ request }: Route.ActionArgs) => {
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 })

    const sender_id = await getUserIdForSever(request)
    const formData = await request.formData()
    const receiver_id = formData.get("to_user_id") as string
    const content = formData.get("message") as string

    const message_room_id = await findOrCreateChatRoom(sender_id, receiver_id)
    await insertMessageInRoom({
        sender_id,
        message_room_id,
        content
    })
    return redirect(`/my/messages/${message_room_id}`)
}