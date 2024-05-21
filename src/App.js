import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./user/pages/Signup";
import Login from "./user/pages/Login";
import Home from "./user/pages/Home";
import Logout from "./user/components/Logout.js";
import OuterHome from "./user/pages/OuterHome";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<OuterHome />} /> {/* Signup route*/}
      <Route path="/signup" element={<Signup />} /> {/* Signup route*/}
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} /> {/* Protected route */}
      <Route path="/logout" element={<Logout />} /> {/* Logout route */}
    </Routes>
  </Router>
);

export default App;
