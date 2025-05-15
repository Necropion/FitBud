import {useContext, useRef, useState} from "react";
import AppContext from "@/context/AppContext.tsx";
import ExerciseDTO from "@/types/api/Training/ExerciseDTO.tsx";

export const useTraining = () => {

    const { gateway, user } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatTime = (seconds: number): string => {
        const totalSeconds = Math.floor(seconds); // ← round down to whole seconds
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };


    // State Refs
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // State variables
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [addingExercise, setAddingExercise] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [activeExercise, setActiveExercise] = useState<ExerciseDTO | null>(null);
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const formattedRemainingTime = formatTime(remainingTime);

    const getExercises = async () => {
        setLoading(true);
        setError(null);

        try {
            const exerciseList = await fetch(`${gateway.training}api/exercise/`);
            const response = await exerciseList.json();

            if(!exerciseList.ok) {
                throw new Error(response?.message || "Something went wrong when fetching exercise list");
            }

            setExercises(response.data);
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

    const addExercise = async (exercise: object) => {
        setError(null);

        try {
            const postExercise = await fetch(`${gateway.training}api/exercise/`, {
                method: "POST",
                body: JSON.stringify(exercise),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const response = await postExercise.json();

            if (!postExercise.ok) {
                throw new Error(response?.error || "Something went wrong posting exercise!")
            }

            await getExercises();
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when posting quick workout.")
            }
        } finally {
            setAddingExercise(false);
        }
    }

    const deleteExercise = async (exerciseId: string | undefined)=>  {
        setError(null);

        try {
            const deleteOperation = await fetch(`${gateway.training}api/exercise/${exerciseId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const response = await deleteOperation.json();

            if (!deleteOperation.ok) {
                throw new Error(response?.error || "Something went wrong deleting exercise!")
            }

            await getExercises();
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when posting quick workout.")
            }
        }
    }

    const postQuickWorkout = async (exercise: ExerciseDTO) => {
        setError(null);

        try {
            const quickWorkout = await fetch(`${gateway.training}api/workout/post-with-exercise/`, {
                method: 'POST',
                body: JSON.stringify({
                    exercise,
                    user_id: user.id
                }),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const response = await quickWorkout.json();

            if (!quickWorkout.ok) {
                throw new Error(response?.error || "Something went wrong when posting quick workout")
            }

            return response.data;
        } catch(error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when posting quick workout.")
            }
        }
    }

    const startExercise = async (exercise: ExerciseDTO) => {
        await postQuickWorkout(exercise);

        setActiveExercise(exercise);
        setProgress(0);
        setIsRunning(true);

        const totalSeconds = exercise.duration * 60;
        setRemainingTime(totalSeconds);

        const totalDuration = totalSeconds * 1000;
        const interval = 100;
        const increment = 100 / (totalDuration / interval);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timerRef.current!);
                    setIsRunning(false);
                    setRemainingTime(0);
                    return 100;
                }
                return next;
            });

            setRemainingTime(prev => {
                if (prev <= 1) return 0;
                return prev - interval / 1000;
            });
        }, interval);
    };

    const stopExercise = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsRunning(false);
        setProgress(0);
        setRemainingTime(0);
        setActiveExercise(null);
    };

    return {
        getExercises,
        addExercise,
        deleteExercise,
        startExercise,
        stopExercise,
        formattedRemainingTime,
        postQuickWorkout,
        addingExercise,
        setAddingExercise,
        exercises,
        remainingTime,
        activeExercise,
        setActiveExercise,
        progress,
        isRunning,
        setIsRunning,
        loading,
        error,
    }
}