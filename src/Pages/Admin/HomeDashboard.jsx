import React from "react";
import { detailUser } from "../../utils/helper";

const HomeDashboard = () => {
  const user = detailUser();
  return (
    <div className="h-screen mt-16 font-poppins bg-[#f1f1ea]">
      <div className="max-h-max sm:h-48 bg-secondary p-5 sm:p-8  rounded-2xl flex flex-col gap-5">
        <h1 className="text-base sm:text-xl xl:text-2xl font-bold text-white">
          Selamat Datang Di Dana Amal Polibatam
        </h1>
        <h1 className="text-sm sm:text-lg xl:text-xl font-thin text-white">
          Mengelola dana amal polibatam melalui sistem yang Terstruktur
        </h1>
      </div>
    </div>
  );
  // <div className="h-screen mt-32">Selamat Datang {user.nama}</div>;
};

export default HomeDashboard;
