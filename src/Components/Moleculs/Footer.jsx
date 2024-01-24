import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col md:flex-row  justify-between p-10 bg-secondary lg:px-32 text-white font-poppins ">
        <div className="flex flex-col md:flex-row gap-8 mt-8 lg:gap-24 xl:gap-52 lg:mx-auto justify-evenly w-full">
          <img src="./logo-white.png" alt="" className="w-32" />
          <nav className="flex-col flex">
            <header className="text-lg mb-2 text-white">NAVIGASI</header>
            <a className="link link-hover">Beranda</a>
            <a className="link link-hover">Tentang Kami</a>
            <a className="link link-hover">Kontak</a>
          </nav>
          <nav className="flex-col flex">
            <header className="text-lg mb-2 text-white uppercase">
              Hubungi Kami
            </header>
            <a className="link link-hover">Whatshapp</a>
            <a className="link link-hover">Instagram</a>
            <a className="link link-hover">LinkedIn</a>
          </nav>
          <nav className="flex-col flex">
            <header className="text-lg mb-2 text-white uppercase">
              Alamat
            </header>
            <p className="w-56">
              Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam,
              Kepulauan Riau 29461
            </p>
          </nav>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t-2 bg-secondary text-white border-white">
        <p className="place-self-center">© 2024 POLITEKNIK NEGERI BATAM</p>
      </footer>
    </>
  );
};

export default Footer;
