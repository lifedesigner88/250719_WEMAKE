import type { Route } from "./+types/dashboard-ideas-page";
import PageHeader from "~/common/components/page-header";

export const meta: Route.MetaFunction = () => [
    { title: "My Ideas | wemake" },
];

export function loader({ request }: Route.LoaderArgs) {
    return {};
}

export function action({ request }: Route.ActionArgs) {
    return {};
}

export default function DashboardIdeasPage() {
    return (
        <div className="space-y-20">
            <PageHeader title="My Ideas" />
            <div className="space-y-6">
                <p>Manage your submitted ideas and track their progress.</p>
            </div>
        </div>
    );
}