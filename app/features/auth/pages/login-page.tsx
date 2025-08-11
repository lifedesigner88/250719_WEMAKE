import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import { Form, Link, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "~/features/auth/components/auth-buttons";
import { Loader2Icon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Login | wemake" }];
};

export const action = async ({ request }: Route.ActionArgs) => {

    await new Promise(resolve => setTimeout(resolve, 4000));

    const formData = await request.formData();
    const email = formData.get("email1") as string;
    const password = formData.get("password") as string;
    console.log(email, password)

    return {
        message: "Login successful"
    }
}

export default function LoginPage({ actionData }: Route.ComponentProps) {

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

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
                        name="email1"
                        id="email"
                        required
                        type="email"
                        placeholder="i.e wemake@example.com"
                    />
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        required
                        type="password"
                        placeholder="i.e wemake@example.com"
                    />
                    <Button className="w-full" type="submit">
                        {isSubmitting? <Loader2Icon className={"animate-spin"}/>: "Log in"}
                    </Button>
                    {actionData?.message}
                </Form>
                <AuthButtons/>
            </div>
        </div>
    );
}