import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, toRupiah } from "../../utils/helper";

const LaporanKaryawan = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState({
    tanggalAwal: "",
    tanggalAkhir: "",
    tahun: "",
    jenis_bantuan: "",
    nama: "",
  });
  const [filteredData, setFilteredData] = useState([]);

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
          const isJenisMatch =
            !filter.jenis_bantuan ||
            data.jenis_bantuan
              .toLowerCase()
              .includes(filter.jenis_bantuan.toLowerCase());
          const isNamaMatch =
            !filter.nama ||
            data.nama.toLowerCase().includes(filter.nama.toLowerCase());
          const isTanggalMatch =
            (!filter.tanggalAwal || data.tanggal >= filter.tanggalAwal) &&
            (!filter.tanggalAkhir || data.tanggal <= filter.tanggalAkhir);
          const isTahunMatch =
            !filter.tahun || data.tanggal.includes(filter.tahun);
          return isTanggalMatch && isTahunMatch && isJenisMatch && isNamaMatch;
        })
      : [];

    setFilteredData(newFilteredData);
  }, [data, filter]);

  return (
    <>
      <div className="max-h-max p-12 bg-primary pt-24 font-poppins pb-48">
        <div className="flex flex-col justify-center items-center pt-10 gap-5 w-full">
          <h1 className="text-2xl lg:text-3xl text-black font-semibold">
            Laporan
          </h1>
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
        <div className="overflow-x-auto text-black w-full">
          <table className="table">
            <thead className="text-black">
              <tr>
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
    </>
  );
};

export default LaporanKaryawan;
