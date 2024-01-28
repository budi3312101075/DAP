import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { detailUser, toRupiah } from "../../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
const Pengajuan = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const currentDate = new Date().toISOString().split("T")[0];

  const user = detailUser();

  const [nominal, setNominal] = useState(0);
  function removeCommaAndConvertToInt(nominal) {
    const stringWithoutComma = nominal?.replace(/,/g, "");
    const result = parseInt(stringWithoutComma, 10);
    return result;
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("tanggal", data.tanggal);
    formData.append("nominal", removeCommaAndConvertToInt(nominal));
    formData.append("deskripsi", data.deskripsi);
    formData.append("jenis_bantuan", data.jenis_bantuan);
    formData.append("bukti", data.bukti[0]);
    formData.append("id_users", user.id);

    try {
      const response = await axios.post(
        "http://localhost:5000/pengajuan",
        formData, // Menggunakan FormData sebagai body
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response here, if needed
      toast.success("Pengajuan berhasil dikirim");

      // Reset the form after successful submission
      reset();
    } catch (error) {
      toast.error("Pengajuan anda gagal untuk dikirim");
      console.log("Error:", error.response.data);
    }
  };

  return (
    <>
      <div className="max-h-max p-12 bg-primary pt-24 font-poppins pb-32">
        <div className="flex flex-col justify-center items-center pt-10">
          <h1 className="font-semibold text-2xl xl:text-3xl mb-5 text-black">
            Form Pengajuan
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="flex flex-col gap-5 w-full max-w-2xl p-10 justify-center items-center bg-primary rounded-xl drop-shadow-2xl"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <input
              {...register("tanggal", { required: "Tanggal wajib diisi" })}
              type="date"
              className={`input input-bordered w-full max-w-lg bg-primary border border-black hidden ${
                errors.tanggal && "input-error"
              }`}
              defaultValue={currentDate}
            />
            {errors.tanggal && (
              <span className="text-red-500 text-sm">
                {errors.tanggal.message}
              </span>
            )}
            <NumericFormat
              allowLeadingZeros
              required={true}
              thousandSeparator=","
              onChange={(e) => {
                setNominal(e.target.value);
              }}
              placeholder="Nominal yang ingin diajukan"
              className={`input input-bordered w-full max-w-lg bg-primary border border-black text-black `}
            />
            {/* <input
              {...register("nominal", {
                required: "Nominal wajib diisi",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Nominal hanya dapat berisi angka",
                },
              })}
              placeholder="Nominal yang ingin diajukan"
              className={`input input-bordered w-full max-w-lg bg-primary border border-black text-black ${
                errors.nominal && "input-error"
              }`}
            />
            {errors.nominal && (
              <span className="text-red-500 text-sm">
                {errors.nominal.message}
              </span>
            )} */}
            <textarea
              {...register("deskripsi", { required: "Deskripsi wajib diisi" })}
              placeholder="Deskripsi bantuan"
              className={`textarea textarea-bordered w-full max-w-lg bg-primary border border-black text-black placeholder:pt-3 ${
                errors.deskripsi && "input-error"
              }`}
            />
            {errors.deskripsi && (
              <span className="text-red-500 text-sm">
                {errors.deskripsi.message}
              </span>
            )}
            <select
              {...register("jenis_bantuan", {
                required: "jenis_bantuan wajib dipilih",
              })}
              className={`select select-bordered w-full max-w-lg bg-primary border border-black text-black ${
                errors["jenis_bantuan"] && "input-error"
              }`}
            >
              <option disabled>Pilih Jenis Bantuan</option>
              <option value="Bantuan menikah">Bantuan menikah</option>
              <option value="Bantuan meninggal">Bantuan meninggal</option>
              <option value="Bantuan keguguran">Bantuan keguguran</option>
            </select>
            {errors["jenis_bantuan"] && (
              <span className="text-red-500 text-sm">
                {errors["jenis_bantuan"].message}
              </span>
            )}
            <input
              {...register("bukti", { required: "Bukti wajib diupload" })}
              type="file"
              className={`file-input file-input-bordered w-full max-w-lg bg-primary border border-black text-black${
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
              style="w-1/2 mx-auto bg-secondary mt-2 text-primary py-1"
              isi="Kirim"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Pengajuan;
