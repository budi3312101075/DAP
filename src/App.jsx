import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
