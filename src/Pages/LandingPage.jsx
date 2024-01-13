import React from "react";
import Navbar from "../Components/Moleculs/Navbar";
import Footer from "../Components/Moleculs/Footer";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LandingPage;
