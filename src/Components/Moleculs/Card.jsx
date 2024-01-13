import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card w-full bg-secondary shadow-xl text-black mx-auto">
      <figure className="px-10 pt-10">{props.icons}</figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title uppercase">{props.title}</h2>
        <p className="italic mb-5  text-gray-400">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
          voluptas hic dignissimos sit ut facere, consequuntur amet, temporibus
          voluptates magni cupiditate asperiores in deleniti natus? Inventore
          nisi quibusdam quia qui.
        </p>
        <div className="card-actions">
          <Link className="btn bg-primary" to={props.to}>
            Kunjungi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
