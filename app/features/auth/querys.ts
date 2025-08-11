import { makePublicClient } from "~/supa-client";

export const checkUsernameExists = async ({ username }: { username: string }) => {
    const { error } = await makePublicClient
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single()
    return !error
}