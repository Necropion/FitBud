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
import WorkoutPlanShowcase from "@/components/Plan/WorkoutPlanShowcase.tsx";

const Plan = () => {

    const { userWorkoutPlans, muscleGroups } = useContext(AppContext);
    const { fetchUserWorkoutPlans, createWorkoutPlanWithExercises, loading } = useTrainingWorkout();
    const { addingWorkout, setAddingWorkout, getMuscleGroups } = useTraining();

    // State Variables
    const [planSelected, setPlanSelected] = useState<boolean>(false);
    const [planId, setPlanId] = useState<number | null>(null)
    const [workoutPlanFormData, setWorkoutPlanFormData] = useState<WorkoutPlanFormDTO>({
        user_id: 0,
        name: "",
        description: "",
        goal_id: 0,
        notes: "",
        exercises: []
    });
    const [step, setStep] = useState<number>(0);

    const handleClickEvent = async (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();

        if (e.currentTarget.id == "planBtn") {
            setPlanSelected(true);
        }

        if (e.currentTarget.id === "addPlanBtn") {
            setStep(0)
            setAddingWorkout(true);
        }

        if (e.currentTarget.id === "addMuscleGroupBtn") {
            console.log("Group added!")
        }

        if (e.currentTarget.id === "nextBtn") {
            setStep((prev) => prev + 1)
        }

        if (e.currentTarget.id === "backBtn") {
            setStep((prev) => {
                if (step !== 0) {
                    return prev - 1;
                }

                return 0;
            });
        }

        if (e.currentTarget.id === "postWorkoutPlanBtn") {
            console.log("Payload Workout Plan", workoutPlanFormData)
            await createWorkoutPlanWithExercises(workoutPlanFormData);
            setAddingWorkout(false);
        }

        if (e.currentTarget.id === "cancelBtn") {
            setStep(0)
            setAddingWorkout(false);
        }
    }

    // Re-render if user workouts not present
    useEffect(() => {
    }, []);

    // Re-render if user workout plans not present
    useEffect(() => {
        if (!userWorkoutPlans || userWorkoutPlans.length === 0) {
            fetchUserWorkoutPlans();
        }
    }, [userWorkoutPlans?.length]);

    useEffect(() => {
        getMuscleGroups();
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

            {planSelected ? <WorkoutPlanShowcase planId={planId}/> : (<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
                {loading ? (
                        <div className="text-white text-center col-span-full">Loading...</div>
                    ) :
                    (
                        userWorkoutPlans
                            .slice()
                            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                            .map((plan) => (
                                    <Card key={plan.id}
                                          id="planBtn"
                                          className="bg-[#1A1A1A] border border-[#2A2A2A] hover:shadow-lg transition-all duration-200"
                                          onClick={handleClickEvent}
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-[#E6AC00] text-xl">{plan.name}</CardTitle>
                                            <CardDescription className="text-[#AFAFAF]">
                                                {plan.description || "No description provided."}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-sm text-white space-y-3">
                                            <div>
                                                <span className="text-[#AFAFAF] font-medium">Created:</span>{" "}
                                                {plan.created_at ? format(new Date(plan.created_at), "HH:mm, PPP") : "N/A"}
                                            </div>
                                            {plan.notes && (
                                                <div className="text-[#CCCCCC]">
                                                    <span className="font-medium text-white">Notes:</span> {plan.notes}
                                                </div>
                                            )}
                                            {/* Optional: Add buttons or actions here */}
                                            {/* <Button variant="outline" className="mt-4">View Plan</Button> */}
                                        </CardContent>
                                    </Card>
                                )
                            )
                    )
                }
            </div>)}


            {addingWorkout && (
                <AddWorkoutPlan
                    handleClickEvent={handleClickEvent}
                    workoutPlanFormData={workoutPlanFormData}
                    setWorkoutPlanFormData={setWorkoutPlanFormData}
                    muscleGroups={muscleGroups}
                    step={step}
                />
            )}
        </div>
    );
}

export default Plan;
