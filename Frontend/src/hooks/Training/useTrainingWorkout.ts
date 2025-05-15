import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";

export const useTrainingWorkout = () => {
    const { gateway, user, currentWorkout, setUserWorkouts } = useContext(AppContext);

    // Variable States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserWorkouts = async () => {
        setLoading(true);
        setError(null);

        try{
            const getWorkouts = await fetch(`${gateway.training}api/workout/user-workouts/?user_id=${user.id}`)
            const response = await getWorkouts.json()

            if (!getWorkouts.ok) {
                throw new Error (response.error || "Something went wrong when fetching workout list")
            }

            setUserWorkouts(response.data);
            localStorage.setItem("userWorkouts", JSON.stringify(response.data))
            console.log("User Workouts fetched successfully!", JSON.stringify(response.data))
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when fetching workouts.")
            }
        } finally {
            setLoading(false)
        }
    }

    const endWorkout = async () => {
        setError(null);

        try{
            const updateWorkout = await fetch(`${gateway.training}api/workout/update/`, {
                method: "PUT",
                body: JSON.stringify({
                    workout: {
                        id: currentWorkout.id,
                        ended_at: "now"
                    }
                }),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const response = await updateWorkout.json();

            if (!updateWorkout.ok) {
                throw new Error(response?.error || "Something went wrong when ending workout")
            }

            await fetchUserWorkouts();
            console.log(`Updated Workout: ${JSON.stringify(response.data)}`)
            return response.data;
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when fetching workouts.")
            }
        }
    }

    return {
        fetchUserWorkouts,
        endWorkout,
        loading,
        error
    }
}