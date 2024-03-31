import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../userAuth/Login";
import Signup from "../userAuth/Signup";
import Home from "../pages/Home";
function Allroutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Allroutes;
