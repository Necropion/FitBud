import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import SidebarProps from "@/types/SidebarProps.tsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AppContext from "@/context/AppContext.tsx";

const Sidebar = ({ sidebarOpen }: SidebarProps) => {

    const navigate = useNavigate();
    const { setAuthenticated } = useContext(AppContext);

    const handleClick = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (e.currentTarget.id == "dashboardBtn") {
            navigate("/home")
        }

        if (e.currentTarget.id == "workoutsBtn") {
            navigate("/workouts")
        }

        if (e.currentTarget.id == "progressBtn") {

        }

        if (e.currentTarget.id == "signOutBtn") {
            setAuthenticated(false)
            localStorage.setItem("authenticated", JSON.stringify(false))
            navigate("/")
        }
    }

    return(
        <aside
            className={cn(
                "fixed top-0 left-16 h-full w-64 bg-gray/200 backdrop-blur-sm shadow-lg z-40 transition-transform duration-300 pt-20 border-r border-orange-600",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-orange-500">FitBud</h2>
                <nav className="space-y-2">
                    <Button id="dashboardBtn" variant="ghost" className="w-full justify-start text-white" onClick={handleClick}>Dashboard</Button>
                    <Button id="workoutsBtn" variant="ghost" className="w-full justify-start text-white" onClick={handleClick}>Workouts</Button>
                    <Button id="progressBtn" variant="ghost" className="w-full justify-start text-white" onClick={handleClick}>Progress</Button>
                    <Button id="signOutBtn" variant="ghost" className="w-full justify-start text-red-500" onClick={handleClick}>Sign out</Button>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;