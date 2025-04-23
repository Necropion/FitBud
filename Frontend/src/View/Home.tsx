import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaClock, FaChartLine, FaUserCircle } from "react-icons/fa";
import DashboardLayout from "@/components/Home/DashboardLayout.tsx";

const Home = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-12">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl xl:text-5xl font-bold tracking-tight mb-2">Welcome Back 👋</h1>
                    <p className="text-zinc-400 text-lg xl:text-xl">Here’s your fitness overview.</p>
                </header>

                {/* Dashboard Cards */}
                <div className="grid gap-6 xl:gap-8 md:grid-cols-3">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-orange-500 flex items-center gap-2">
                                <FaDumbbell /> Active Streak
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                You’ve worked out 5 days in a row!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-white">🔥 5 Days</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-orange-500 flex items-center gap-2">
                                <FaClock /> Weekly Time
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                Hours spent training this week
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-white">7h 45m</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-orange-500 flex items-center gap-2">
                                <FaChartLine /> Progress
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                You’re making solid gains 💪
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-white">+12%</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Profile Card */}
                <aside className="mt-10 max-w-sm mx-auto md:mx-0">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="text-center">
                            <FaUserCircle className="text-6xl mx-auto text-orange-500 mb-2" />
                            <CardTitle className="text-xl font-semibold text-white">Jokubas</CardTitle>
                            <CardDescription className="text-zinc-400">Member since 2024</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-zinc-300 space-y-2">
                            <p>
                                <span className="font-semibold text-white">Email:</span> you@example.com
                            </p>
                            <p>
                                <span className="font-semibold text-white">Goal:</span> Muscle Gain
                            </p>
                            <p>
                                <span className="font-semibold text-white">Next Workout:</span> Leg Day (Tomorrow)
                            </p>
                            <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                                Edit Profile
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </DashboardLayout>
    );
};

export default Home;
