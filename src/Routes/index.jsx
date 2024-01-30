import React, { useEffect } from "react";
// import { useAuth } from "../Store/Auth";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import LandingPage from "../Pages/LandingPage";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Admin/Dashboard";
import { useAuth } from "../Store/Auth";
import { useNavigate } from "react-router-dom";
import Home from "../Pages/Karyawan/Home";
import Pengajuan from "../Pages/Karyawan/Pengajuan";
import HomeDashboard from "../Pages/Admin/HomeDashboard";
import Kriteria from "../Pages/Karyawan/Kriteria";
import Status from "../Pages/Karyawan/Status";
import { jwtDecode } from "jwt-decode";
import DaftarPengajuan from "../Pages/Admin/DaftarPengajuan";

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
          <Route index element={<HomeDashboard />} />
          <Route path="Daftar-pengajuan" element={<DaftarPengajuan />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  if (role == "SuperAdmin") {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<HomeDashboard />} />
          <Route path="Daftar-pengajuan" element={<DaftarPengajuan />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  if (role == "Manajemen") {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<HomeDashboard />} />
        </Route>
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
