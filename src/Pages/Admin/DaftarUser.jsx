import axios from "axios";
import React, { useEffect, useState } from "react";
import Modals from "../../Components/Moleculs/Modals";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Pagination from "../../Components/Moleculs/Pagination";

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

  const {
    register: registerss,
    handleSubmit: handleSubmitss,
    reset: resetss,
    formState: { errorss },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState();
  const [currentData, setCurrentData] = useState();
  const [filter, setFilter] = useState({
    nama: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const dataPagination = filteredData.slice(startIndex, endIndex);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/Users`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Users`,
        data
      );
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
        `${import.meta.env.VITE_API_URL}/Users/${currentData.id}`,
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
        `${import.meta.env.VITE_API_URL}/deletedUser/${data}`
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
        `${import.meta.env.VITE_API_URL}/blockUser/${data}`
      );
      getUser();
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error.message);
    }
  };

  const resetPassword = async (data) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/resetPasswordAdmin/${currentData.id}`,
        data
      );
      getUser();
      resetss();
      toast.success(response.data.msg);
      document.getElementById("my_modal_76").close();
    } catch (error) {
      toast.error(error.response.data.msg);
      resetss();
      document.getElementById("my_modal_76").close();
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

  const handleFilterChange = (field, value) => {
    setFilter((prevFilter) => ({ ...prevFilter, [field]: value }));
  };

  useEffect(() => {
    if (data) {
      // Data harus diisi sebelum mencoba menyaringnya
      const newFilteredData = data.filter((item) => {
        const isNameValid = !filter.nama || item.nama.includes(filter.nama);
        return isNameValid;
      });

      setFilteredData(newFilteredData);
    }
  }, [data, filter]);
  return (
    <>
      <div className="flex flex-col mt-16 gap-7 bg-primary rounded-2xl p-8  font-poppins">
        <h1 className="sm:text-xl xl:text-2xl font-thin text-black">
          Daftar User
          <hr className="my-2 border-gray-500" />
        </h1>
        <div className="flex justify-between">
          <button
            className="bg-secondary py-1 px-3 rounded-xl w-36 -mb-5 h-full"
            onClick={() => {
              document.getElementById("my_modal_1").showModal();
            }}
          >
            Tambah User
          </button>
          <input
            type="text"
            placeholder="Search name"
            className="input input-bordered w-full max-w-xs bg-primary border border-black"
            onChange={(e) => handleFilterChange("nama", e.target.value)}
          />
        </div>
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
              {dataPagination?.map((filteredData, index) => (
                <tr key={index} className="text-center">
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{filteredData?.nama}</td>
                  <td>{filteredData?.username}</td>
                  <td>{filteredData?.email}</td>
                  <td>{filteredData?.no_telepon}</td>
                  <td>{filteredData.role}</td>
                  <td>{filteredData?.is_Blocked ? "Blocked" : "Aktif"}</td>
                  <td className="flex flex-col gap-1">
                    <button
                      className="bg-yellow-500 py-1 px-3 rounded-xl"
                      onClick={() => blockUser(filteredData.id)}
                    >
                      {filteredData?.is_Blocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      className={`bg-yellow-500 py-1 px-3 rounded-xl ${
                        filteredData?.is_Blocked ? "hidden" : ""
                      }`}
                      onClick={() => {
                        setCurrentData(filteredData);
                        document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      Ubah
                    </button>
                    <button
                      className="bg-yellow-500 py-1 px-3 rounded-xl"
                      onClick={() => {
                        setCurrentData(filteredData);
                        document.getElementById("my_modal_76").showModal();
                      }}
                    >
                      Reset Password
                    </button>
                    <button
                      className="bg-red-500 py-1 px-3 rounded-xl"
                      onClick={() => {
                        deletedUser(filteredData.id);
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
        <div className="flex justify-center -mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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

      {/* modal reset Password */}
      <dialog id="my_modal_76" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">Reset Password</h3>
          <form
            onSubmit={handleSubmitss(resetPassword)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registerss("newPassword", { required: true })}
                placeholder="Masukan password baru"
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
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registerss("confirmPassword", { required: true })}
                placeholder="Masukan ulang password baru"
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
          <button
            className="px-4 py-2 bg-black rounded-lg text-white w-full "
            onClick={() => {
              resetss();
              document.getElementById("my_modal_76").close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>

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
