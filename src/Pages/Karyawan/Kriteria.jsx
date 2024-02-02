import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toRupiah, hari } from "../../utils/helper";

const Kriteria = () => {
  const [data, setData] = useState();

  const dataKriteria = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kriteria");
      setData(response.data.data);
    } catch (error) {
      console.log("Error:", error.response.data);
    }
  };

  useEffect(() => {
    dataKriteria();
  }, []);

  return (
    <div className="max-h-max p-12 bg-primary pt-24 font-poppins pb-36">
      <div className="flex flex-col justify-center items-center pt-10 gap-5 w-full">
        <h1 className="text-2xl lg:text-3xl text-black font-semibold">
          Kriteria Penerima
        </h1>
        <div className="overflow-x-auto text-black w-full">
          <table className="table">
            {/* head */}
            <thead className="text-black">
              <tr>
                <th>No</th>
                <th>Jenis Bantuan</th>
                <th>Maksimal Nominal</th>
                <th>Keterangan</th>
                <th>Dokumen</th>
                <th>Batas Waktu</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data?.jenis_bantuan}</td>
                  <td>{toRupiah(data?.nominal)}</td>
                  <td>{data.keterangan}</td>
                  <td>{data.dokumen}</td>
                  <td>{hari(data.batas_waktu)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kriteria;
