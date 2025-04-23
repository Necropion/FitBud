import * as React from "react";
import {UserDTO} from "@/types/api/UserDTO.tsx"

type AppContextType = {
    gateway: {
        authentication: string;
        exercise: string;
    };

    // User Variables
    user: UserDTO,
    setUser: React.Dispatch<React.SetStateAction<object>>,
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default AppContextType