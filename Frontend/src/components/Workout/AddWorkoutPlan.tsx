import React, {useContext, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { Button } from "@/components/ui/button";
import WorkoutPlanFormDTO from "@/types/api/Training/WorkoutPlanFormDTO.tsx";
import DiagonalIconGrid from "@/components/Background/DiagonalIconGrid.tsx";
import MuscleGroupDTO from "@/types/api/Training/MuscleGroupDTO.tsx";
import AppContext from "@/context/AppContext.tsx";
import {useTrainingGoal} from "@/hooks/Training/useTrainingGoal.ts";
import {useTraining} from "@/hooks/useTraining.ts";
import ExerciseDTO from "@/types/api/Training/ExerciseDTO.tsx";
import {getWorkoutPlanFormSteps} from "@/components/Plan/WorkoutPlanFormSteps.tsx";
import WorkoutExerciseCreateDTO from "@/types/api/Training/WorkoutExerciseCreateDTO.tsx"; // Example Lucide icons

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

    const { userGoals, exercises } = useContext(AppContext);
    const { getUserGoals } = useTrainingGoal();
    const { getExercises } = useTraining();

    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<Record<string, string>>({});
    const [muscleExercises, setMuscleExercises] = useState<Record<string, ExerciseDTO[]>>({});
    const [workoutExercises, setWorkoutExercises] = useState<WorkoutExerciseCreateDTO[]>([]);

    const handleAddExercise = (muscle: string, exercise: ExerciseDTO) => {

        const workoutExercise: WorkoutExerciseCreateDTO = {
            exercise_id: exercise.id,
            order: 0,
            sets: 0,
            reps: 0,
            duration: 0
        }

        setMuscleExercises((prev) => ({
            ...prev,
            [muscle]: [...(prev[muscle] || []), exercise],
        }));

        setWorkoutExercises((prev) => [ ...prev, workoutExercise]);
    };

    const handleRemoveExercise = (muscle: string, index: number) => {
        const exerciseToRemove = muscleExercises[muscle]?.[index];

        if (!exerciseToRemove) {
            return;
        }

        setWorkoutExercises(prev => prev.filter(ex => ex.exercise_id !== exerciseToRemove.id))

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
                setSelectedMuscleGroups(prev => prev.filter(item => item !== newMuscle));
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

    useEffect(() => {
        console.log("workoutExercises: ", workoutExercises)
        setWorkoutPlanFormData((prev) => ({ ...prev, exercises: workoutExercises}))

    }, [setWorkoutPlanFormData, workoutExercises]);

    const steps = getWorkoutPlanFormSteps({
        workoutPlanFormData,
        setWorkoutPlanFormData,
        userGoals,
        exercises,
        muscleGroups,
        selectedMuscleGroups,
        muscleExercises,
        handleToggle,
        handleAddExercise,
        handleRemoveExercise,
        selectedExercises,
        setSelectedExercises,
    })

    const modalContent = (
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60 overflow-hidden">

            {/* Modal Container */}
            <div
                className={`bg-[#1A1A1A] text-white rounded-2xl shadow-lg flex flex-col ${
                    step === steps.length - 1 ? "w-[90%] h-[90%]" : "w-[40%]"
                } h-[80%] p-6 relative border border-[#333] overflow-y-auto z-10 transition-all duration-300 ease-in-out`}
            >


                {/* Background Design */}
                <DiagonalIconGrid/>

                {/* Content */}
                <h2 className="h-[10%] text-2xl font-bold text-center relative z-[101]">New Workout Program</h2>

                <div className="h-[90%] flex flex-col items-center relative z-[101] text-center">

                    <label className="h-[5%]">{steps[step]?.label} ({step + 1}/{steps.length})</label>
                    {steps[step]?.content}

                    <div className="mt-[0%]">
                        <Button id="backBtn" onClick={handleClickEvent}
                                className="mr-[5px] bg-custom-primaryaccent hover:bg-[#cc9900] text-black">Back</Button>
                        <Button
                            id={step < steps.length - 1 ? "nextBtn" : "postWorkoutPlanBtn"}
                            onClick={handleClickEvent}
                            className="mr-[5px] ml-[5px] bg-custom-primaryaccent hover:bg-[#cc9900] text-black">
                            {step < steps.length - 1 ? "Next" : "Finish"}
                        </Button>
                        <Button id="cancelBtn" onClick={handleClickEvent}
                                className="ml-[5px] bg-custom-alert hover:bg-[#cc9900] text-black">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default AddWorkoutPlan;
