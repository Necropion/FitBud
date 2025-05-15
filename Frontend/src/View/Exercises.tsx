import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {useContext, useEffect, useState} from "react";
import { useTraining } from "@/hooks/useTraining.ts";
import * as React from "react";
import ActiveExerciseModal from "@/components/Exercises/ActiveExerciseModal.tsx";
import AddExercise from "@/components/Exercises/AddExercise.tsx";
import ExerciseFormDTO from "@/types/api/Training/ExerciseFormDTO.tsx";
import {useTrainingWorkout} from "@/hooks/Training/useTrainingWorkout.ts";
import AppContext from "@/context/AppContext.tsx";

const Exercises = () => {
    const { exercises } = useContext(AppContext)
    const { getExercises, addExercise, startExercise, stopExercise, addingExercise, deleteExercise, setAddingExercise, formattedRemainingTime, activeExercise, isRunning, progress, loading } = useTraining();
    const { endWorkout } = useTrainingWorkout();

    // State Variables
    const [exerciseFormData, setExerciseFormData] = useState<ExerciseFormDTO>({
        name: "",
        duration: 0,
        intensity: "",
        description: "",
        category: "",
        equipment_required: ""
    });

    const handleClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (e.currentTarget.id === "addBtn"){
            setAddingExercise(true)
        }

        if (e.currentTarget.id === "cancelBtn") {
            setAddingExercise(false)
        }

        if (e.currentTarget.id === "postExerciseBtn") {
            await addExercise(exerciseFormData);
        }

        if (e.currentTarget.id === "deleteExerciseBtn") {
            await deleteExercise(e.currentTarget.dataset.exerciseId)
        }

        if (e.currentTarget.id === "startBtn") {
            const exerciseIndex = e.currentTarget.dataset.exerciseIndex
            if (exerciseIndex != undefined) {
                const index = parseInt(exerciseIndex, 10)
                const selectedExercise = exercises[index];
                if (selectedExercise) {
                    await startExercise(selectedExercise);
                }
            }
        }

        if (e.currentTarget.id === "stopBtn"){
            await stopExercise();
            await endWorkout();
        }
    }

    useEffect(() => {
        if (exercises.length === 0 || !exercises) {
            getExercises();
        }
    }, [exercises]);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 flex flex-col gap-8 text-white">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Exercises</h1>
                    <p className="text-[#AFAFAF] text-sm">
                        Explore all available exercises and find what fits your goals.
                    </p>
                </div>
                <div>
                    <Button id="addBtn" onClick={handleClickEvent} className="mt-4 self-center bg-[#4CAF50] hover:bg-[#FFFFFF] text-black text-2xl">+</Button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 ">
                {loading ? "Loading..." : exercises.map((exercise, index) => (
                    <Card key={exercise.id} className="bg-[#1A1A1A] border border-[#2A2A2A]">
                        <CardHeader>
                            <CardTitle className="text-[#E6AC00] text-lg text-center">{exercise.name}</CardTitle>
                            <CardDescription className="text-[#AFAFAF] text-center">
                                {exercise.category}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-center text-white space-y-1">
                            <p>
                                <span className="text-[#AFAFAF]">Duration:</span> {exercise.duration} min
                            </p>
                            <p>
                                <span className="text-[#AFAFAF]">Equipment Required:</span> {exercise.equipment_required}
                            </p>
                            <div>
                                <Button id="startBtn"
                                        data-exercise-id={exercise.id}
                                        data-exercise-index={index}
                                        onClick={handleClickEvent}
                                        className="mt-4 mr-4 w-[30%] self-center bg-[#E6AC00] hover:bg-[#cc9900] text-black">
                                    Start Exercise
                                </Button>
                                <Button
                                    id="deleteExerciseBtn"
                                    data-exercise-id={exercise.id}
                                    data-exercise-index={index}
                                    onClick={handleClickEvent}
                                    className="mt-4 w-[30%] self-center bg-[#B52230] hover:bg-[#FFFFFF] text-black">
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {isRunning && activeExercise && (
                <ActiveExerciseModal
                    handleClickEvent={handleClickEvent}
                    formattedRemainingTime={formattedRemainingTime}
                    progress={progress}
                    activeExercise={activeExercise}
                />
            )}
            {addingExercise && (
                <AddExercise
                    handleClickEvent={handleClickEvent}
                    exerciseFormData={exerciseFormData}
                    setExerciseFormData={setExerciseFormData}
                />
            )}
        </div>
    );
};

export default Exercises;
