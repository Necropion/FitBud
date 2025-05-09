import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./View/Home.tsx";
import Login from "./View/Login.tsx";
import SignUp from "./View/SignUp.tsx";
import {useState} from "react";
import Landing from "./View/Landing.tsx";
import AppContext from "./context/AppContext.tsx"
import Exercises from "./View/Exercises.tsx";
import UserDTO from "@/types/api/Authentication/UserDTO.tsx";
import Callback from "@/View/Callback.tsx";
import Profile from "@/View/Profile.tsx";
import Progress from "@/View/Progress.tsx";
import AppShell from "@/AppShell.tsx";
import DashboardLayout from "@/components/Home/Dashboard/DashboardLayout.tsx";

const App = () =>  {

    const gateway = {
        authentication: import.meta.env.VITE_AUTHENTICATION_URL,
        training: import.meta.env.VITE_TRAINING_URL,
    }

    const [authenticated, setAuthenticated] = useState<boolean>(() => {
        const storedAuthenticated = localStorage.getItem("authenticated");
        return storedAuthenticated ? JSON.parse(storedAuthenticated) : false;
    });

    const [user, setUser] = useState<UserDTO>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {};
    });

  return (
      <AppContext.Provider value={{
          gateway,
          user, setUser,
          authenticated, setAuthenticated,

      }}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Landing />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/callback" element={<Callback />}/>
                  <Route path="/sign-up" element={<SignUp />}/>
                  <Route element={<AppShell />}>
                      <Route path="/home" element={<DashboardLayout><Home /></DashboardLayout>}/>
                      <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>}/>
                      <Route path="/exercises" element={<DashboardLayout><Exercises /></DashboardLayout>}/>
                      <Route path="/progress" element={<DashboardLayout><Progress /></DashboardLayout>}/>
                  </Route>
              </Routes>
          </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
