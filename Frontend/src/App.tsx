import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./View/Home.tsx";
import Login from "./View/Login.tsx";
import SignUp from "./View/SignUp.tsx";
import {createContext} from "react";
import AppContextType from "./types/AppContextType.tsx";
import Landing from "./View/Landing.tsx";

export const AppContext = createContext<AppContextType>({
    gateway: ""
});

const App = () =>  {

    const gateway : string = import.meta.env.VITE_API_URL

  return (
      <AppContext.Provider value={{
          gateway
      }}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Landing />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/sign-up" element={<SignUp />}/>
                  <Route path="/home" element={<Home />}/>
              </Routes>
          </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
