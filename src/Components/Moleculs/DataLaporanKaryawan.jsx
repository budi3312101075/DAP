import React from "react";
import { formatDate, toRupiah } from "../../utils/helper";

const DataLaporanKaryawan = ({ data }) => {
  return (
    <>
      <div className="h-screen pt-20 flex justify-center px-16 text-black">
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="flex w-full">
            <img src="./logo.png" alt="Logo" className="w-32 mr-20" />
            <div className="text-center ml-20">
              <h1 className="text-3xl font-semibold">
                POLITEKNIK NEGERI BATAM
              </h1>
              <p className="text-lg">
                Jl. Ahmad Yani. Batam Centre. Jl. Yani, Tlk- Tering. Kee. Batam
                Kota. Kota Batam. Kepulauan Riau 29461
              </p>
              <p className="text-lg">
                Telepon +62 778 469856 - 469860 Faksimile +62 778 463620
              </p>
              <p className="text-lg">
                Laman: www.polibatam.ac.id, Surel: info@polibatam.ac.id
              </p>
            </div>
          </div>
          <hr className="my-2 border-black border-2 w-full" />
          <h1 className="text-3xl mb-3 mt-5">Laporan Dana Amal Polibatam</h1>
          <div className="overflow-x-auto  w-full">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-gray-500 text-black">
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nominal</th>
                  <th>Jenis Bantuan</th>
                  <th>Status</th>
                  <th>Deskripsi Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(data?.tanggal)}</td>
                    <td>{toRupiah(data?.nominal)}</td>
                    <td>{data?.jenis_bantuan}</td>
                    <td>{data?.status}</td>
                    <td>{data?.deskripsi_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataLaporanKaryawan;
