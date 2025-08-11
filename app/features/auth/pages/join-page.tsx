import { Button } from "~/common/components/ui/button";
import { Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { z } from "zod";
import { checkUsernameExists } from "~/features/auth/querys";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Join | wemake" }];
};

const formSchema = z.object({
        name: z.string().min(3),
        username: z.string().min(3),
        email: z.email(),
        password: z.string().min(8),
    }
)

// ActionData 타입 정의
interface ActionData {
    formErrors?: {
        name?: { errors: string[] };
        username?: { errors: string[] };
        email?: { errors: string[] };
        password?: { errors: string[] };
    };
    signUpError?: string;
}

export const action = async ({ request }: Route.ActionArgs): Promise<ActionData | Response> => {
    const formData = await request.formData();

    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
    if (!success)
        return { formErrors: z.treeifyError(error).properties }

    const usernameExists = await checkUsernameExists({ username: data?.username })
    if (usernameExists)
        return { formErrors: { username: { errors: ["Username already exists"] } } }

    const { client, headers } = makeSSRClient(request);
    const { error: signUpError } = await client.auth.signUp({
        email: data?.email,
        password: data?.password,
        options: {
            data: { name: data?.name, username: data?.username }
        }
    })
    if (signUpError) return { signUpError: signUpError.message }

    return redirect("/", { headers })
}

export default function JoinPage({ actionData }: Route.ComponentProps) {

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    // 타입 가드로 actionData 체크
    const typedActionData = actionData as ActionData | undefined;

    return (
        <div className="flex flex-col relative items-center justify-center h-full">
            <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
                <Link to="/auth/login">Login</Link>
            </Button>
            <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">Create an account</h1>
                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        label="Name"
                        description="Enter your name"
                        name="name"
                        id="name"
                        required
                        type="text"
                        placeholder="Enter your name"
                    />
                    {typedActionData?.formErrors?.name && (
                        <p className={"text-red-500"}>
                            {typedActionData.formErrors.name.errors.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="username"
                        label="Username"
                        description="Enter your username"
                        name="username"
                        required
                        type="text"
                        placeholder="i.e wemake"
                    />
                    {typedActionData?.formErrors?.username && (
                        <p className={"text-red-500"}>
                            {typedActionData.formErrors.username.errors.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        required
                        type="email"
                        placeholder="i.e wemake@example.com"
                    />
                    {typedActionData?.formErrors?.email && (
                        <p className={"text-red-500"}>
                            {typedActionData.formErrors.email.errors.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        required
                        type="password"
                        placeholder="Enter your password"
                    />
                    {typedActionData?.formErrors?.password && (
                        <p className={"text-red-500"}>
                            {typedActionData.formErrors.password.errors.join(", ")}
                        </p>
                    )}

                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? (<LoaderCircle className={"animate-spin"}/>)
                            : "Create account"
                        }
                    </Button>
                    {typedActionData?.signUpError && (
                        <p className={"text-red-500"}>
                            {typedActionData.signUpError}
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
}