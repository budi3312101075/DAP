import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { detailUser } from "../../utils/helper";

const formatRupiah = (angka) => {
  var number_string = angka.toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

  if (ribuan) {
    var separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

const Pengajuan = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = detailUser();
  const onSubmit = (data) => {
    data.nominal = data.nominal.replace(/[,.]/g, "");
    let body = {
      ...data,
      nama: user.nama,
    };
    console.log(body);

    console.log(data);
    reset();
  };
  return (
    <>
      <div className="h-screen mt-16 bg-secondary p-10 pt-24 text-black font-poppins">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-semibold text-xl lg:text-2xl xl:text-3xl mb-5">
            Form Pengajuan
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full lg:max-w-2xl p-10 justify-center items-center bg-primary rounded-lg"
          >
            <input
              {...register("tanggal", { required: "Tanggal wajib diisi" })}
              type="date"
              className={`input input-bordered w-full max-w-lg bg-secondary border border-black ${
                errors.tanggal && "input-error"
              }`}
            />
            {errors.tanggal && (
              <span className="text-red-500 text-sm">
                {errors.tanggal.message}
              </span>
            )}

            <input
              {...register("no_telp", {
                required: "Nomor telepon wajib diisi",
                pattern: {
                  value: /^[0-9\b]+$/,
                  message: "Nomor telepon hanya boleh berisi angka",
                },
                minLength: {
                  value: 10,
                  message: "Nomor telepon minimal 10 karakter",
                },
              })}
              placeholder="Nomor Wa / Telepon"
              className={`input input-bordered w-full max-w-lg bg-secondary border border-black placeholder:italic ${
                errors.no_telp && "input-error"
              }`}
            />
            {errors.no_telp && (
              <span className="text-red-500 text-sm">
                {errors.no_telp.message}
              </span>
            )}

            <input
              {...register("nominal", {
                required: "Nominal wajib diisi",
                validate: (value) => {
                  const cleanedValue = value.replace(/[,.]/g, ""); // Hapus titik dan koma
                  return !isNaN(cleanedValue); // Periksa apakah setelah dihapus titik dan koma masih angka
                },
              })}
              placeholder="Nominal"
              onInput={(e) => {
                e.target.value = formatRupiah(e.target.value);
              }}
              className={`input input-bordered w-full max-w-lg bg-secondary border border-black ${
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
              className={`textarea textarea-bordered w-full max-w-lg bg-secondary border border-black placeholder:pt-3 ${
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
              className={`select select-bordered w-full max-w-lg bg-secondary border border-black ${
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
              className={`file-input file-input-bordered w-full max-w-lg bg-secondary border border-black ${
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
              style="w-40 mx-auto bg-secondary mt-2 text-black"
              isi="Kirim"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Pengajuan;
