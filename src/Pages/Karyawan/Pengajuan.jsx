import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { detailUser, toRupiah } from "../../utils/helper";

const Pengajuan = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const currentDate = new Date().toISOString().split("T")[0];

  const user = detailUser();

  const onSubmit = (data) => {
    let body = {
      ...data,
      id_users: user.id,
    };
    console.log(body);
    reset();
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

            <input
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
            )}

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
              {...register("Jenis Bantuan", {
                required: "Jenis bantuan wajib dipilih",
              })}
              className={`select select-bordered w-full max-w-lg bg-primary border border-black text-black ${
                errors["Jenis Bantuan"] && "input-error"
              }`}
            >
              <option disabled>Pilih Jenis Bantuan</option>
              <option value="Bantuan menikah">Bantuan menikah</option>
              <option value="Bantuan meninggal">Bantuan meninggal</option>
              <option value="Bantuan keguguran">Bantuan keguguran</option>
            </select>
            {errors["Jenis Bantuan"] && (
              <span className="text-red-500 text-sm">
                {errors["Jenis Bantuan"].message}
              </span>
            )}

            <input
              {...register("bukti", { required: "Bukti wajib diupload" })}
              type="file"
              required={true}
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
