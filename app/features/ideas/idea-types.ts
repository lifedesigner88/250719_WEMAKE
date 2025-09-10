import type { Tables } from "@/database.types";

export type getMyClaimedIdeasType = Pick<
    Tables<"gpt_ideas">,
    "claimed_at" | "idea" | "gpt_idea_id"
> & {
    claimed_at: NonNullable<Tables<"gpt_ideas">["claimed_at"]>
}


export type getGptIdeasType = Tables<"get_ideas_view"> & {
    claimed_by_avatar: string | null
    claimed_by_username: string | null
    created_at: string
    gpt_idea_id: number
    idea: string
    is_claimed: boolean
    likes: number
    views: number
}
