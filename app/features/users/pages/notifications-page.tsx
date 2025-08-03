import type { Route } from "./+types/notifications-page";
import PageHeader from "~/common/components/page-header";

export const meta: Route.MetaFunction = () => [
    { title: "Notifications | wemake" },
];

export function loader({ request }: Route.LoaderArgs) {
    return {};
}

export function action({ request }: Route.ActionArgs) {
    return {};
}

export default function NotificationsPage() {
    return (
        <div className="space-y-20">
            <PageHeader title="Notifications" />
            <div className="space-y-6">
                <p>View and manage your notifications, alerts, and updates.</p>
            </div>
        </div>
    );
}