import axios from "axios";
import React, { useEffect, useState } from "react";
import { toRupiah } from "../../utils/helper";
import Modals from "../../Components/Moleculs/Modals";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
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
      const response = await axios.get("http://localhost:5000/pengajuanUsers");
      setData(response.data.data); // Asumsi bahwa data berada dalam properti "data"
      // console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  // ============================================
  const [bantuan, setBantuan] = useState();
  // console.log(bantuan);
  const jenisBantuan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kriteria");
      setBantuan(response.data.data);
    } catch (error) {
      console.log("Error:", error.response.data);
    }
  };
  // ==============================================

  useEffect(() => {
    statusPengajuan();
    jenisBantuan();
  }, []);

  // controller untuk pengajuan ulang
  const [nominal, setNominal] = useState(0);

  function removeCommaAndConvertToInt(nominal) {
    if (typeof nominal === "string") {
      const stringWithoutComma = nominal.replace(/,/g, "");
      const result = parseInt(stringWithoutComma, 10);
      return result;
    } else {
      // Jika nominal bukan string, kembalikan nilai asli tanpa perubahan
      return nominal;
    }
  }

  const onSubmit = async (data) => {
    const response = await axios.patch(
      `http://localhost:5000/updatePengajuan/${currentData.id}`,
      {
        nominal: removeCommaAndConvertToInt(nominal),
        deskripsi: data?.deskripsi,
        id_kriteria: data?.id_kriteria,
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
    document.getElementById("my_modal_1").close();
  };

  useEffect(() => {
    setValue("deskripsi", currentData?.deskripsi);
    setValue("id_kriteria", currentData?.id_kriteria);
    setValue("bukti", currentData?.bukti);
    setNominal(currentData?.nominal);
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
                          className="w-16"
                          src={`http://localhost:5000/${data?.bukti_transfer}`}
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
                            document.getElementById("my_modal_1").showModal();
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
      <Modals title="Ajukan Ulang">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
        >
          <NumericFormat
            defaultValue={currentData?.nominal}
            value={currentData?.nominal}
            allowLeadingZeros
            required={true}
            thousandSeparator=","
            onChange={(e) => {
              setNominal(e.target.value);
            }}
            placeholder="Nominal yang ingin diajukan"
            className={`input input-bordered w-full bg-primary border border-black text-black `}
          />
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

          {/* ============================== */}
          <select
            {...register("id_kriteria", {
              required: "jenis_bantuan wajib dipilih",
            })}
            value={currentData?.jenis_bantuan}
            className={`select select-bordered w-full bg-primary border border-black text-black${
              errors["jenis_bantuan"] && "input-error"
            }`}
          >
            <option disabled>Pilih Jenis Bantuan</option>;
            {bantuan?.map((bantuan, index) => {
              return (
                <option key={index} value={bantuan.id}>
                  {bantuan.jenis_bantuan}
                </option>
              );
            })}
          </select>
          {errors["jenis_bantuan"] && (
            <span className="text-red-500 text-sm">
              {errors["jenis_bantuan"].message}
            </span>
          )}
          {/*====================================  */}

          <input
            {...register("bukti", { required: "Bukti wajib diupload" })}
            type="file"
            className={`file-input file-input-bordered w-full bg-primary border border-black text-black${
              errors.bukti && "input-error"
            }`}
          />
          {errors.bukti && (
            <span className="text-red-500 text-sm">{errors.bukti.message}</span>
          )}
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

export default Status;
