import React, { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import FormLogin from "../Components/Moleculs/FormLogin";

const Login = () => {
  return (
    <div className=" flex flex-row items-center justify-center w-full min-h-screen bg-primary font-poppins">
      <div className="flex flex-col w-full gap-6 px-4 md:w-1/2 ">
        <div className="w-full max-w-lg mx-auto rounded-xl 2xl:max-w-xl flex flex-col items-center justify-center h-96 shadow-2xl">
          <div className="flex flex-col items-center justify-center w-full gap-1 text-lg font-bold lg:text-xl text-black">
            <h1 className="text-2xl">Selamat Datang Di</h1>
            <TypeAnimation
              sequence={[
                "",
                600,
                "Dana",
                600,
                "Dana Amal",
                600,
                "Dana Amal Polibatam",
                600,
              ]}
              cursor={true}
              repeat={Infinity}
              className="text-lg font-bold lg:text-md text-black"
            />
          </div>
          <div className="w-full">
            <FormLogin />
          </div>
        </div>
      </div>
      <div className="flex-col items-center justify-center hidden w-full min-h-screen gap-6 md:flex md:w-1/2 bg-secondary">
        <img src="./login.gif" alt="login" className="w-80" />
        <h1 className="text-2xl lg:text-3xl font-bold text-center text-white ">
          “Bersama bergabagi, bersama sejahtera”
        </h1>
      </div>
    </div>
  );
};

export default Login;
