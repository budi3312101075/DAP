import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Atoms/Button";
import { useAuth } from "../../Store/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const { register, handleSubmit, formState } = useForm();
  const { loginResponse, setLoginResponse } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/Login", data);
      if (response.data !== undefined && response.status === 200) {
        const userData = await response.data;
        setLoginResponse(userData);
        navigate("/");
        // console.log(userData?.data?.role);
      }
    } catch (error) {
      console.log(error.massage);
    }
  };

  // console.log(loginResponse);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-3"
      >
        {formState.errors.username && (
          <span className="text-red-600">
            Hanya huruf dan angka yang diperbolehkan untuk Username
          </span>
        )}
        <input
          className="rounded-md px-2 py-[1px]"
          type="text"
          {...register("username", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z0-9]+$/i,
          })}
          placeholder="Username"
        />

        {formState.errors.password && (
          <span className="text-red-600">Password harus diisi.</span>
        )}
        <input
          className="rounded-md px-2 py-[1px]"
          type="password"
          {...register("password", { required: true })}
          placeholder="******"
        />

        <Button
          type="submit"
          style="w-40 mx-auto"
          isi={formState.isSubmitting ? "Logging in..." : "Login"}
          disabled={formState.isSubmitting}
        />
      </form>
    </div>
  );
};

export default FormLogin;
