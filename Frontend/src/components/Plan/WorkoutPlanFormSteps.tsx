import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Toggle} from "@/components/ui/toggle.tsx";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {useState} from "react";
import WorkoutPlanFormDTO from "@/types/api/Training/WorkoutPlanFormDTO.tsx";
import GoalDTO from "@/types/api/Training/GoalDTO.tsx";
import ExerciseDTO from "@/types/api/Training/ExerciseDTO.tsx";
import MuscleGroupDTO from "@/types/api/Training/MuscleGroupDTO.tsx";

interface GetWorkoutPlanFormStepsParams {
    workoutPlanFormData: WorkoutPlanFormDTO;
    setWorkoutPlanFormData: React.Dispatch<React.SetStateAction<WorkoutPlanFormDTO>>;
    userGoals: GoalDTO[];
    exercises: ExerciseDTO[];
    muscleGroups: MuscleGroupDTO[];
    selectedMuscleGroups: string[];
    setSelectedMuscleGroups: React.Dispatch<React.SetStateAction<string[]>>;
    muscleExercises: Record<string, ExerciseDTO[]>;
    handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleAddExercise: (muscle: string, exercise: ExerciseDTO) => void;
    selectedExercises: Record<string, string>;
    setSelectedExercises: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const getWorkoutPlanFormSteps = ({
    workoutPlanFormData,
    setWorkoutPlanFormData,
    userGoals,
    exercises,
    muscleGroups,
    selectedMuscleGroups,
    setSelectedMuscleGroups,
    muscleExercises,
    handleToggle,
    handleAddExercise,
    selectedExercises,
    setSelectedExercises
}: GetWorkoutPlanFormStepsParams) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWorkoutPlanFormData((prev) => ({ ...prev, [name]: value}))
    }

    return [
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
                <div className="h-full w-full flex flex-row justify-start gap-6 p-4 overflow-x-auto">
                    {selectedMuscleGroups.map((muscle) => (
                        <Card key={muscle} className="w-[500px] flex-shrink-0 bg-[#1F1F1F] border border-[#333] p-4 text-white">
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
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col w-full">
                                                    <label className="text-xs text-gray-300 mb-1" htmlFor={`sets-${idx}`}>Sets</label>
                                                    <Input
                                                        id={`sets-${idx}`}
                                                        placeholder="e.g. 3"
                                                        type="number"
                                                        className="bg-[#1A1A1A] text-white border border-[#555] placeholder:text-gray-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col w-full">
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
                                <Select
                                    value={selectedExercises[muscle] || ""}
                                    onValueChange={(value) => {
                                        const exercise = exercises.find(e => e.name === value && e.category === muscle);
                                        if (exercise) {
                                            handleAddExercise(muscle, exercise);
                                            setSelectedExercises(prev => ({
                                                ...prev,
                                                [muscle]: "" // reset dropdown
                                            }));
                                        } else {
                                            setSelectedExercises(prev => ({
                                                ...prev,
                                                [muscle]: value
                                            }));
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full bg-[#2A2A2A] text-white border border-[#444]">
                                        <SelectValue placeholder="Add Exercise" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#2A2A2A] text-white border border-[#444] z-[103]">
                                        <SelectGroup>
                                            <SelectLabel className="text-[#CCCCCC] px-2 py-1">{muscle} Exercises</SelectLabel>
                                            {exercises.filter(e => e.category === muscle).map((e, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={e.name}
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
}