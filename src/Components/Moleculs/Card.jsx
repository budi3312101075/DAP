import React from "react";

const Card = (props) => {
  return (
    <>
      <div
        className="card max-w-max bg-primary shadow-xl -mt-11"
        data-aos={props.aos}
        data-aos-duration="1000"
      >
        <div className="flex items-center gap-5 px-4 py-2">
          <img src={props.gambar} className="lg:w-10 lg:h-10 h-6" alt="" />
          <div className="">
            <h2 className="card-title text-black mb-1">{props.judul}</h2>
            <p className="text-tertiary w-36 text-xs">{props.title}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
