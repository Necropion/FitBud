import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import DashboardLayout from "@/components/Home/Dashboard/DashboardLayout.tsx";
import { Button } from "@/components/ui/button";
import {useEffect} from "react";
import {useTraining} from "@/hooks/useTraining.ts";


const Exercises = () => {

    const { getExercises, exercises, loading} = useTraining();

    useEffect(() => {
        getExercises();
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
                    {loading ? "Loading..." : exercises.map((exercise) => (
                        <Card key={exercise.Id} className="bg-zinc-900 border border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-orange-500 text-lg">{exercise.Name}</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    {exercise.Category}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-white space-y-1">
                                <p>
                                    <span className="text-zinc-400">Duration:</span> {exercise.Duration} min
                                </p>
                                <p>
                                    <span className="text-zinc-400">Intensity:</span> {exercise.Intensity}
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

export default Exercises;
