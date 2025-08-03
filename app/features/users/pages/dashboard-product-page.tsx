import type { Route } from "./+types/dashboard-product-page";
import PageHeader from "~/common/components/page-header";

export const meta: Route.MetaFunction = ({ params }) => [
    { title: `Product ${params.productId} | Dashboard | wemake` },
];

export function loader({ request, params }: Route.LoaderArgs) {
    const { productId } = params;
    return { productId };
}

export function action({ request, params }: Route.ActionArgs) {
    return {};
}

export default function DashboardProductPage({ loaderData }: Route.ComponentProps) {
    const { productId } = loaderData;
    
    return (
        <div className="space-y-20">
            <PageHeader title={`Product ${productId}`} />
            <div className="space-y-6">
                <p>Manage your product details, analytics, and settings.</p>
            </div>
        </div>
    );
}