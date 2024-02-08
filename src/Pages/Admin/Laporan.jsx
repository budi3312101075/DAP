import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { formatDate, toRupiah } from "../../utils/helper";
import { usePDF } from "react-to-pdf";
import "../../index.css";
import DataLaporan from "../../Components/Moleculs/DataLaporan";
import { DownloadTableExcel } from "react-export-table-to-excel";

const Laporan = () => {
  const [data, setData] = useState();
  const [bantuan, setBantuan] = useState();
  const [filter, setFilter] = useState({
    tanggalAwal: "",
    tanggalAkhir: "",
    tahun: "",
    jenis_bantuan: "",
    nama: "",
  });
  // console.log(filter);

  const { toPDF, targetRef } = usePDF({ filename: "Data-pengajuan.pdf" });
  const tableRef = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showDataLaporan, setShowDataLaporan] = useState(false);
  // console.log(showDataLaporan);

  const jenisBantuan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kriteria");
      setBantuan(response.data.data);
    } catch (error) {
      console.log("Error:", error.response.data);
    }
  };

  const dataLaporan = async () => {
    const response = await axios.get("http://localhost:5000/laporan");
    setData(response.data.data);
  };

  useEffect(() => {
    dataLaporan();
    jenisBantuan();
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

  // console.log(filteredData);

  useEffect(() => {
    toPDF();
    if (showDataLaporan) {
      setShowDataLaporan(false);
    }
  }, [showDataLaporan]);

  return (
    <>
      <div className="h-screen flex flex-col mt-16 gap-7 bg-primary rounded-2xl p-8  font-poppins">
        <h1 className="sm:text-xl xl:text-2xl font-thin text-black">
          Laporan
          <hr className="my-2 border-gray-500" />
        </h1>

        <div className="grid gap-2 xl:grid-cols-4 md:grid-cols-2 ">
          <input
            type="text"
            placeholder="Filter by Name"
            onChange={(e) => handleFilterChange("nama", e.target.value)}
            className="input input-bordered w-full max-w-xs bg-primary border border-black"
          />
          <select
            className="select select-bordered w-full max-w-xs bg-primary border border-black"
            onChange={(e) =>
              handleFilterChange("jenis_bantuan", e.target.value)
            }
          >
            <option value="">Filter berdasarkan Jenis</option>
            {bantuan?.map((bantuan, index) => {
              return (
                <option key={index} value={bantuan.jenis_bantuan}>
                  {bantuan.jenis_bantuan}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Filter by Tahun"
            className="input input-bordered w-full max-w-xs bg-primary border border-black"
            onChange={(e) => handleFilterChange("tahun", e.target.value)}
          />
          <div className="flex gap-3">
            <input
              type="date"
              placeholder="Filter by Tanggal Awal"
              className="input input-bordered w-full max-w-xs bg-primary border border-black"
              onChange={(e) =>
                handleFilterChange("tanggalAwal", e.target.value)
              }
            />
            <input
              type="date"
              placeholder="Filter by Tanggal Akhir"
              className="input input-bordered w-full max-w-xs bg-primary border border-black"
              onChange={(e) =>
                handleFilterChange("tanggalAkhir", e.target.value)
              }
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <button
            className="px-5 py-1 bg-red-500 text-primary rounded-full mb-1 mr-3"
            onClick={() => {
              toPDF();
              setShowDataLaporan(true);
            }}
          >
            Export Pdf
          </button>
          <DownloadTableExcel
            filename="data-pengajuan"
            sheet="Data pengajuan"
            currentTableRef={tableRef.current}
          >
            <button className="px-5 py-1 bg-secondary text-primary rounded-full mb-1">
              {" "}
              Export Excel{" "}
            </button>
          </DownloadTableExcel>
          <table className="table" ref={tableRef}>
            {/* head */}
            <thead>
              <tr className="bg-gray-500 text-black">
                <th>No</th>
                <th>Nama</th>
                <th>No telepon</th>
                <th>Tanggal</th>
                <th>Deskripsi</th>
                <th>Nominal</th>
                <th>Jenis Bantuan</th>
                <th>Bukti</th>
                <th>status</th>
                <th>deskripsi status</th>
                <th>bukti transfer</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.nama}</td>
                  <td>{data.no_telepon}</td>
                  <td>{formatDate(data?.tanggal)}</td>
                  <td>{data.deskripsi}</td>
                  <td>{toRupiah(data.nominal)}</td>
                  <td>{data.jenis_bantuan}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${data?.bukti}`}
                      alt=""
                      className="w-14"
                    />
                  </td>
                  <td>{data.status}</td>
                  <td>{data.deskripsi_status}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${data?.bukti_transfer}`}
                      alt=""
                      className="w-14"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDataLaporan && (
        <div ref={targetRef}>
          <DataLaporan data={filteredData} />
        </div>
      )}
    </>
  );
};

export default Laporan;
