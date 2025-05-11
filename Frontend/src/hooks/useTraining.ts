import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";
import ExerciseDTO from "@/types/api/ExerciseDTO.tsx";

export const useTraining = () => {

    const { gateway } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

    const getExercises = async () => {
        setLoading(true);
        setError(null);

        try {
            const exerciseList = await fetch(`${gateway.training}/api/exercise/`);
            const response = await exerciseList.json();

            if(!exerciseList.ok) {
                throw new Error(response?.message || "Something went wrong when fetching exercise list");
            }

            setExercises(response);
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when authenticating user.")
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        getExercises,
        exercises,
        loading,
        error
    }
}