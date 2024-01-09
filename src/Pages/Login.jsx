import React from "react";
import { TypeAnimation } from "react-type-animation";
import FormLogin from "../Components/Moleculs/FormLogin";

const Login = () => {
  return (
    <div className=" flex flex-row items-center justify-center w-full min-h-screen bg-secondary">
      <div className="hidden"></div>
      <div className="flex flex-col w-full gap-6 px-4 md:w-1/2 ">
        <div className="w-full max-w-lg mx-auto rounded-md 2xl:max-w-xl">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="font-poppins flex justify-center w-full gap-1 text-lg font-bold lg:text-xl text-primary">
              Selamat Datang Di
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
                className="text-lg font-bold lg:text-xl text-primary"
              />
            </div>
            <p className="text-lg font-thin text-black">
              Silahkan login untuk masuk
            </p>
          </div>
          <div className="w-full mt-5">
            <FormLogin />
          </div>
        </div>
      </div>
      <div className="flex-col items-center justify-center hidden w-full min-h-screen gap-6 md:flex md:w-1/2">
        <img
          src="Poltek.jpg"
          alt="login"
          className="bg-cover h-screen w-screen"
        />
      </div>
    </div>
  );
};

export default Login;
