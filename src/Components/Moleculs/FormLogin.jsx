import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Atoms/Button";

const FormLogin = () => {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data) => {
    // Lakukan sesuatu dengan data yang dikirimkan melalui formulir
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-3"
      >
        {formState.errors.Username && (
          <span className="text-red-600">
            Hanya huruf dan angka yang diperbolehkan untuk Username
          </span>
        )}
        <input
          className="rounded-md px-2 py-[1px]"
          type="text"
          {...register("Username", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z0-9]+$/i,
          })}
          placeholder="Username"
        />
        <input
          className="rounded-md px-2 py-[1px]"
          type="password"
          {...register("password", { required: true })}
          placeholder="******"
        />
        <Button type="submit" style="w-40 mx-auto" isi="Login" />
      </form>
    </div>
  );
};

export default FormLogin;
