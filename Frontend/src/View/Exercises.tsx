import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {useEffect} from "react";
import { useTraining } from "@/hooks/useTraining.ts";
import * as React from "react";

const Exercises = () => {
    const { getExercises, startExercise, formatTime, exercises, activeExercise, isRunning, progress, remainingTime, loading } = useTraining();

    const handleClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (e.currentTarget.id === "startBtn") {
            const exerciseIndex = e.currentTarget.dataset.exerciseIndex
            if (exerciseIndex != undefined) {
                const index = parseInt(exerciseIndex, 10)
                startExercise(exercises[index]);
            }
        }
    }

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 flex flex-col gap-8 text-white">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Exercises</h1>
                <p className="text-[#AFAFAF] text-sm">
                    Explore all available exercises and find what fits your goals.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {loading ? "Loading..." : exercises.map((exercise, index) => (
                    <Card key={exercise.id} className="bg-[#1A1A1A] border border-[#2A2A2A]">
                        <CardHeader>
                            <CardTitle className="text-[#E6AC00] text-lg">{exercise.name}</CardTitle>
                            <CardDescription className="text-[#AFAFAF]">
                                {exercise.category}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-white space-y-1">
                            <p>
                                <span className="text-[#AFAFAF]">Duration:</span> {exercise.duration} min
                            </p>
                            <p>
                                <span className="text-[#AFAFAF]">Equipment Required:</span> {exercise.equipment_required}
                            </p>
                            <Button id="startBtn"
                                    data-exercise-id={exercise.id}
                                    data-exercise-index={index}
                                    onClick={handleClickEvent}
                                    className="mt-4 w-full bg-[#E6AC00] hover:bg-[#cc9900] text-black">
                                Start Exercise
                            </Button>
                        </CardContent>
                        {isRunning && activeExercise && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-white p-6">
                                <h2 className="text-3xl font-bold mb-4">Now Doing: {activeExercise.name}</h2>
                                <p className="text-lg text-[#E6AC00] mb-6">{activeExercise.description}</p>
                                <p className="text-2xl mb-4">{formatTime(remainingTime)}</p>
                                <div className="w-full max-w-lg h-4 bg-[#2A2A2A] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#E6AC00] transition-all duration-100"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </Card>

                ))}
            </div>
        </div>
    );
};

export default Exercises;
