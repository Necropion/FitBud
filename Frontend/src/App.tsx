import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./View/Home.tsx";
import Login from "./View/Login.tsx";

const App = () =>  {

  return (
      <div>
          <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/home" element={<Home />}/>
          </Routes>
      </div>
  )
}

export default App
