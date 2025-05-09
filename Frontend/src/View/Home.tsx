import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaDumbbell, FaClock, FaChartLine } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/AppContext.tsx";
import DashboardLayout from "@/components/Home/Dashboard/DashboardLayout.tsx";

const dummyFeed = [
    {
        id: 1,
        user: "Alex Johnson",
        activity: "Completed a 5K run in 24 minutes! 🏃‍♂️",
        timestamp: "2 hours ago",
    },
    {
        id: 2,
        user: "Samantha Lee",
        activity: "Hit a new PR: 100kg deadlift 💪",
        timestamp: "Yesterday",
    },
    {
        id: 3,
        user: "Derek Chen",
        activity: "Completed Chest & Triceps workout",
        timestamp: "2 days ago",
    },
];

const Home = () => {
    const { gateway, user, setUser } = useContext(AppContext);
    const [feed, setFeed] = useState(dummyFeed);

    const fetchUser = async () => {
        const getUser = await fetch(`${gateway.authentication}user/${user.id}`);
        const response = await getUser.json();

        if (getUser.ok) {
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 space-y-10 text-white">
            {/* Header */}
            <header>
                <h1 className="text-4xl font-bold tracking-tight mb-2 text-center">Welcome Back {user.name}! 👋</h1>
                <p className="text-[#AFAFAF] text-lg text-center">Here’s what’s happening today.</p>
            </header>

            {/* Top Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                    <CardHeader>
                        <CardTitle className="text-[#E6AC00] flex items-center gap-2">
                            <FaDumbbell /> Active Streak
                        </CardTitle>
                        <CardDescription className="text-[#AFAFAF]">You’ve worked out 5 days in a row!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-white">🔥 5 Days</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                    <CardHeader>
                        <CardTitle className="text-[#E6AC00] flex items-center gap-2">
                            <FaClock /> Weekly Time
                        </CardTitle>
                        <CardDescription className="text-[#AFAFAF]">Hours spent training this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-white">7h 45m</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                    <CardHeader>
                        <CardTitle className="text-[#E6AC00] flex items-center gap-2">
                            <FaChartLine /> Progress
                        </CardTitle>
                        <CardDescription className="text-[#AFAFAF]">You’re making solid gains 💪</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-white">+12%</p>
                    </CardContent>
                </Card>
            </div>

            {/* Feed Section */}
            <section>
                <h2 className="text-2xl font-semibold text-white mb-4 text-center">Recent Activity</h2>
                <div className="space-y-4">
                    {feed.map(post => (
                        <Card key={post.id} className="bg-[#2A2A2A] border-[#3A3A3A]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-white text-lg">{post.user}</CardTitle>
                                <CardDescription className="text-[#AFAFAF] text-sm">{post.timestamp}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#E0DED9] text-base">{post.activity}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
