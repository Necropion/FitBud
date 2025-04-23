import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import DashboardLayout from "@/components/Home/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import WorkoutDTO from "@/types/api/WorkoutDTO.tsx";

const Workouts = () => {
    const [workouts, setWorkouts] = useState<WorkoutDTO[]>([]);

    // Placeholder effect — you’ll add your own fetch logic here.
    useEffect(() => {
        // Example dummy data
        setWorkouts([
            {
                id: 1,
                name: "Leg Day Strength",
                category: "Legs",
                duration: 45,
                intensity: "High",
            },
            {
                id: 2,
                name: "Core Crusher",
                category: "Core",
                duration: 30,
                intensity: "Medium",
            },
            {
                id: 3,
                name: "Push Power",
                category: "Upper Body",
                duration: 40,
                intensity: "Medium",
            },
        ]);
    }, []);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Workouts</h1>
                    <p className="text-zinc-400 text-sm">
                        Explore all available workouts and find what fits your goals.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {workouts.map((workout) => (
                        <Card key={workout.id} className="bg-zinc-900 border border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-orange-500 text-lg">{workout.name}</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    {workout.category}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-white space-y-1">
                                <p>
                                    <span className="text-zinc-400">Duration:</span> {workout.duration} min
                                </p>
                                <p>
                                    <span className="text-zinc-400">Intensity:</span> {workout.intensity}
                                </p>
                                <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white">
                                    Start Workout
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Workouts;
