import type { Route } from "./+types/my-profile-page";
import PageHeader from "~/common/components/page-header";

export const meta: Route.MetaFunction = () => [
    { title: "My Profile | wemake" },
];

export function loader({ request }: Route.LoaderArgs) {
    return {};
}

export function action({ request }: Route.ActionArgs) {
    return {};
}

export default function MyProfilePage() {
    return (
        <div className="space-y-20">
            <PageHeader title="My Profile" />
            <div className="space-y-6">
                <p>Manage your profile information, bio, and public visibility settings.</p>
            </div>
        </div>
    );
}