import React from "react";

const Hero = () => {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center relative w-full"
        style={{ backgroundImage: "url('./Poltek.jpg')" }}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-10"></div>
        <div className="text-white font-poppins pt-64 px-4 xl:px-14 z-30 relative">
          <h1 className="text-3xl xl:text-4xl ">"Dari Kita, Untuk Kita"</h1>
          <h1 className="text-xl xl:text-2xl w-96 lg:w-1/2 sm:w-96 ">
            Sistem Aplikasi berbasis web sebagai platform pendata dana sosial
            karyawan Polibatam
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
