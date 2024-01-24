import React from "react";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./views/Home/index"));
const Login = React.lazy(() => import("./views/Login/index"));

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
  );
}

export default App;
