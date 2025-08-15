import type { TablesUpdate } from "@/database.types";
import { makeSSRClient } from "~/supa-client";


export const editMyProfile = async (
    request: Request,
    myProfileId: string,
    payload: TablesUpdate<"profiles">
) => {
    const { client } = makeSSRClient(request);
    const { error } = await client
        .from("profiles")
        .update(payload)
        .match({ profile_id: myProfileId })
    if (error) throw error;
}