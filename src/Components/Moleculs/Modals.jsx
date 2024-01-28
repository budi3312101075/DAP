import React from "react";

const Modals = ({ children }) => {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">Ajukan Ulang</h3>
          {children}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Modals;
