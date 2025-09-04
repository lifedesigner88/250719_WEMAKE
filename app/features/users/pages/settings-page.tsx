import { Form, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import React, { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId, getUserProfileByIdForEdit } from "~/features/users/queries";
import type { Route } from "./+types/settings-page";
import type { getUserProfileByIdForEditType } from "~/features/users/userType";
import { USER_ROLE_OPTIONS } from "~/features/users/usersConstants";
import { editMyProfile } from "~/features/users/userMutations";
import { Loader2Icon } from "lucide-react";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Settings | wemake" }];
};


export const loader = async ({ request }: Route.LoaderArgs) => {
    const userId = await getLoggedInUserId(request);
    const profileInfo = await getUserProfileByIdForEdit(request, userId);
    return { profileInfo };
}


export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const myProfileId = await getLoggedInUserId(request);
    const avatar = formData.get("avatar") as File;

    if (avatar && avatar instanceof File) {
        if (avatar.size <= 1024 * 1024 && avatar.type.startsWith("image/")) {
            const { client } = makeSSRClient(request);

            // 파일 최초 업로드 시도.
            const { data, error } = await client.storage
                .from("wemake_for_avartar")
                .upload(`${myProfileId}/${Date.now()}`, avatar, {
                    upsert: false,
                    contentType: avatar.type,
                })
            if (error) {
                console.error("✏️ Error uploading avatar:", error);
                return { formErrors: { avatar: ["Failed to upload avatar"] } };
            }
            console.log(data, "🚀 success upload to supabase")


            const {
                data: { publicUrl }
            } = client.storage.from("wemake_for_avartar").getPublicUrl(data.path);

            await editMyProfile(request, myProfileId, {
                ...Object.fromEntries(formData),
                avatar: publicUrl,
            })

        }

    } else {
        await editMyProfile(request, myProfileId, Object.fromEntries(formData))
    }
    const username = formData.get("username") as string;
    return redirect(`/users/${encodeURIComponent(username)}`)
}

export default function SettingsPage({ loaderData }: Route.ComponentProps) {

    const { profileInfo } = loaderData as { profileInfo: getUserProfileByIdForEditType };
    const { name, role, headline, bio, avatar, username } = profileInfo;

    const [newAvatar, setNewAvatar] = useState<string | null>(null);
    if (newAvatar === null) setNewAvatar(avatar);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setNewAvatar(URL.createObjectURL(file));
        }
    };

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";


    return (
        <div className="space-y-20">
            <div className="grid grid-cols-6 gap-40">
                <div className="ml-10 col-span-3 flex flex-col gap-10">
                    <h2 className="text-2xl font-semibold">Edit profile</h2>
                    <Form className="flex flex-col gap-5" method={"post"}>
                        <input type="hidden" name="username" value={username}/>
                        <InputPair
                            label="Name"
                            description="Your public name"
                            required
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            defaultValue={name}
                        />
                        <SelectPair
                            label="Role"
                            description="What role do you do identify the most with"
                            name="role"
                            placeholder="Select a role"
                            options={USER_ROLE_OPTIONS}
                            defaultValue={role}
                        />
                        <InputPair
                            label="Headline"
                            description="An introduction to your profile."
                            required
                            id="headline"
                            name="headline"
                            placeholder="empty"
                            textArea
                            defaultValue={headline ?? ""}
                        />
                        <InputPair
                            label="Bio"
                            description="Your public bio. It will be displayed on your profile page."
                            required
                            id="bio"
                            name="bio"
                            placeholder="empty"
                            textArea
                            defaultValue={bio ?? ""}
                        />
                        <Button className="w-full" type="submit">
                            {isSubmitting ? <Loader2Icon className={"animate-spin"}/> : "Update profile"}
                        </Button>
                    </Form>
                </div>
                <Form className="flex flex-col justify-center items-center col-span-3 p-6 rounded-lg border shadow-md"
                      method={"post"}
                      encType="multipart/form-data">
                    <input type="hidden" name="username" value={username}/>
                    <Label className="flex flex-col gap-1">
                        Avatar
                        <small className="text-muted-foreground">
                            This is your public avatar.
                        </small>
                    </Label>
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <div className="size-40 rounded-full shadow-xl overflow-hidden ">
                            {newAvatar ? (
                                <img src={newAvatar} className="object-cover w-full h-full" alt={"upload image"}/>
                            ) : null}
                        </div>
                        <Input
                            type="file"
                            className="w-full"
                            onChange={onChange} // 사용자에게 미리보기 해주는 역할 // Input type"file" 은 event.target.file[] 로 저장됨.
                            required
                            name="avatar"
                        />
                        <div className="flex flex-col text-xs bg w-full pl-8">
                            <span className=" text-muted-foreground">
                                Recommended size: 128x128px
                            </span>
                            <span className=" text-muted-foreground">
                                Allowed formats: PNG, JPEG
                            </span>
                            <span className=" text-muted-foreground">Max file size: 1MB</span>
                        </div>
                        <Button className="w-full" type="submit">
                            {isSubmitting ? <Loader2Icon className={"animate-spin"}/> : "Update avatar"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}