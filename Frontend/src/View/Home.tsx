import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { FaDumbbell, FaClock, FaChartLine } from "react-icons/fa";
import { useContext, useEffect } from "react";
import AppContext from "@/context/AppContext.tsx";
import { useAuthUser } from "@/hooks/Authentication/useAuthUser.ts"
import {useTrainingWorkout} from "@/hooks/Training/useTrainingWorkout.ts";
import {format, formatDistanceStrict, differenceInMinutes} from "date-fns";

const Home = () => {
    const { user } = useContext(AppContext);
    const { fetchUser } = useAuthUser();
    const { fetchUserWorkouts, workouts, loading } = useTrainingWorkout();

    // Re-render if user details not present
    useEffect(() => {
        if (!user?.id) {
            fetchUser();
        }
    }, [user]);

    // Re-render if user workouts not present
    useEffect(() => {
        fetchUserWorkouts();
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

            {/* Workouts Section */}
            <section>
                <h2 className="text-2xl font-semibold text-white mb-4 text-center">Recent Activity</h2>
                <div className="space-y-4">
                    {loading ? "Loading activity" : workouts
                        .slice()
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map(workout => (
                        <Card key={workout.id} className="bg-[#2A2A2A] border-[#3A3A3A]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-white text-lg">{workout.name}</CardTitle>
                                <CardDescription className="text-[#AFAFAF] text-sm">Started: {workout.created_at ? format(new Date(workout.created_at), "HH:mm PPP") : "N/A"}</CardDescription>
                                <CardDescription className="text-[#AFAFAF] text-sm">Ended: {workout.ended_at ? format(new Date(workout.ended_at), "HH:mm PPP") : "N/A"}</CardDescription>
                                {workout.ended_at && workout.created_at && (
                                    <CardDescription className="text-[#AFAFAF] text-sm">
                                        Duration: {formatDistanceStrict(new Date(workout.created_at), new Date(workout.ended_at))}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#E0DED9] text-base">{workout.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
