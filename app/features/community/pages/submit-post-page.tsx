import type { Route } from "./+types/submit-post-page";
import { Form, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import PageHeader from "~/common/components/page-header";
import { getTopics } from "~/features/community/queries";
import { getUserIdForSever } from "~/features/auth/querys";
import { z } from "zod";
import { createPost } from "~/features/community/mutation";
import { Loader2Icon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Submit Post | wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const topics = await getTopics();
    return { topics };
}

const createPostSchema = z.object({
        title: z.string().min(4)
            .max(40)
            .nonempty("Title is required"),
        content: z.string().min(10)
            .max(1000)
            .nonempty("Content is required"),
        topic_id: z.coerce.string().min(1)
            .nonempty("Topic is required"),
    }
)

export const action = async ({ request }: Route.ActionArgs) => {

    const userId = await getUserIdForSever(request);
    const formData = await request.formData();

    const { success, error, data } = createPostSchema.safeParse(Object.fromEntries(formData));
    if (!success) return { fieldErrors: z.treeifyError(error).properties }

    const { post_id } = await createPost(request, { ...data, userId });

    return redirect(`/community/${post_id}`);
}

export default function SubmitPostPage({ loaderData, actionData }: Route.ComponentProps) {
    const { topics } = loaderData;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";


    return (
        <div className="space-y-20">
            <PageHeader
                title="Create Discussion"
                description="Ask questions, share ideas, and connect with other developers"
            />
            <Form className="flex flex-col gap-10 max-w-screen-md mx-auto" method="post">
                <InputPair
                    label="Title"
                    name="title"
                    id="title"
                    description="(40 characters or less)"
                    required
                    placeholder="i.e What is the best productivity tool?"
                />
                {actionData && "fieldErrors" in actionData && (
                    <p className={"text-sm text-red-500"}>
                        {actionData?.fieldErrors?.title?.errors.join(",")}
                    </p>
                )}

                <SelectPair
                    required
                    name="topic_id"
                    label="Topic"
                    description="Select the topic that best fits your discussion"
                    placeholder="i.e Productivity"
                    options={topics.map((topic) => ({
                        label: topic.name,
                        value: `${topic.topic_id}`,
                    }))}
                />
                {actionData && "fieldErrors" in actionData && (
                    <p className={"text-sm text-red-500"}>
                        {actionData?.fieldErrors?.topic_id?.errors.join(",")}
                    </p>
                )}
                <InputPair
                    label="Content"
                    name="content"
                    id="content"
                    description="(1000 characters or less)"
                    required
                    placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are the best tools out there?"
                    textArea
                />
                {actionData && "fieldErrors" in actionData && (
                    <p className={"text-sm text-red-500"}>
                        {actionData?.fieldErrors?.content?.errors.join(",")}
                    </p>
                )}
                <Button className="w-full cursor-pointer" type="submit">
                    {isSubmitting ? <Loader2Icon className={"animate-spin"}/> : "Submit Post"}
                </Button>
            </Form>
        </div>
    );
};