import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./View/Home.tsx";
import Login from "./View/Login.tsx";
import SignUp from "./View/SignUp.tsx";

const App = () =>  {

  return (
      <div>
          <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/sign-up" element={<SignUp />}/>
              <Route path="/home" element={<Home />}/>
          </Routes>
      </div>
  )
}

export default App
