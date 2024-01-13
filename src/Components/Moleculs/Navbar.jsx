import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navMenu = ["Home", "Pengajuan", "Kriteria", "Laporan", "Logout"];
  const navLinks = ["/", "/berita", "/tentang", "/jadwal", "/stock"];
  return (
    <div>
      <div className="drawer fixed z-50">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full px-5 navbar bg-primary">
            <div className="flex-1 px-2 mx-2">
              <img className="w-16" src="./logo.png" alt="" />
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {navMenu.map((item, index) => {
                  return (
                    <NavLink
                      key={index}
                      className="cursor-pointer font-poppins text-lg px-2 text-white"
                      to={navLinks[index]}
                    >
                      {item}
                    </NavLink>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-primary">
            <div className="flex gap-5 justify-center items-center mb-10 mt-5">
              <img className="w-20" src="./logo.png" alt="" />
              <h1 className="text-2xl font-bold text-white">
                DANA AMAL POLIBATAM
              </h1>
            </div>
            {/* Sidebar content here */}

            {navMenu.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-white"
                  to={navLinks[index]}
                >
                  {item}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
