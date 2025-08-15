import { HomeIcon, RocketIcon, SparklesIcon } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "~/common/components/ui/sidebar";
import type { Route } from "./+types/dashboard-layout";
import { getLoggedInUserId, getProducdtsByUserIdForDashBoard } from "~/features/users/queries";


export const loader = async ({ request }: Route.LoaderArgs) => {
    const userId = await getLoggedInUserId(request);
    const products = await getProducdtsByUserIdForDashBoard(request, userId);
    return { products }
}


export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
    const { products } = loaderData;
    const location = useLocation();
    return (
        <SidebarProvider className="flex  min-h-full">
            <Sidebar className="pt-16" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/my/dashboard"}
                                >
                                    <Link to="/my/dashboard">
                                        <HomeIcon className="size-4"/>
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/my/dashboard/ideas"}
                                >
                                    <Link to="/my/dashboard/ideas">
                                        <SparklesIcon className="size-4"/>
                                        <span>Ideas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Product Analytics</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                {products?.length > 0
                                    ? products.map((p) => (
                                        <SidebarMenuButton
                                            key={p.product_id}
                                            asChild
                                            isActive={
                                                location.pathname ===
                                                `/my/dashboard/products/${p.product_id}`
                                            }
                                        >
                                            <Link to={`/my/dashboard/products/${p.product_id}`}>
                                                <RocketIcon className="size-4"/>
                                                <span>{p.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    ))
                                    : null
                                }
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className="h-full w-full">
                <Outlet/>
            </div>
        </SidebarProvider>
    );
};