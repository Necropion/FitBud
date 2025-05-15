import * as React from "react";
import UserDTO from "@/types/api/Authentication/UserDTO.tsx"
import { Gateway } from "./Gateway";
import WorkoutDTO from "@/types/api/Training/WorkoutDTO.tsx";

type AppContextType = {
    gateway: Gateway;

    // User Variables
    user: UserDTO,
    setUser: React.Dispatch<React.SetStateAction<UserDTO>>,
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    currentWorkout: WorkoutDTO,
    setCurrentWorkout: React.Dispatch<React.SetStateAction<WorkoutDTO>>
}

export default AppContextType