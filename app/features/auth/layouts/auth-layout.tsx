import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/ui/flickering-grid";

export default function AuthLayout() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <FlickeringGrid className="hidden lg:block" squareSize={10} color="rgb(255, 0, 0)" maxOpacity={1}/>
            <Outlet />
        </div>
    );
}