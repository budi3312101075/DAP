import axios from "axios";
import React, { useEffect, useState } from "react";
import { toRupiah } from "../../utils/helper";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { toast } from "react-toastify";
import { MdOutlinePendingActions } from "react-icons/md";

const Status = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState();
  const [currentData, setCurrentData] = useState();

  // controller untuk get status
  const formatDate = (rawDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(rawDate).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };

  const statusPengajuan = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/pengajuanUsers`
      );
      setData(response.data.data); // Asumsi bahwa data berada dalam properti "data"
      // console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  useEffect(() => {
    statusPengajuan();
  }, []);

  // controller untuk pengajuan ulang

  const onSubmit = async (data) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/updatePengajuan/${currentData.id}`,
      {
        deskripsi: data?.deskripsi,
        bukti: data?.bukti[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      toast.success("Pengajuan Berhasil diajukan ulang");
    }
    statusPengajuan();
    document.getElementById("my_modal_3").close();
  };

  useEffect(() => {
    setValue("deskripsi", currentData?.deskripsi);
    setValue("id_kriteria", currentData?.id_kriteria);
    setValue("bukti", currentData?.bukti);
  }, [currentData]);

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
                <tr className="bg-gray-500">
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nominal</th>
                  <th>Jenis Bantuan</th>
                  <th>deskripsi pengajuan</th>
                  <th>Bukti Transfer</th>
                  <th>Status</th>
                  <th>Deskripsi Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((data, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{formatDate(data?.tanggal)}</td>
                    <td>{toRupiah(data?.nominal)}</td>
                    <td>{data?.jenis_bantuan}</td>
                    <td>{data?.deskripsi}</td>
                    <td>
                      {!data?.bukti_transfer ? (
                        <MdOutlinePendingActions
                          size={30}
                          className="mx-auto"
                        />
                      ) : (
                        <img
                          className="w-16 mx-auto"
                          src={`${import.meta.env.VITE_API_URL}/${
                            data?.bukti_transfer
                          }`}
                          alt="bukti transfer"
                        />
                      )}
                    </td>
                    <td>{data?.status}</td>
                    <td>{data?.deskripsi_status}</td>
                    <td>
                      {data?.status === "selesai" ||
                      data?.status === "tolak" ? (
                        <button className="p-1 bg-slate-500 px-5 rounded-xl">
                          No action
                        </button>
                      ) : data?.status === "ditangguhkan" ? (
                        <button
                          className="p-1 bg-yellow-500 px-2 rounded-xl"
                          onClick={() => {
                            setCurrentData(data);
                            document.getElementById("my_modal_3").showModal();
                          }}
                        >
                          Ajukan ulang
                        </button>
                      ) : (
                        <button className="p-1 bg-slate-500 px-2 rounded-xl">
                          Menunggu Konfirmasi
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">Ajukan Ulang</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            <textarea
              {...register("deskripsi", { required: "Deskripsi wajib diisi" })}
              placeholder="Deskripsi bantuan"
              className={`textarea textarea-bordered w-full bg-primary border border-black text-black  ${
                errors.deskripsi && "input-error"
              }`}
            />
            {errors.deskripsi && (
              <span className="text-red-500 text-sm">
                {errors.deskripsi.message}
              </span>
            )}

            <input
              {...register("bukti", { required: "Bukti wajib diupload" })}
              type="file"
              className={`file-input file-input-bordered w-full bg-primary border border-black text-black${
                errors.bukti && "input-error"
              }`}
            />
            {errors.bukti && (
              <span className="text-red-500 text-sm">
                {errors.bukti.message}
              </span>
            )}
            <Button
              type="submit"
              style="w-1/2 mx-auto bg-secondary mt-2 text-primary py-1 -mb-5"
              isi="Kirim"
            />
          </form>
          <button
            className="btn"
            onClick={() => {
              document.getElementById("my_modal_3").close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Status;
