import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`text-lg rounded-xl font-poppins text-black ${props.style}`}
    >
      {props.isi}
    </button>
  );
};

export default Button;
