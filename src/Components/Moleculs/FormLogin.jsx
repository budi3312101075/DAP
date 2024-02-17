import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Atoms/Button";
import { useAuth } from "../../Store/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { TbPassword } from "react-icons/tb";
import { toast } from "react-toastify";

const FormLogin = () => {
  const { register, handleSubmit, formState } = useForm();
  const { loginResponse, setLoginResponse } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/Login", data);
      if (response.data !== undefined && response.status === 200) {
        const userData = await response.data;
        setLoginResponse(userData);
        navigate("/");
        // console.log(userData?.data?.role);
        toast.success("Selamat Datang");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  // console.log(loginResponse);
  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-10 mt-5 text-black gap-4"
      >
        {formState.errors.username && (
          <span className="text-red-600">
            Hanya huruf dan angka yang diperbolehkan untuk Username
          </span>
        )}
        <div className="form-control">
          <h1 className="text-md">Username</h1>
          <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
            <FaUser />
            <input
              type="text"
              className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
              {...register("username", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z0-9]+$/i,
              })}
              placeholder="Masukan username anda"
            />
          </div>
        </div>

        {formState.errors.password && (
          <span className="text-red-600">Password harus diisi.</span>
        )}
        <div className="form-control">
          <h1 className="text-md">Password</h1>
          <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
            <TbPassword size={25} />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Masukan password anda"
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
        </div>
        <Button
          type="submit"
          style="w-40 mx-auto bg-secondary text-white mt-2 py-1"
          isi={formState.isSubmitting ? "Logging in..." : "Login"}
          disabled={formState.isSubmitting}
        />
      </form>
    </div>
  );
};

export default FormLogin;
