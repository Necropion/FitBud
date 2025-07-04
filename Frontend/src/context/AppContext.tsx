import {createContext} from "react";
import AppContextType from "@/types/AppContextType.tsx";

const AppContext = createContext<AppContextType>({
    gateway: { authentication: '', training: '' },
    user: { id: 0, name: '', email: '' },
    setUser: () => {},
    authenticated: false,
    setAuthenticated: () => {},
    currentWorkout: null,
    setCurrentWorkout: () => {},
    userWorkouts: [],
    setUserWorkouts: () => {},
    exercises: [],
    setExercises: () => {},
    userWorkoutPlans: [],
    setUserWorkoutPlans: () => {},
});



export default AppContext;