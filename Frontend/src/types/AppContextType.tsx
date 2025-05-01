import * as React from "react";
import UserDTO from "@/types/api/Authentication/UserDTO.tsx"
import { Gateway } from "./Gateway";

type AppContextType = {
    gateway: Gateway;

    // User Variables
    user: UserDTO,
    setUser: React.Dispatch<React.SetStateAction<UserDTO>>,
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default AppContextType