import React, { useEffect, useState } from "react";
import axios from "axios";
import { toRupiah, formatDate } from "../../utils/helper";
import Modals from "../../Components/Moleculs/Modals";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";

const DaftarKeuangan = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registers,
    handleSubmit: handleSubmits,
    reset: resets,
    setValue,
    formState: { errorss },
  } = useForm();

  const [data, setData] = useState();
  const [totalDana, setTotalDana] = useState(0);
  const [nominal, setNominal] = useState();
  const [currentData, setCurrentData] = useState();

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

  const currentDate = new Date().toISOString().split("T")[0];

  const Keuangan = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/keuangan`
      );
      setData(response.data.data);
      setTotalDana(response.data.totalDana);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/keuangan`,
        {
          status: "pemasukan",
          keterangan: data.keterangan,
          tanggal: currentDate,
          nominal: removeCommaAndConvertToInt(nominal),
        }
      );
      reset();
      Keuangan();
      toast.success("Pemasukan berhasil ditambahkan");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      toast.error("Pemasukan gagal ditambahkan");
      document.getElementById("my_modal_1").close();
      console.log("Error:", error.response.data);
    }
  };

  const deletedKeuangan = async (data) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/keuangan/${data.id}`
      );
      if (response.status === 200) {
        toast.success("Keuangan Berhasil dihapus");
      }
      Keuangan();
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const onUpdate = async (data) => {
    // console.log(data.keterangan, removeCommaAndConvertToInt(nominal));
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/updateKeuangan/${currentData.id}`,
        {
          nominal: removeCommaAndConvertToInt(nominal),
          keterangan: data.keterangan,
        }
      );
      resets();
      Keuangan();
      toast.success("Pemasukan Berhasil diupdate");
      document.getElementById("my_modal_2").close();
    } catch (error) {
      toast.error("Pemasukan anda gagal untuk diupdate");
      document.getElementById("my_modal_2").close();
      console.log("Error:", error.response.data);
    }
  };

  useEffect(() => {
    Keuangan();
  }, []);

  useEffect(() => {
    setValue("keterangan", currentData?.keterangan);
    setNominal(currentData?.nominal);
  }, [currentData]);

  return (
    <>
      <div className="h-screen flex flex-col mt-16 gap-7 bg-primary rounded-2xl p-8 sm:p-8 font-poppins">
        <h1 className="sm:text-xl xl:text-2xl font-thin text-black">
          Daftar Keuangan
          <hr className="my-2 border-gray-500" />
        </h1>
        <div className="flex justify-between items-center">
          <button
            className="bg-secondary py-1 px-3 rounded-xl max-w-max -mb-5"
            onClick={() => {
              document.getElementById("my_modal_1").showModal();
            }}
          >
            Tambah Pemasukan
          </button>
          <p className="text-black font-semibold text-md -mb-6 justify-end">
            Total Dana : {toRupiah(totalDana)}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-gray-500 text-black">
                <th>No</th>
                <th>Status</th>
                <th>Keterangan</th>
                <th>Tanggal</th>
                <th>Nominal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data?.status}</td>
                  <td>{data?.keterangan}</td>
                  <td>{formatDate(data?.tanggal)}</td>
                  <td>{toRupiah(data?.nominal)}</td>
                  <td className="flex flex-col gap-1">
                    <button
                      className={`${
                        data.status === "pengeluaran"
                          ? "hidden"
                          : "bg-yellow-500 py-1 px-3 rounded-xl"
                      }`}
                      onClick={() => {
                        setCurrentData(data);
                        document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      Ubah
                    </button>
                    <button
                      className="bg-red-500 py-1 px-3 rounded-xl"
                      onClick={() => {
                        deletedKeuangan(data);
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
      {/* modal tambah */}
      <Modals title="Tambah Pemasukan" reset={reset}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
        >
          <NumericFormat
            allowLeadingZeros
            required={true}
            thousandSeparator=","
            placeholder="Jumlah Pemasukan"
            className={`input input-bordered w-full bg-primary border border-black text-black `}
            onChange={(e) => {
              setNominal(e.target.value);
            }}
          />
          <textarea
            {...register("keterangan", {
              required: "keterangan wajib diisi",
            })}
            placeholder="keterangan"
            className={`textarea textarea-bordered w-full bg-primary border border-black text-black  ${
              errors?.keterangan && "input-error"
            }`}
          />
          {errors?.keterangan && (
            <span className="text-red-500 text-sm">
              {errors?.keterangan.message}
            </span>
          )}

          <Button
            type="submit"
            style="w-1/2 mx-auto bg-secondary mt-2 text-primary py-1 -mb-5"
            isi="Kirim"
          />
        </form>
      </Modals>
      {/* modal update */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">Ubah Keuangan</h3>
          <form
            onSubmit={handleSubmits(onUpdate)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            <NumericFormat
              defaultValue={currentData?.nominal}
              value={currentData?.nominal}
              allowLeadingZeros
              required={true}
              thousandSeparator=","
              placeholder="Jumlah Pemasukan"
              className={`input input-bordered w-full bg-primary border border-black text-black `}
              onChange={(e) => {
                setNominal(e.target.value);
              }}
            />
            <textarea
              {...registers("keterangan", {
                required: "keterangan wajib diisi",
              })}
              placeholder="keterangan"
              className={`textarea textarea-bordered w-full bg-primary border border-black text-black  ${
                errorss?.keterangan && "input-error"
              }`}
            />
            {errorss?.keterangan && (
              <span className="text-red-500 text-sm">
                {errorss?.keterangan.message}
              </span>
            )}

            <Button
              type="submit"
              style="w-1/2 mx-auto bg-secondary mt-2 text-primary py-1 -mb-5"
              isi="Kirim"
            />
          </form>
          <button
            className="px-4 py-2 bg-black rounded-lg text-white w-full "
            onClick={() => {
              document.getElementById("my_modal_2").close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default DaftarKeuangan;
