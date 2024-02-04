import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import { useAuth } from "../../Store/Auth";
import Button from "../Atoms/Button";
import axios from "axios";
import { detailUser } from "../../utils/helper";
import Modals from "./Modals";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";

const Navbar = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: registers,
    handleSubmit: handleSubmits,
    reset: resets,
    formState,
  } = useForm();

  const navMenu = ["Home", "Pengajuan", "Kriteria", "Laporan", "Status"];
  const navLinks = ["/", "/pengajuan", "/Kriteria", "/Laporan", "/Status"];
  const navigate = useNavigate();
  const { loginResponse, setLoginResponse, setLogOut } = useAuth();
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getMe = async () => {
    const response = await axios.get("http://localhost:5000/getMe");
    setUser(response.data.data[0]);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/Users/${user.id}`,
        data
      );
      getMe();
      toast.success(response.data.msg);
      document.getElementById("my_modal_1").close();
    } catch (error) {
      toast.error(error.response.data.failed);
      document.getElementById("my_modal_1").close();
    }
  };

  const resetPassword = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/resetPassword/${user.id}`,
        data
      );
      getMe();
      resets();
      toast.success(response.data.msg);
      document.getElementById("my_modal_2").close();
    } catch (error) {
      toast.error(error.response.data.msg);
      resets();
      document.getElementById("my_modal_2").close();
    }
  };

  const handleLogout = async () => {
    const logout = await axios.get("http://localhost:5000/Logout");
    setLoginResponse(logout);
    navigate("/");
    setLogOut();
    // localStorage.clear();
  };

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    setValue("username", user?.username);
    setValue("email", user?.email);
    setValue("no_telepon", user?.no_telepon);
  }, [user, onSubmit]);

  return (
    <>
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
                  <div className="flex items-center">
                    {navMenu.map((item, index) => (
                      <NavLink
                        key={index}
                        className="cursor-pointer font-poppins text-lg px-2 text-black mx-1"
                        to={navLinks[index]}
                      >
                        {item}
                      </NavLink>
                    ))}
                    <div className="dropdown dropdown-bottom dropdown-end items-center">
                      <div tabIndex={0} role="button">
                        <div className="avatar">
                          <div className="w-8 ml-2 rounded-full">
                            <img src="./Avatar.png" />
                          </div>
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu shadow bg-primary rounded-box w-52 text-black"
                      >
                        <li>
                          <button
                            onClick={() => {
                              document.getElementById("my_modal_1").showModal();
                            }}
                          >
                            Ubah Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              document.getElementById("my_modal_2").showModal();
                            }}
                          >
                            Ganti Password
                          </button>
                        </li>
                        <li>
                          <button onClick={handleLogout}>Logout</button>
                        </li>
                      </ul>
                    </div>

                    {/* <button
                      className="text-lg rounded-xl font-poppins text-white bg-secondary px-6 py-1 ml-5"
                      onClick={handleLogout}
                    >
                      Logout
                    </button> */}
                  </div>
                ) : (
                  <div className="flex gap-14 items-center">
                    <div className="flex gap-8">
                      <Scroll
                        to="beranda"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="text-lg font-poppins text-black hover:text-secondary cursor-pointer"
                      >
                        Beranda
                      </Scroll>
                      <Scroll
                        to="tentang"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="text-lg font-poppins text-black hover:text-secondary cursor-pointer"
                      >
                        Tentang Kami
                      </Scroll>
                      <Scroll
                        to="kontak"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="text-lg font-poppins text-black hover:text-secondary cursor-pointer"
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
                })}
                <div className="dropdown dropdown-bottom dropdown-end items-center mt-5">
                  <div tabIndex={0} role="button">
                    <div className="avatar">
                      <div className="w-8 ml-2 rounded-full">
                        <img src="./Avatar.png" />
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu shadow bg-primary rounded-box w-52 text-black mr-12 "
                  >
                    <li>
                      <button
                        onClick={() => {
                          document.getElementById("my_modal_1").showModal();
                        }}
                      >
                        Ubah Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          document.getElementById("my_modal_2").showModal();
                        }}
                      >
                        Ganti Password
                      </button>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
                {/* <button
                  className="cursor-pointer font-poppins font-thin text-lg hover:font-bold border-y py-3 text-black text-start"
                  onClick={handleLogout}
                >
                  Logout
                </button> */}
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

      {/* modal ubah profile */}
      <Modals title={"Ubah Profile"} reset={reset}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full justify-center items-center rounded-xl"
        >
          {errors.username && (
            <span className="text-red-600 ">
              Hanya huruf dan angka yang diperbolehkan untuk Username dan tidak
              boleh spasi
            </span>
          )}
          <div className="w-full">
            <p className="pl-2 mb-1">Username</p>
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type="text"
                className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                {...register("username", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z0-9]+$/i,
                })}
                placeholder="Masukan username"
              />
            </div>
          </div>

          {errors.email && (
            <span className="text-red-600 ">Harus berupa email yang valid</span>
          )}
          <div className="w-full">
            <p className="pl-2 mb-1">Email</p>
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type="email"
                className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                })}
                placeholder="Masukan email"
              />
            </div>
          </div>

          {errors.no_telepon && (
            <span className="text-red-600 ">Hanya menerima angka</span>
          )}
          <div className="w-full">
            <p className="pl-2 mb-1">Nomor Telepon</p>
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type="text"
                className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                {...register("no_telepon", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[0-9]+$/i,
                })}
                placeholder="Masukan Nomor Telepon"
              />
            </div>
          </div>
          <Button
            type="submit"
            style="w-1/2 mx-auto bg-secondary mt-2 text-primary py-1 -mb-5"
            isi="Kirim"
          />
        </form>
      </Modals>

      {/* modal reset password */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">Update Profile</h3>
          <form
            onSubmit={handleSubmits(resetPassword)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {formState.errors.currentPassword && (
              <span className="text-red-600">Password harus diisi.</span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registers("currentPassword", { required: true })}
                placeholder="Masukan password"
                className="w-full bg-[#f2f4f6] -ml-2 placeholder:text-tertiary"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  size={25}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeSharp size={25} onClick={togglePasswordVisibility} />
              )}
            </div>
            {formState.errors.newPassword && (
              <span className="text-red-600">Password harus diisi.</span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registers("newPassword", { required: true })}
                placeholder="Masukan password"
                className="w-full bg-[#f2f4f6] -ml-2 placeholder:text-tertiary"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  size={25}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeSharp size={25} onClick={togglePasswordVisibility} />
              )}
            </div>
            {formState.errors.confirmPassword && (
              <span className="text-red-600">Password harus diisi.</span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registers("confirmPassword", { required: true })}
                placeholder="Masukan password"
                className="w-full bg-[#f2f4f6] -ml-2 placeholder:text-tertiary"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  size={25}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeSharp size={25} onClick={togglePasswordVisibility} />
              )}
            </div>
            <Button
              type="submit"
              style="w-1/2 mx-auto bg-secondary mt-2 text-primary py-1 -mb-5"
              isi="Kirim"
            />
          </form>
          <button
            className="px-4 py-2 bg-black rounded-lg text-white w-full "
            onClick={() => {
              document.getElementById("my_modal_2").close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
