import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import { useAuth } from "../../Store/Auth";
import Button from "../Atoms/Button";
import axios from "axios";

const Navbar = () => {
  const navMenu = ["Home", "Pengajuan", "Kriteria", "Laporan", "Status"];
  const navLinks = ["/", "/pengajuan", "/Kriteria", "/Laporan", "/Status"];
  const navigate = useNavigate();
  const { loginResponse, setLoginResponse, setLogOut } = useAuth();

  const handleLogout = async () => {
    const logout = await axios.get("http://localhost:5000/Logout");
    setLoginResponse(logout);
    navigate("/");
    setLogOut();
    // localStorage.clear();
  };

  return (
    <div>
      <div className={`drawer fixed top-0 left-0 z-[1000] `}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full lg:px-10 px-4 navbar bg-primary">
            <div className="flex-1  mx-2">
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
                {loginResponse ? (
                  <div>
                    {navMenu.map((item, index) => (
                      <NavLink
                        key={index}
                        className="cursor-pointer font-poppins text-lg px-2 text-black mx-1"
                        to={navLinks[index]}
                      >
                        {item}
                      </NavLink>
                    ))}
                    <button
                      className="text-lg rounded-xl font-poppins text-white bg-secondary px-6 py-1 ml-5"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-20 items-center">
                    <div className="flex gap-10">
                      <Scroll
                        to="beranda"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="text-lg font-poppins text-black hover:text-secondary"
                      >
                        Beranda
                      </Scroll>
                      <Scroll
                        to="tentang"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="text-lg font-poppins text-black hover:text-secondary"
                      >
                        Tentang Kami
                      </Scroll>
                      <Scroll
                        to="kontak"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="text-lg font-poppins text-black hover:text-secondary"
                      >
                        Kontak
                      </Scroll>
                    </div>
                    <Link
                      to="/login"
                      className="text-lg rounded-full font-poppins text-white bg-secondary px-8 py-2"
                    >
                      Masuk
                    </Link>
                  </div>
                )}
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
              <h1 className="text-2xl font-bold text-black">
                DANA AMAL POLIBATAM
              </h1>
            </div>
            {/* Sidebar content here */}
            {loginResponse ? (
              <>
                {navMenu.map((item, index) => {
                  return (
                    <NavLink
                      key={index}
                      className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-black"
                      to={navLinks[index]}
                    >
                      {item}
                    </NavLink>
                  );
                })}{" "}
                <button
                  className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-black text-start"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col">
                {" "}
                <Link
                  to="/login"
                  className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-black"
                >
                  Masuk
                </Link>
                <Scroll
                  to="beranda"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-black"
                >
                  Beranda
                </Scroll>
                <Scroll
                  to="tentang"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-black"
                >
                  Tentang Kami
                </Scroll>
                <Scroll
                  to="kontak"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-black"
                >
                  Kontak
                </Scroll>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
