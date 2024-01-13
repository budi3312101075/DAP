import React, { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import FormLogin from "../Components/Moleculs/FormLogin";

const Login = () => {
  return (
    <div className="hero min-h-screen bg-white">
      <img
        src="./Poltek.jpg"
        className="object-cover w-screen h-screen"
        alt=""
      />
      <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-10"></div>
      <div className="hero-content flex-col lg:flex-row-reverse w-screen z-20">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold">
            Selamat Datang Di
          </h1>
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
            className="text-lg font-bold lg:text-3xl"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-[#f2f4f6]">
          <h1 className="text-xl font-bold text-center mt-5 -mb-3 text-black">
            Silahkan login untuk masuk
          </h1>
          <FormLogin />
        </div>
      </div>
    </div>

    // <div className=" flex flex-row items-center justify-center w-full min-h-screen bg-secondary">
    //   <div className="hidden"></div>
    //   <div className="flex flex-col w-full gap-6 px-4 md:w-1/2 ">
    //     <div className="w-full max-w-lg mx-auto rounded-md 2xl:max-w-xl shadow-lg p-5 h-80 flex flex-col items-center justify-center">
    //       <div className="flex flex-col items-center justify-center gap-1">
    //         <div className="font-poppins flex flex-col items-center justify-center w-full gap-1 text-lg font-bold lg:text-xl text-primary">
    //           Selamat Datang Di
    //           <TypeAnimation
    //             sequence={[
    //               "",
    //               600,
    //               "Dana",
    //               600,
    //               "Dana Amal",
    //               600,
    //               "Dana Amal Polibatam",
    //               600,
    //             ]}
    //             cursor={true}
    //             repeat={Infinity}
    //             className="text-lg font-bold lg:text-xl text-primary"
    //           />
    //         </div>
    //         <p className="text-lg font-thin text-black">
    //           Silahkan login untuk masuk
    //         </p>
    //       </div>
    //       <div className="w-full mt-5 ">
    //         <FormLogin />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex-col items-center justify-center hidden w-full min-h-screen gap-6 md:flex md:w-1/2">
    //     <img
    //       src="Poltek.jpg"
    //       alt="login"
    //       className="bg-cover h-screen w-screen"
    //     />
    //   </div>
    // </div>
  );
};

export default Login;
