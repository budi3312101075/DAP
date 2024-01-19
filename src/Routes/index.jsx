import React, { useEffect } from "react";
// import { useAuth } from "../Store/Auth";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import LandingPage from "../Pages/LandingPage";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Admin/Dashboard";
import SuperadminDash from "../Pages/SuperAdmin/Dashboard";
import ManajemenDash from "../Pages/Manajemen/Dashboard";
import { useAuth } from "../Store/Auth";
import { useNavigate } from "react-router-dom";
import Home from "../Pages/Karyawan/Home";
import Pengajuan from "../Pages/Karyawan/Pengajuan";
import HomeAdmin from "../Pages/Admin/HomeAdmin";
import Kriteria from "../Pages/Karyawan/Kriteria";
import Status from "../Pages/Karyawan/Status";
import { jwtDecode } from "jwt-decode";

const Routing = () => {
  const { loginResponse } = useAuth();
  const navigate = useNavigate();

  let role;
  let decoded;

  if (loginResponse) {
    const token = loginResponse;
    decoded = jwtDecode(token);
    // console.log(decoded);
  }

  role = decoded?.role;
  // console.log(role);

  // const role = loginResponse?.role;

  if (role == "Karyawan") {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Home />} />
          <Route path="/pengajuan" element={<Pengajuan />} />
          <Route path="/Kriteria" element={<Kriteria />} />
          <Route path="/Status" element={<Status />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  if (role == "Admin") {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<HomeAdmin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  if (role == "SuperAdmin") {
    return (
      <Routes>
        <Route path="/" element={<SuperadminDash />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  if (role == "Manajemen") {
    return (
      <Routes>
        <Route path="/" element={<ManajemenDash />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;