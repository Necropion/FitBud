import {createContext} from "react";
import AppContextType from "@/types/AppContextType.tsx";

const AppContext = createContext<AppContextType>({
    gateway: {
        authentication: "",
        exercise: "",
    },

    // User Variables
    user: {
        Id: NaN,
        Name: "",
        Email: ""
    },
    setUser: () => {},
    authenticated: false,
    setAuthenticated: () => {},
});

export default AppContext;