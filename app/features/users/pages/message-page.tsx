import type { Route } from "./+types/message-page";
import PageHeader from "~/common/components/page-header";

export const meta: Route.MetaFunction = ({ params }) => [
    { title: `Message ${params.messageId} | wemake` },
];

export function loader({ request, params }: Route.LoaderArgs) {
    const { messageId } = params;
    return { messageId };
}

export function action({ request, params }: Route.ActionArgs) {
    return {};
}

export default function MessagePage({ loaderData }: Route.ComponentProps) {
    const { messageId } = loaderData;
    
    return (
        <div className="space-y-20">
            <PageHeader title={`Message ${messageId}`} />
            <div className="space-y-6">
                <p>View and respond to this specific message.</p>
            </div>
        </div>
    );
}