import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import DashboardLayout from "@/components/Home/Dashboard/DashboardLayout.tsx";
import { Button } from "@/components/ui/button";
import {useContext, useEffect, useState} from "react";
import WorkoutDTO from "@/types/api/WorkoutDTO.tsx";
import AppContext from "@/context/AppContext.tsx";

const Workouts = () => {

    const { gateway } = useContext(AppContext);

    const [workouts, setWorkouts] = useState<WorkoutDTO[]>([]);

    const fetchWorkouts = async () => {

        const getWorkouts = await fetch(`${gateway.exercise}/exercises/`)
        const workoutsList = await getWorkouts.json();

        if (getWorkouts.ok) {
            setWorkouts(workoutsList);
        }
    }

    useEffect(() => {
        fetchWorkouts();
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
                        <Card key={workout.Id} className="bg-zinc-900 border border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-orange-500 text-lg">{workout.Name}</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    {workout.Category}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-white space-y-1">
                                <p>
                                    <span className="text-zinc-400">Duration:</span> {workout.Duration} min
                                </p>
                                <p>
                                    <span className="text-zinc-400">Intensity:</span> {workout.Intensity}
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
