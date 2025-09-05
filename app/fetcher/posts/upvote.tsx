
import type {Route} from "./+types/upvote"
import { getLoggedInUserId } from "~/features/users/queries";

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData()
    const postId = formData.get("post_id") as string
    const userId = await getLoggedInUserId(request)
    console.log(postId, userId, "Action Fetcher")
    return "ok"
}