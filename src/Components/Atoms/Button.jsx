import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`text-lg rounded-lg font-poppins text-black ${props.style}`}
      to={props.to}
    >
      {props.isi}
    </button>
  );
};

export default Button;
