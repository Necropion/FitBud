import React, {useContext, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import WorkoutPlanFormDTO from "@/types/api/Training/WorkoutPlanFormDTO.tsx";
import DiagonalIconGrid from "@/components/Background/DiagonalIconGrid.tsx";
import MuscleGroupDTO from "@/types/api/Training/MuscleGroupDTO.tsx";
import AppContext from "@/context/AppContext.tsx";
import {useTrainingGoal} from "@/hooks/Training/useTrainingGoal.ts";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useTraining} from "@/hooks/useTraining.ts";
import ExerciseDTO from "@/types/api/Training/ExerciseDTO.tsx"; // Example Lucide icons

interface AddWorkoutPlanProps {
    handleClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    workoutPlanFormData: WorkoutPlanFormDTO;
    setWorkoutPlanFormData: React.Dispatch<React.SetStateAction<WorkoutPlanFormDTO>>;
    muscleGroups: MuscleGroupDTO[];
    step: number
}

const AddWorkoutPlan: React.FC<AddWorkoutPlanProps> = ({
                                                           handleClickEvent,
                                                           workoutPlanFormData,
                                                           setWorkoutPlanFormData,
                                                           muscleGroups,
                                                           step
                                                       }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWorkoutPlanFormData((prev) => ({ ...prev, [name]: value }));
    };

    const { userGoals, exercises } = useContext(AppContext);
    const { getUserGoals } = useTrainingGoal();
    const { getExercises } = useTraining();

    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
    const [muscleExercises, setMuscleExercises] = useState<Record<string, ExerciseDTO[]>>({});

    const handleAddExercise = (muscle: string, exercise: ExerciseDTO) => {
        setMuscleExercises((prev) => ({
            ...prev,
            [muscle]: [...(prev[muscle] || []), exercise],
        }));
    };

    const handleRemoveExercise = (muscle: string, index: number) => {
        setMuscleExercises(prev => {
            const updated = [...(prev[muscle] || [])];
            updated.splice(index, 1);
            return { ...prev, [muscle]: updated };
        });
    };


    const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (e.currentTarget.id === "muscleBtn") {
            const newMuscle = e.currentTarget.dataset.name

            if (selectedMuscleGroups.includes(newMuscle) || newMuscle === null) {
                setSelectedMuscleGroups(prev => {
                    const newValue = prev.filter(item => item !== newMuscle)
                    console.log(newValue);
                    return newValue;
                });
            } else {
                setSelectedMuscleGroups(prev => {
                    const newValue = [...prev, newMuscle];
                    console.log(newValue);
                    return newValue;
                });
            }
        }

    }

    useEffect(() => {
        getUserGoals()
    }, []);

    useEffect(() => {
        getExercises()
    }, []);

    const steps = [
        {
            label: "Please pick a name for your program",
            content: (
                <div className="w-full h-full">
                    <input
                        type="text"
                        name="name"
                        className="w-[60%] p-2 rounded bg-[#2A2A2A] text-white"
                        value={workoutPlanFormData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            ),
        },
        {
            label: "Please pick a goal for your program",
            content: (
                <div className="flex justify-center w-full h-full">
                    <Select>
                        <SelectTrigger className="w-[60%] bg-[#2A2A2A] text-white border border-[#444]">
                            <SelectValue placeholder="Select a Goal" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2A2A2A] text-white border border-[#444]">
                            <SelectGroup>
                                <SelectLabel className="text-[#CCCCCC] px-2 py-1">Your Goals</SelectLabel>
                                {userGoals.map((goal) => (
                                    <SelectItem
                                        key={goal.id}
                                        value={goal.type}
                                        className="bg-[#2A2A2A]
                                        text-white
                                        hover:bg-[#3A3A3A]
                                        hover:text-white
                                        focus:bg-[#3A3A3A]
                                        focus:text-white
                                        aria-selected:bg-[#444]"
                                    >
                                        {goal.type}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            )
        },
        {
            label: "Please write a description for your program",
            content: (
                <div className="w-full h-full">
                    <textarea
                        name="description"
                        className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                        rows={4}
                        value={workoutPlanFormData.description}
                        onChange={handleChange}
                    />
                </div>
            )
        },
        {
            label: "Would you like to add some notes for your program?",
            content: (
                <div className="w-full h-full">
                    <textarea
                        name="notes"
                        className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                        rows={3}
                        value={workoutPlanFormData.notes}
                        onChange={handleChange}
                    />
                </div>
            )
        },
        {
            label: "Please pick the muscle group you would like to target?",
            content: (
                <div className="h-full w-full grid grid-cols-4 grid-rows-3 gap-4 p-4">
                    {muscleGroups?.map((g) => (
                        <Toggle
                            key={g.id}
                            id="muscleBtn"
                            data-name={g.name}
                            variant="outline"
                            pressed={selectedMuscleGroups.includes(g.name)}
                            onClick={handleToggle}
                            className="h-24 w-full rounded-2xl bg-[#2A2A2A] text-white text-lg font-medium shadow-sm hover:bg-[#3A3A3A] focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 ease-in-out"
                        >
                            {g.name}
                        </Toggle>
                    ))}
                </div>
            )
        },
        {
            label: "Please add exercises to each muscle group:",
            content: (
                <div className="h-full w-full grid grid-rows gap-6 p-4 overflow-y-auto">
                    {selectedMuscleGroups.map((muscle) => (
                        <Card key={muscle} className="bg-[#1F1F1F] border border-[#333] p-4 text-white">
                            <CardTitle className="text-xl mb-2">{muscle}</CardTitle>
                            <CardContent className="space-y-3">
                                {(muscleExercises[muscle] || []).map((exercise, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div key={idx} className="w-full p-4 bg-[#2A2A2A] rounded-xl border border-[#444] shadow-sm space-y-2">
                                            {/* Header */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-white">{exercise.name}</span>
                                                <span className="text-sm text-yellow-400 font-medium">{exercise.intensity}</span>
                                            </div>

                                            {/* Duration */}
                                            <div className="text-sm text-gray-400">Duration: {exercise.duration} min</div>

                                            {/* Sets and Reps Inputs */}
                                            <div className="flex gap-4">
                                                <div className="flex flex-col w-1/2">
                                                    <label className="text-xs text-gray-300 mb-1" htmlFor={`sets-${idx}`}>Sets</label>
                                                    <Input
                                                        id={`sets-${idx}`}
                                                        placeholder="e.g. 3"
                                                        type="number"
                                                        className="bg-[#1A1A1A] text-white border border-[#555] placeholder:text-gray-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <label className="text-xs text-gray-300 mb-1" htmlFor={`reps-${idx}`}>Reps</label>
                                                    <Input
                                                        id={`reps-${idx}`}
                                                        placeholder="e.g. 12"
                                                        type="number"
                                                        className="bg-[#1A1A1A] text-white border border-[#555] placeholder:text-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                                <Select onValueChange={(value) => handleAddExercise(muscle, value)}>
                                    <SelectTrigger className="w-full bg-[#2A2A2A] text-white border border-[#444]">
                                        <SelectValue placeholder="Add Exercise" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#2A2A2A] text-white border border-[#444]">
                                        <SelectGroup>
                                            <SelectLabel className="text-[#CCCCCC] px-2 py-1">{muscle} Exercises</SelectLabel>
                                            {exercises.filter(e => e.category === muscle).map((e, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={e}
                                                    className="bg-[#2A2A2A]
                                                            text-white
                                                            hover:bg-[#3A3A3A]
                                                            hover:text-white
                                                            focus:bg-[#3A3A3A]
                                                            focus:text-white
                                                            aria-selected:bg-[#444]"
                                                >
                                                    {e.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
        }

    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-hidden">

            {/* Modal Container */}
            <div className="bg-[#1A1A1A] text-white rounded-2xl shadow-lg flex flex-col w-[40%] h-[80%] p-6 relative border border-[#333] overflow-y-auto z-10">

                {/* Background Design */}
                <DiagonalIconGrid/>

                {/* Content */}
                <h2 className="h-[20%] text-2xl font-bold text-center relative z-10">New Workout Program</h2>

                <div className="h-[80%] flex flex-col items-center relative z-10 text-center">

                    <label className="h-[20%]">{steps[step]?.label} ({step + 1}/{steps.length})</label>
                    {steps[step]?.content}

                    <div className="mt-[10%]">
                        <Button id="backBtn" onClick={handleClickEvent}
                                className="mr-[5px] bg-[#E6AC00] hover:bg-[#cc9900] text-black">Back</Button>
                        <Button
                            id={step < steps.length - 1 ? "nextBtn" : "postWorkoutPlanBtn"}
                            onClick={handleClickEvent}
                            className="mr-[5px] ml-[5px] bg-[#E6AC00] hover:bg-[#cc9900] text-black">
                            {step < steps.length - 1 ? "Next" : "Finish"}
                        </Button>
                        <Button id="cancelBtn" onClick={handleClickEvent}
                                className="ml-[5px] bg-[#b52230] hover:bg-[#cc9900] text-black">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddWorkoutPlan;
