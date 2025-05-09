import { ReactNode } from "react";
import Navbar from "@/components/Home/Navbar"; // adjust path as needed

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="fixed inset-0 flex flex-col text-white">
            {/* Navbar - fixed height */}
            <header className="z-50 shrink-0">
                <Navbar />
            </header>

            {/* Scrollable main content */}
            <div className="flex-1 overflow-y-auto scrollbar-gold">
                <main className="max-w-screen-xl mx-auto px-6 pt-8 lg:px-12">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
