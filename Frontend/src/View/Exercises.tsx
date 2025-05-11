import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useTraining } from "@/hooks/useTraining.ts";

const Exercises = () => {
    const { getExercises, exercises, loading } = useTraining();

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 flex flex-col gap-8 text-white">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Workouts</h1>
                <p className="text-[#AFAFAF] text-sm">
                    Explore all available workouts and find what fits your goals.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {loading ? "Loading..." : exercises.map((exercise) => (
                    <Card key={exercise.id} className="bg-[#1A1A1A] border border-[#2A2A2A]">
                        <CardHeader>
                            <CardTitle className="text-[#E6AC00] text-lg">{exercise.name}</CardTitle>
                            <CardDescription className="text-[#AFAFAF]">
                                {exercise.category}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-white space-y-1">
                            <p>
                                <span className="text-[#AFAFAF]">Description:</span> {exercise.description}
                            </p>
                            <p>
                                <span className="text-[#AFAFAF]">Equipment Required:</span> {exercise.equipment_required}
                            </p>
                            <Button className="mt-4 w-full bg-[#E6AC00] hover:bg-[#cc9900] text-black">
                                Start Workout
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Exercises;
