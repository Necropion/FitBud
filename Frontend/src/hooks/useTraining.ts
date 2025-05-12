import {useContext, useState} from "react";
import AppContext from "@/context/AppContext.tsx";
import ExerciseDTO from "@/types/api/ExerciseDTO.tsx";

export const useTraining = () => {

    const { gateway, user } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State variables
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [remainingTime, setRemainingTime] = useState(0);
    const [activeExercise, setActiveExercise] = useState<ExerciseDTO | null>(null);
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

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

    const postQuickWorkout = async (exercise: ExerciseDTO) => {
        setLoading(true);
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
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error has occurred when posting quick workout.")
            }
        } finally {
            setLoading(false)
        }
    }

    const startExercise = async (exercise: ExerciseDTO) => {
        await postQuickWorkout(exercise)

        setActiveExercise(exercise);
        setProgress(0);
        setIsRunning(true);
        setRemainingTime(exercise.duration * 60); // duration in seconds

        const durationMs = exercise.duration * 60 * 1000;
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percent = Math.min((elapsed / durationMs) * 100, 100);
            setProgress(percent);
            setRemainingTime(Math.ceil((durationMs - elapsed) / 1000));

            if (percent >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsRunning(false);
                    setActiveExercise(null);
                    setRemainingTime(0);
                }, 1000);
            }
        }, 100);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return {
        getExercises,
        startExercise,
        formatTime,
        postQuickWorkout,
        exercises,
        remainingTime,
        activeExercise,
        progress,
        isRunning,
        loading,
        error,
    }
}