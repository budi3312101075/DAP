import React, { useEffect } from "react";
// import { useAuth } from "../Store/Auth";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Admin/Dashboard";
import SuperadminDash from "../Pages/SuperAdmin/Dashboard";
import ManajemenDash from "../Pages/Manajemen/Dashboard";
import { useAuth } from "../Store/Auth";
import { useNavigate } from "react-router-dom";

const Routing = () => {
  const { loginResponse, setLoginResponse } = useAuth();
  const navigate = useNavigate();

  const role = loginResponse?.role;

  // const redirect = () => {
  //   if (role == "Karyawan") {
  //     navigate("/home");
  //   } else if (role == "Admin") {
  //     navigate("/dashboard-admin");
  //   } else if (role == "SuperAdmin") {
  //     navigate("/dashboard-Super");
  //   } else if (role == "Manajemen") {
  //     navigate("/dashboard-Manajemen");
  //   }
  // };

  // useEffect(() => {
  //   if (loginResponse) {
  //     redirect();
  //   } else {
  //     console.log("error");
  //   }
  // }, [loginResponse, setLoginResponse]);

  if (role == "Karyawan") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  if (role == "Admin") {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  // return (
  //   <Routes>
  //     <Route element={<CekLogin />}>
  //       {/* kalau blm login dia bisa akses ini jika sudah login dia tidak bisa akses path dalam ini lagi */}
  //       <Route path="/home" element={<Home />} />
  //       <Route path="/" element={<Login />} />
  //     </Route>
  //     <Route element={<AuthRoute />}>
  //       {/* kalau mau routing yg udh login tapi ga cek role bisa taruh sini */}
  //       <Route element={<Karyawan />}>
  //         <Route path="/" element={<Home />} />
  //       </Route>
  //       <Route element={<Admin />}>
  //         <Route path="/dashboard-admin" element={<Dashboard />} />
  //       </Route>
  //       <Route element={<SuperAdmin />}>
  //         <Route path="/dashboard-Super" element={<SuperadminDash />} />
  //       </Route>
  //       <Route element={<Manajemen />}>
  //         <Route path="/dashboard-Manajemen" element={<ManajemenDash />} />
  //       </Route>
  //     </Route>

  //     <Route path="*" element={<NotFound />} />
  //   </Routes>
  // );
};

export default Routing;
