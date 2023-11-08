import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Componets/Home";
import Videopage from "../Componets/Videopage";
function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/diwali" element={<Videopage />}></Route>
    </Routes>
  );
}

export default Allroutes;
