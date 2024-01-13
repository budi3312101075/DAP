import React from "react";
import { GrMoney } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";
import { BsInfoSquare } from "react-icons/bs";
import Card from "../../Components/Moleculs/Card";

const Home = () => {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center relative w-full"
        style={{ backgroundImage: "url('./Poltek.jpg')" }}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-10"></div>
        <div className="text-white font-poppins pt-64 px-4 xl:px-14 z-20 relative">
          <h1 className="text-3xl xl:text-4xl ">"Dari Kita, Untuk Kita"</h1>
          <h1 className="text-xl xl:text-2xl w-96 lg:w-1/2 sm:w-96 ">
            Sistem Aplikasi berbasis web sebagai platform pendata dana sosial
            karyawan Polibatam
          </h1>
          <div className="mt-44 grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-5">
            <Card
              icons={<GrMoney size={45} />}
              title="Pengajuan"
              to="/pengajuan"
            />
            <Card
              icons={<TbReportMoney size={45} />}
              title="Laporan"
              to="/pengajuan"
            />
            <Card
              icons={<BsInfoSquare size={45} />}
              title="Status Klaim"
              to="/pengajuan"
            />
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-secondary flex pt-80">
        <div>
          <img src="./Poltek.jpg" alt="" className="h-full" />
        </div>
        <div>
          <h1>WELCOME</h1>
          <h1>Dana Amal Polibatam</h1>
          <p>
            Sistem Aplikasi Dompet Amal berbasis web ini berfungsi untuk mendata
            dana sosial yang disetorkan setiap bulan oleh semua karyawan
            Polibatam. Dana ini akan diambil untuk kepentingan sosial seperti
            santunan kedudukan karyawan, bantuan berobat, pernikahan, kelahiran
            anak dan kegiatan sosial lainnya yang relevan. Didalam applikasi ini
            sudah terdapat fitur pengajuan bantuan sesuai fasilitas yang
            tersedia di DAP. Dikarenakan sistem ini untuk mendata dana sosial
            maka terdapat fitur untuk mendata laporan dana yang terkumpul baik
            secara periodic dan kumulatif, maka setiap karyawan dapat melihat
            gambaran berapa banyak yang sudah mereka sumbangkan setiap bulannya
            dan berapa juga benefit yang diperoleh, kemudian dapat di hitung
            rasio manfaatnya sehingga dapat melihat perputaran dana DAP, tentu
            saja harapan benefitnya bisa dirasakan dan terukur lebih besar dari
            biaya yang dikeluarkan.
          </p>
        </div>
      </div>
      <div className="h-screen w-full bg-secondary xl:hidden"></div>
      {/* <div className="h-screen w-full bg-secondary flex">
        <div>
          <img src="./Poltek.jpg" alt="" />
        </div>
        <div>
          <h1>WELCOME</h1>
          <h1>Dana Amal Polibatam</h1>
          <p>
            Sistem Aplikasi Dompet Amal berbasis web ini berfungsi untuk mendata
            dana sosial yang disetorkan setiap bulan oleh semua karyawan
            Polibatam. Dana ini akan diambil untuk kepentingan sosial seperti
            santunan kedudukan karyawan, bantuan berobat, pernikahan, kelahiran
            anak dan kegiatan sosial lainnya yang relevan. Didalam applikasi ini
            sudah terdapat fitur pengajuan bantuan sesuai fasilitas yang
            tersedia di DAP. Dikarenakan sistem ini untuk mendata dana sosial
            maka terdapat fitur untuk mendata laporan dana yang terkumpul baik
            secara periodic dan kumulatif, maka setiap karyawan dapat melihat
            gambaran berapa banyak yang sudah mereka sumbangkan setiap bulannya
            dan berapa juga benefit yang diperoleh, kemudian dapat di hitung
            rasio manfaatnya sehingga dapat melihat perputaran dana DAP, tentu
            saja harapan benefitnya bisa dirasakan dan terukur lebih besar dari
            biaya yang dikeluarkan.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default Home;
