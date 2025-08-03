import type { Route } from "./+types/messages-page";
import PageHeader from "~/common/components/page-header";

export const meta: Route.MetaFunction = () => [
    { title: "Messages | wemake" },
];

export function loader({ request }: Route.LoaderArgs) {
    return {};
}

export function action({ request }: Route.ActionArgs) {
    return {};
}

export default function MessagesPage() {
    return (
        <div className="space-y-20">
            <PageHeader title="Messages" />
            <div className="space-y-6">
                <p>View all your messages and conversations.</p>
            </div>
        </div>
    );
}