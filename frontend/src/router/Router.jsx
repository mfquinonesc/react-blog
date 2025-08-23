import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Guard from "../guard/Guard";
import Admin from "../pages/Admin/Admin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Guard element={<Home />} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/posts/:postId" element={<Guard element={<Home />} />}></Route>
        <Route path="/about" element={<Login />}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
