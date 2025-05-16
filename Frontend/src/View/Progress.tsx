import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useContext, useEffect, useState} from "react";
import {useTrainingWorkout} from "@/hooks/Training/useTrainingWorkout.ts";
import {format} from "date-fns";
import AppContext from "@/context/AppContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {useTraining} from "@/hooks/useTraining.ts";
import AddWorkoutPlan from "@/components/Workout/AddWorkoutPlan.tsx";
import WorkoutPlanFormDTO from "@/types/api/Training/WorkoutPlanFormDTO.tsx";

const Progress = () => {

    const { userWorkoutPlans } = useContext(AppContext);
    const { fetchUserWorkoutPlans, postWorkoutPlan, loading } = useTrainingWorkout();
    const { addingWorkout, setAddingWorkout } = useTraining();

    // State Variables
    const [workoutPlanFormData, setWorkoutPlanFormData] = useState<WorkoutPlanFormDTO>({
        user_id: 0,
        name: "",
        description: "",
        goal_id: 0,
        notes: ""
    });

    const handleClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (e.currentTarget.id === "addPlanBtn") {
            setAddingWorkout(true);
        }

        if (e.currentTarget.id === "postWorkoutPlanBtn") {
            await postWorkoutPlan(workoutPlanFormData);
            setAddingWorkout(false);
        }

        if (e.currentTarget.id === "cancelBtn") {
            setAddingWorkout(false);
        }
    }

    // Re-render if user workouts not present
    useEffect(() => {
        fetchUserWorkoutPlans();
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 flex flex-col gap-8 text-white">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Workout plans</h1>
                    <p className="text-[#AFAFAF] text-sm">
                        Explore all available workout plans and find what fits your goals.
                    </p>
                </div>
                <div>
                    <Button id="addPlanBtn" onClick={handleClickEvent} className="mt-4 self-center bg-[#4CAF50] hover:bg-[#FFFFFF] text-black text-4xl">+</Button>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1">
                {loading ? "Loading..." : userWorkoutPlans
                    .slice()
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((plan) => (
                    <Card key={plan.id} className="bg-[#1A1A1A] border border-[#2A2A2A]">
                        <CardHeader>
                            <CardTitle className="text-[#E6AC00] text-lg">{plan.name}</CardTitle>
                            <CardDescription className="text-[#AFAFAF]">
                                {plan.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-white space-y-1">
                            <p>
                                <span className="text-[#AFAFAF]">Created: </span> {plan.created_at ? format(new Date(plan.created_at), "HH:mm,  PPP") : "N/A"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {addingWorkout && (
                <AddWorkoutPlan
                    handleClickEvent={handleClickEvent}
                    workoutPlanFormData={workoutPlanFormData}
                    setWorkoutPlanFormData={setWorkoutPlanFormData}
                />
            )}
        </div>
    );
}

export default Progress;
