import React from "react";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./views/Home/index"));
const Login = React.lazy(() => import("./views/Login/index"));
const Customer = React.lazy(() => import("./views/Customers/index"))

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Customer/>}/>
    </Routes>
  );
}

export default App;
