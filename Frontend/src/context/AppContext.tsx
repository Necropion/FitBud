import {createContext} from "react";
import AppContextType from "@/types/AppContextType.tsx";

const AppContext = createContext<AppContextType>({
    gateway: {
        authentication: "",
        training: "",
    },

    // User Variables
    user: {
        id: NaN,
        name: "",
        email: ""
    },
    setUser: () => {},
    authenticated: false,
    setAuthenticated: () => {},
});

export default AppContext;