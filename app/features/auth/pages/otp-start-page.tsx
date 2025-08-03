import type { Route } from "./+types/otp-start-page";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "OTP Login | wemake" },
        { name: "description", content: "Sign in with one-time password" },
    ];
};

export default function OtpStartPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Sign in with OTP</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Enter your email to receive a one-time password
                </p>
            </div>
            
            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your email"
                    />
                </div>
                
                <Button type="submit" className="w-full">
                    Send OTP
                </Button>
            </form>
            
            <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link to="/auth/login" className="text-red-600 hover:text-red-500">
                        Sign in with password
                    </Link>
                </p>
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/auth/join" className="text-red-600 hover:text-red-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}