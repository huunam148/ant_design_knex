import React from "react";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./views/Home/index"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/" element={<Home />}/>
    </Routes>
  );
}

export default App;
