import {createContext} from "react";
import AppContextType from "@/types/AppContextType.tsx";

const AppContext = createContext<AppContextType>({
    gateway: {
        authentication: "",
        exercise: ""
    },
    user: {},
    setUser: () => {},
});

export default AppContext;