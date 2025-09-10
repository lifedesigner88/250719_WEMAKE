import type { Route } from "./+types/upvote"
import { getUserIdForSever } from "~/features/auth/querys";
import { togglePostUpvote } from "~/fetcher/posts/mutation";

export const action = async ({ request }: Route.ActionArgs) => {
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 })
    const formData = await request.formData()
    const postId = formData.get("post_id") as string
    const userId = await getUserIdForSever(request)
    await togglePostUpvote(Number(postId), userId)
    return new Response("OK")
}