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
import {useTrainingGoal} from "@/hooks/Training/useTrainingGoal.ts"; // Example Lucide icons

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

    const { userGoals } = useContext(AppContext);
    const { getUserGoals } = useTrainingGoal();

    const [addingMuscleGroup, setAddingMusclegroup] = useState(false);

    useEffect(() => {
        getUserGoals()
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
                <div className=" h-[100%] w-[100%] grid grid-cols-4 grid-rows-3">
                    {muscleGroups?.map((g) => (
                        <Toggle key={g.id} variant="outline" className="h-[80%] w-[80%] bg-[#2A2A2A]">
                            {g.name}
                        </Toggle>
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
