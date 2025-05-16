import * as React from "react";
import UserDTO from "@/types/api/Authentication/UserDTO.tsx"
import { Gateway } from "./Gateway";
import WorkoutDTO from "@/types/api/Training/WorkoutDTO.tsx";
import ExerciseDTO from "@/types/api/Training/ExerciseDTO.tsx";
import WorkoutPlanDTO from "@/types/api/Training/WorkoutPlanDTO.tsx";

type AppContextType = {
    gateway: Gateway;

    // User Variables
    user: UserDTO,
    setUser: React.Dispatch<React.SetStateAction<UserDTO>>,
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    currentWorkout: WorkoutDTO,
    setCurrentWorkout: React.Dispatch<React.SetStateAction<WorkoutDTO>>
    userWorkouts: WorkoutDTO[],
    setUserWorkouts: React.Dispatch<React.SetStateAction<WorkoutDTO[]>>
    exercises: ExerciseDTO[],
    setExercises: React.Dispatch<React.SetStateAction<ExerciseDTO[]>>
    userWorkoutPlans: WorkoutPlanDTO[],
    setUserWorkoutPlans: React.Dispatch<React.SetStateAction<WorkoutPlanDTO[]>>
}

export default AppContextType