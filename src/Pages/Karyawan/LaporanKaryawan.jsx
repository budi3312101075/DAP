import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import { formatDate, toRupiah } from "../../utils/helper";
import DataLaporanKaryawan from "../../Components/Moleculs/DataLaporanKaryawan";

const LaporanKaryawan = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState({
    tanggalAwal: "",
    tanggalAkhir: "",
    tahun: "",
  });
  const { toPDF, targetRef } = usePDF({ filename: "Data-pengajuan.pdf" });
  const [filteredData, setFilteredData] = useState([]);
  const [showDataLaporan, setShowDataLaporan] = useState(false);

  const dataLaporan = async () => {
    const response = await axios.get("http://localhost:5000/laporan");
    setData(response.data.data);
  };

  useEffect(() => {
    dataLaporan();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilter((prevFilter) => ({ ...prevFilter, [field]: value }));
  };

  useEffect(() => {
    // Update filteredData setiap kali data atau filter berubah
    const newFilteredData = data
      ? data.filter((data) => {
          const isTanggalMatch =
            (!filter.tanggalAwal || data.tanggal >= filter.tanggalAwal) &&
            (!filter.tanggalAkhir || data.tanggal <= filter.tanggalAkhir);
          const isTahunMatch =
            !filter.tahun || data.tanggal.includes(filter.tahun);
          return isTanggalMatch && isTahunMatch;
        })
      : [];

    setFilteredData(newFilteredData);
  }, [data, filter]);

  useEffect(() => {
    toPDF();
    if (showDataLaporan) {
      setShowDataLaporan(false);
    }
  }, [showDataLaporan]);

  return (
    <>
      <div className="max-h-max p-12 bg-primary pt-24 font-poppins pb-48">
        <div className="flex flex-col justify-center items-center pt-10 gap-5 w-full">
          <h1 className="text-2xl lg:text-3xl text-black font-semibold">
            Laporan
          </h1>
        </div>
        <div className="flex justify-end my-5 gap-1">
          <div className="flex w-full">
            <button
              className="py-1 px-2 text-xs lg:px-5 lg:text-base bg-red-500 text-primary rounded-full"
              onClick={() => {
                toPDF();
                setShowDataLaporan(true);
              }}
            >
              Export Pdf
            </button>
          </div>
          <input
            type="text"
            placeholder="Filter by Tahun"
            className="input input-bordered w-full max-w-xs bg-primary border border-black"
            onChange={(e) => handleFilterChange("tahun", e.target.value)}
          />
          <input
            type="date"
            placeholder="Filter by Tanggal Awal"
            className="input input-bordered w-full max-w-xs bg-primary border border-black"
            onChange={(e) => handleFilterChange("tanggalAwal", e.target.value)}
          />
          <input
            type="date"
            placeholder="Filter by Tanggal Akhir"
            className="input input-bordered w-full max-w-xs bg-primary border border-black"
            onChange={(e) => handleFilterChange("tanggalAkhir", e.target.value)}
          />
        </div>

        <div className="overflow-x-auto text-black w-full">
          <table className="table">
            <thead className="text-black">
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
              {filteredData?.map((data, index) => (
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
      {showDataLaporan && (
        <div ref={targetRef}>
          <DataLaporanKaryawan data={filteredData} />
        </div>
      )}
    </>
  );
};

export default LaporanKaryawan;
