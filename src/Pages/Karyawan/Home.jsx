import React from "react";
import { GrMoney } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";
import { BsInfoSquare } from "react-icons/bs";
import { Card, Card2 } from "../../Components/Moleculs/Card.jsx";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdDomain } from "react-icons/md";
import Hero from "../../Components/Moleculs/Hero.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <div className=" px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-5 z-30 absolute -mt-40">
        <Card
          icons={<GrMoney size={45} className="text-primary" />}
          title="Pengajuan"
          to="/pengajuan"
        />
        <Card
          icons={<TbReportMoney size={45} className="text-primary" />}
          title="Laporan"
          to="/pengajuan"
        />
        <Card
          icons={<BsInfoSquare size={45} className="text-primary" />}
          title="Status Klaim"
          to="/pengajuan"
        />
      </div>
      <div className="h-screen bg-secondary"></div>
      <div className="h-screen bg-secondary xl:hidden lg:hidden"></div>
      <div className="h-screen w-full bg-secondary -mt-96 flex flex-col p-10 xl:flex-row gap-7 lg:px-28">
        <img
          src="./Poltek.jpg"
          alt=""
          className="mx-auto w-full md:w-1/2 xl:w-1/3"
        />
        <div className="text-black h-52 font-poppins text-justify">
          <h1 className="text-primary text-3xl xl:text-4xl font-thin">
            Selamat Datang Di
          </h1>
          <h1 className="text-primary text-2xl xl:text-3xl font-bold ">
            Dana Amal Polibatam
          </h1>
          <p className="text-sm mb-2 mt-3 lg:text-lg">
            Sistem Aplikasi Dompet Amal berbasis web ini berfungsi untuk mendata
            dana sosial yang disetorkan setiap bulan oleh semua karyawan
            Polibatam. Dana ini akan diambil untuk kepentingan sosial seperti
            santunan kedudukan karyawan, bantuan berobat, pernikahan, kelahiran
            anak dan kegiatan sosial lainnya yang relevan.
          </p>
          <p className="text-sm lg:text-lg">
            Didalam applikasi ini sudah terdapat fitur pengajuan bantuan sesuai
            fasilitas yang tersedia di DAP. Dikarenakan sistem ini untuk mendata
            dana sosial maka terdapat fitur untuk mendata laporan dana yang
            terkumpul baik secara periodic dan kumulatif, maka setiap karyawan
            dapat melihat gambaran berapa banyak yang sudah mereka sumbangkan
            setiap bulannya dan berapa juga benefit yang diperoleh, kemudian
            dapat di hitung rasio manfaatnya sehingga dapat melihat perputaran
            dana DAP, tentu saja harapan benefitnya bisa dirasakan dan terukur
            lebih besar dari biaya yang dikeluarkan.
          </p>
        </div>
      </div>
      <div className="bg-secondary min-h-full lg:h-screen lg:px-28 p-10 gap-7 flex flex-col items-center">
        <div className="text-center font-poppins">
          <h1 className="text-primary text-3xl xl:text-4xl font-bold  lg:pt-11 mb-5">
            Hubungi Kami
          </h1>
          <p className="text-black text-sm lg:text-xl">
            Hubungi kami untuk pertanyaan lebih lanjut atau bantuan, Pendapat
            Anda sangat berarti bagi kami.
          </p>
        </div>
        <div className=" gap-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          <Card2
            icons={<FaAddressBook size={35} className="text-primary mt-9" />}
            title="Address"
            desc="Batam Centre, Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29461"
          />
          <Card2
            icons={
              <MdOutlineContactPhone size={35} className="text-primary mt-9" />
            }
            title="Contact"
            desc="+62 123 456 7890"
          />
          <Card2
            icons={<MdEmail size={35} className="text-primary mt-9" />}
            title="Email"
            desc="danaamalpolibatam@gmail.com"
          />
          <Card2
            icons={<MdDomain size={35} className="text-primary mt-9" />}
            title="Website"
            desc="danaamalpoltek.com"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
