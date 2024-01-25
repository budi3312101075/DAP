import React from "react";

const Status = () => {
  return (
    <>
      <div className="max-h-min p-12 bg-primary pt-24 font-poppins pb-60">
        <div className="flex flex-col justify-center items-center pt-10 gap-5 w-full">
          <h1 className="text-2xl lg:text-3xl text-black font-semibold">
            Status Pengajuan
          </h1>
          <div className="overflow-x-auto text-black w-full">
            <table className="table">
              {/* head */}
              <thead className="text-black">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
