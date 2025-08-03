import type { Route } from "./+types/dashboard-page";
import PageHeader from "~/common/components/page-header";

export const meta: Route.MetaFunction = () => [
    { title: "Dashboard | wemake" },
];

export function loader({ request }: Route.LoaderArgs) {
    return {};
}

export function action({ request }: Route.ActionArgs) {
    return {};
}

export default function DashboardPage() {
    return (
        <div className="space-y-20">
            <PageHeader title="Dashboard" />
            <div className="space-y-6">
                <p>Welcome to your dashboard. Here you can manage your products, ideas, and more.</p>
            </div>
        </div>
    );
}