import React from "react";

const Modals = ({ children, title, resets }) => {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">{title}</h3>
          {children}
          <button
            className="btn"
            onClick={() => {
              document.getElementById("my_modal_1").close();
              resets();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Modals;
