import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleClick = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


    }

    return (
        <div className="relative flex min-h-screen bg-black text-white overflow-hidden">
            {/* Sidebar + Toggle Button Container */}
            <div className="flex flex-col w-16 items-center pt-4 z-50 bg-black border-r border-orange-600">
                <Button
                    variant="ghost"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white text-2xl p-2"
                >
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </Button>
            </div>

            {/* Sidebar */}
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

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 transition-all duration-300 ease-in-out p-8 pt-20",
                    "ml-16", // Account for button area
                    sidebarOpen ? "pointer-events-none" : ""
                )}
            >
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
