import React from "react";
import { detailUser } from "../../utils/helper";

const HomeAdmin = () => {
  const user = detailUser();
  return <div className="h-screen mt-32">Selamat Datang {user.nama}</div>;
};

export default HomeAdmin;
