import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./View/Home.tsx";
import Login from "./View/Login.tsx";
import SignUp from "./View/SignUp.tsx";
import {useState} from "react";
import Landing from "./View/Landing.tsx";
import Workouts from "./View/Workouts.tsx"
import AppContext from "./context/AppContext.tsx"

const App = () =>  {

    const gateway = {
        authentication: import.meta.env.VITE_AUTHENTICATION_URL,
        training: import.meta.env.VITE_TRAINING_URL,
    }

    const [authenticated, setAuthenticated] = useState<boolean>(() => {
        const storedAuthenticated = localStorage.getItem("authenticated");
        return storedAuthenticated ? JSON.parse(storedAuthenticated) : false;
    });

    const [user, setUser] = useState<object>(() => {
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
                  <Route path="/sign-up" element={<SignUp />}/>
                  <Route path="/home" element={<Home />}/>
                  <Route path="/workouts" element={<Workouts />}/>
              </Routes>
          </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
