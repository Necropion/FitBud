import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";
import WorkoutDTO from "@/types/api/Training/WorkoutDTO.tsx";

export const useTrainingWorkout = () => {
    const { gateway } = useContext(AppContext);

    // Variable States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [workouts, setWorkouts] = useState<WorkoutDTO[]>([]);

    const fetchWorkouts = async () => {
        setLoading(true);
        setError(null);

        try{
            const getWorkouts = await fetch(`${gateway.training}api/workout/`)
            const response = await getWorkouts.json()

            if (!getWorkouts.ok) {
                throw new Error (response.error || "Something went wrong when fetching workout list")
            }

            setWorkouts(response.data);
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

    return {
        fetchWorkouts,
        workouts,
        loading,
        error
    }
}