import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "~/features/auth/components/auth-buttons";
import { Loader2Icon } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Login | wemake" }];
};


const formSchema = z.object({
    email: z.string({
        required_error: "Email is required ❌",
        invalid_type_error: "Email should ba a String ❌"
    }).email("Invalid email address ❌"),
    password: z.string({
        required_error: "Password is required ❌",
    }).min(8, {
        message: "Password must be at least 8 characters ❌"
    }),
})


export const action = async ({ request }: Route.ActionArgs) => {

    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    )

    if (!success)
        return { loginError: null, formErrors: error.flatten().fieldErrors }

    // data 에는 zod 로 형식이 검증된 데이터가 들어있음.
    const { email, password } = data;
    const { client, headers } = makeSSRClient(request);
    const { error: loginError } = await client.auth.signInWithPassword({
        email,
        password
    })

    if (loginError) {
        let customMessage: string;
        switch (loginError.message) {
            case "Invalid login credentials":
                customMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
                break;
            case "Email not confirmed":
                customMessage = "이메일 인증이 필요합니다. 이메일을 확인해주세요.";
                break;
            case "Too many requests":
                customMessage = "너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.";
                break;
            default:
                customMessage = "로그인 중 오류가 발생했습니다. 다시 시도해주세요.";
        }
        return { loginError: customMessage, formErrors: null }
    }

    return redirect("/", { headers })
}

export default function LoginPage({ actionData }: Route.ComponentProps) {

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    return (
        <div className="flex flex-col relative items-center justify-center h-full">
            <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
                <Link to="/auth/join">Join</Link>
            </Button>
            <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">Log in to your account</h1>
                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        id="email"
                        required
                        type="email"
                        placeholder="i.e wemake@example.com"
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className={"text-sm text-red-500"}>
                            {actionData?.formErrors?.email?.join(",")}
                        </p>
                    )}
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        required
                        type="password"
                        placeholder="i.e wemake@example.com"
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className={"text-sm text-red-500"}>
                            {actionData?.formErrors?.password?.join(",")}
                        </p>
                    )}
                    <Button className="w-full" type="submit">
                        {isSubmitting ? <Loader2Icon className={"animate-spin"}/> : "Log in"}
                    </Button>
                    {actionData && "loginError" in actionData && (
                        <p className={"text-sm text-red-500"}>{actionData.loginError} </p>)}
                </Form>
                <AuthButtons/>
            </div>
        </div>
    );
}