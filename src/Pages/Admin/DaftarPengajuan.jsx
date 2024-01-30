import axios from "axios";
import React, { useEffect, useState } from "react";
import { toRupiah } from "../../utils/helper";
import { useForm } from "react-hook-form";
import Modals from "../../Components/Moleculs/Modals";
import Button from "../../Components/Atoms/Button";
import { toast } from "react-toastify";

const DaftarPengajuan = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState();
  const [currentData, setCurrentData] = useState();

  const onSubmit = async (data) => {
    let requestBody = {
      status: data?.status,
      deskripsi_status: data?.deskripsi_status,
    };

    if (data?.status == "selesai") {
      // Jika status selesai, tambahkan bukti_transfer ke requestBody
      requestBody.bukti_transfer = data?.bukti_transfer[0];
      if (!requestBody.bukti_transfer) {
        toast.error("Bukti transfer harus diisi jika status sudah selesai");
        document.getElementById("my_modal_1").close();
        return;
      }
    }

    const response = await axios.patch(
      `http://localhost:5000/konfirmasi/${currentData.id}`,
      requestBody,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      toast.success("Pengajuan Berhasil dikonfirmasi");
    }
    pengajuan();
    document.getElementById("my_modal_1").close();
  };

  const pengajuan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pengajuan");
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const deletedPengajuan = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/pengajuan/${data.id}`
      );
      if (response.status === 200) {
        toast.success("Pengajuan Berhasil dihapus");
      }
      pengajuan();
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  useEffect(() => {
    pengajuan();
  }, []);

  const formatDate = (rawDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(rawDate).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };

  return (
    <>
      <div className="h-screen flex flex-col mt-16 gap-7 bg-primary rounded-2xl p-8 sm:p-8 font-poppins">
        <h1 className="sm:text-xl xl:text-2xl font-thin text-black">
          Daftar Pengajuan
          <hr className="my-2 border-gray-500" />
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-gray-500 text-black">
                <th>No</th>
                <th>Nama</th>
                <th>Tanggal</th>
                <th>Deskripsi</th>
                <th>Nominal</th>
                <th>Telepon</th>
                <th>Jenis Bantuan</th>
                <th>Bukti</th>
                <th>Status</th>
                <th>Deskripsi Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data?.nama}</td>
                  <td>{formatDate(data?.tanggal)}</td>
                  <td>{data?.deskripsi}</td>
                  <td>{toRupiah(data?.nominal)}</td>
                  <td>{data?.no_telepon}</td>
                  <td>{data?.jenis_bantuan}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${data?.bukti}`}
                      alt=""
                      className="w-14"
                    />
                  </td>
                  <td>{data?.status}</td>
                  <td>{data?.deskripsi_status}</td>
                  <td className="flex flex-col gap-1">
                    <button
                      className={`bg-secondary py-1 px-3 rounded-xl ${
                        data?.status === "selesai" ? "btn-disabled" : ""
                      } `}
                      onClick={() => {
                        setCurrentData(data);
                        document.getElementById("my_modal_1").showModal();
                      }}
                    >
                      Konfirmasi
                    </button>
                    <button
                      className="bg-red-500 py-1 px-3 rounded-xl"
                      onClick={() => {
                        deletedPengajuan(data);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modals title="Konfirmasi Pengajuan">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
        >
          <h1 className="w-full -mb-3">Status</h1>
          <select
            {...register("status", {
              required: "status wajib dipilih",
            })}
            className={`select select-bordered w-full bg-primary border border-black text-black${
              errors["status"] && "input-error"
            }`}
          >
            <option disabled>Pilih Status</option>
            <option value="selesai">Selesai</option>
            <option value="ditangguhkan">Ditangguhkan</option>
            <option value="tolak">Tolak</option>
          </select>
          {errors["status"] && (
            <span className="text-red-500 text-sm">
              {errors["status"].message}
            </span>
          )}

          <textarea
            {...register("deskripsi_status", {
              required: "deskripsi status wajib diisi",
            })}
            placeholder="deskripsi_status bantuan"
            className={`textarea textarea-bordered w-full bg-primary border border-black text-black  ${
              errors.deskripsi_status && "input-error"
            }`}
          />
          {errors.deskripsi_status && (
            <span className="text-red-500 text-sm">
              {errors.deskripsi_status.message}
            </span>
          )}

          <input
            {...register("bukti_transfer")}
            type="file"
            className={`file-input file-input-bordered w-full bg-primary border border-black text-black`}
          />
          <Button
            type="submit"
            style="w-1/2 mx-auto bg-secondary mt-2 text-primary py-1"
            isi="Kirim"
          />
        </form>
      </Modals>
    </>
  );
};

export default DaftarPengajuan;
