import axios from "axios";
import React, { useEffect, useState } from "react";
import Modals from "../../Components/Moleculs/Modals";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const DaftarUser = () => {
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
    formState,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState();
  const [currentData, setCurrentData] = useState();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Users");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/Users", data);
      toast.success("User berhasil dibuat");
      reset();
      getUser();
      document.getElementById("my_modal_1").close();
    } catch (error) {
      toast.error(error.response.data.failed);
      reset();
      document.getElementById("my_modal_1").close();
    }
  };

  const onUpdate = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/Users/${currentData.id}`,
        {
          nama: data.namas,
          username: data.usernames,
          email: data.emails,
          no_telepon: data.no_telepons,
          role: data.roles,
        }
      );
      toast.success(response.data.msg);
      getUser();
      document.getElementById("my_modal_2").close();
    } catch (error) {
      toast.error(error.response.data.failed);
      document.getElementById("my_modal_2").close();
    }
  };

  const deletedUser = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/deletedUser/${data}`
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
      getUser();
    } catch (error) {
      console.error(error.message);
    }
  };

  const blockUser = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/blockUser/${data}`
      );
      getUser();
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setValue("namas", currentData?.nama);
    setValue("usernames", currentData?.username);
    setValue("emails", currentData?.email);
    setValue("no_telepons", currentData?.no_telepon);
    setValue("roles", currentData?.role);
  }, [currentData]);
  return (
    <>
      <div className="h-screen flex flex-col mt-16 gap-7 bg-primary rounded-2xl p-8  font-poppins">
        <h1 className="sm:text-xl xl:text-2xl font-thin text-black">
          Daftar User
          <hr className="my-2 border-gray-500" />
        </h1>
        <button
          className="bg-secondary py-1 px-3 rounded-xl w-36 -mb-5"
          onClick={() => {
            document.getElementById("my_modal_1").showModal();
          }}
        >
          Tambah User
        </button>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-gray-500 text-black text-center">
                <th>No</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Email</th>
                <th>No Telepon</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{data?.nama}</td>
                  <td>{data?.username}</td>
                  <td>{data?.email}</td>
                  <td>{data?.no_telepon}</td>
                  <td>{data.role}</td>
                  <td>{data?.is_Blocked ? "Blocked" : "Aktif"}</td>
                  <td className="flex flex-col gap-1">
                    <button
                      className="bg-yellow-500 py-1 px-3 rounded-xl"
                      onClick={() => blockUser(data.id)}
                    >
                      {data?.is_Blocked ? "Unblock" : "block"}
                    </button>
                    <button
                      className={`bg-yellow-500 py-1 px-3 rounded-xl ${
                        data?.is_Blocked ? "hidden" : ""
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
                        deletedUser(data.id);
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
      <Modals title={"Tambah Users"} reset={reset}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
        >
          {errors.nama && (
            <span className="text-red-600 ">
              Hanya huruf yang diperbolehkan untuk nama
            </span>
          )}
          <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
            <input
              type="text"
              className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
              {...register("nama", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z\s]+$/i,
              })}
              placeholder="Masukan Nama"
            />
          </div>

          {errors.username && (
            <span className="text-red-600 ">
              Hanya huruf dan angka yang diperbolehkan untuk Username dan tidak
              boleh spasi
            </span>
          )}
          <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
            <input
              type="text"
              className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
              {...register("username", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z0-9]+$/i,
              })}
              placeholder="Masukan username"
            />
          </div>

          {errors.email && (
            <span className="text-red-600 ">Harus berupa email yang valid</span>
          )}
          <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
            <input
              type="email"
              className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
              })}
              placeholder="Masukan email"
            />
          </div>

          {errors.no_telepon && (
            <span className="text-red-600 ">Hanya menerima angka</span>
          )}
          <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
            <input
              type="text"
              className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
              {...register("no_telepon", {
                required: true,
                maxLength: 20,
                pattern: /^[0-9]+$/i,
              })}
              placeholder="Masukan Nomor Telepon"
            />
          </div>

          {errors["role"] && (
            <span className="text-red-500 text-sm">
              {errors["role"].message}
            </span>
          )}
          <select
            {...register("role", {
              required: "Role wajib dipilih",
            })}
            className="select select-bordered w-full bg-primary border border-black text-black"
          >
            <option value="">Pilih Role</option>
            <option value="Karyawan">Karyawan</option>
            <option value="Admin">Admin</option>
            <option value="SuperAdmin">Super Admin</option>
            <option value="Manajemen">Manajemen</option>
          </select>

          {errors.password && (
            <span className="text-red-600">Password harus diisi.</span>
          )}
          <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Masukan password"
              className="w-full bg-[#f2f4f6] -ml-2 placeholder:text-tertiary"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                size={25}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEyeSharp size={25} onClick={togglePasswordVisibility} />
            )}
          </div>

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
          <h3 className="font-bold text-lg">Ubah Data User</h3>
          <form
            onSubmit={handleSubmits(onUpdate)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {formState.errors.namas && (
              <span className="text-red-600 ">
                Hanya huruf yang diperbolehkan untuk nama
              </span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type="text"
                className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                {...registers("namas", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z\s]+$/i,
                })}
                placeholder="Masukan nama"
              />
            </div>

            {formState.errors.usernames && (
              <span className="text-red-600 ">
                Hanya huruf dan angka yang diperbolehkan untuk Username dan
                tidak boleh spasi
              </span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type="text"
                className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                {...registers("usernames", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z0-9]+$/i,
                })}
                placeholder="Masukan username"
              />
            </div>

            {formState.errors.emails && (
              <span className="text-red-600 ">
                Harus berupa email yang valid
              </span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type="email"
                className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                {...registers("emails", {
                  required: true,
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                })}
                placeholder="Masukan email"
              />
            </div>

            {formState.errors.no_telepons && (
              <span className="text-red-600 ">Hanya menerima angka</span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type="text"
                className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                {...registers("no_telepons", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[0-9]+$/i,
                })}
                placeholder="Masukan Nomor Telepon"
              />
            </div>

            {formState.errors["roles"] && (
              <span className="text-red-500 text-sm">Silahkan pilih role</span>
            )}
            <select
              {...registers("roles", {
                required: "Role wajib dipilih",
              })}
              className="select select-bordered w-full bg-primary border border-black text-black"
            >
              <option value="">Pilih Role</option>
              <option value="Karyawan">Karyawan</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">Super Admin</option>
              <option value="Manajemen">Manajemen</option>
            </select>
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

export default DaftarUser;
