import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import * as React from "react";
import Sidebar from "@/components/Home/Sidebar.tsx";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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

            <Sidebar sidebarOpen={sidebarOpen} />

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
