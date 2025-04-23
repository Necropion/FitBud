import * as React from "react";

type AppContextType = {
    gateway: {
        authentication: string;
        exercise: string;
    };

    // User Variables
    user: object,
    setUser: React.Dispatch<React.SetStateAction<object>>,
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default AppContextType