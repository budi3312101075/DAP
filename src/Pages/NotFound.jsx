import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="bg-white h-screen w-screen font-poppins text-black">
        <div className="flex flex-col justify-center items-center h-full gap-5">
          <img className="h-96 " src="./404.gif" alt="404" />
          <h1 className="text-4xl font-semibold italic">Page Not Found</h1>
          <p className="text-md italic">
            Maaf, Halaman yang anda cari tidak dapat ditemukan
          </p>
          <Link
            to={"/"}
            className="flex items-center space-x-2 bg-[#407bfe] hover:bg-red-500 text-gray-100 px-4 py-2 rounded transition duration-150"
            title="Return Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-white">Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
