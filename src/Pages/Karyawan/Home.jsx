import React from "react";
import Hero from "../../Components/Moleculs/Hero";
import Card from "../../Components/Moleculs/Card";

const Home = () => {
  return (
    <div className="max-h-max p-12 bg-primary pt-20 font-poppins" id="beranda">
      <Hero />
      <div className="flex flex-col gap-16 items-center lg:flex-row lg:gap-20 lg:justify-center">
        <Card
          gambar="./money.png"
          judul="Total Dana"
          title="Jumlah dana yang terkumpul"
          aos="fade-up"
        />
        <Card
          gambar="./pengajuan.png"
          judul="Pengajuan"
          title="Permintaan bantuan keryawan"
          aos="fade-up"
        />
        <Card
          gambar="./laporan.png"
          judul="Laporan"
          title="Riwayat Donasi untuk karyawan"
          aos="fade-up"
        />
        <Card
          gambar="./kriteria.png"
          judul="Kriteria Bantuan"
          title="Syarat pengajuan donasi untuk karyawan"
          aos="fade-up"
        />
      </div>

      <div className="mt-16" id="tentang">
        <h1 className="lg:text-4xl text-2xl font-bold text-secondary mb-5">
          Cara Untuk Melindungi Sesama
        </h1>
        <div className="flex bg-primary rounded-3xl drop-shadow-2xl px-5">
          <img
            src="./Helping.gif"
            alt="Movie"
            className="hidden lg:block"
            data-aos="fade-up"
            data-aos-duration="900"
          />
          <div className="card-body">
            <h2 className="lg:text-3xl text-2xl text-black font-bold">
              DOMPET AMAL
            </h2>
            <h3 className="text-md lg:text-lg text-tertiary font-semibold">
              Politeknik Negeri Batam
            </h3>
            <p className="text-justify text-tertiary text-sm lg:text-lg">
              Dompet Amal Polibatam adalah dana sosial yang disetorkan setiap
              bulan oleh semua karyawan polibatam dan dikumpulkan oleh pengelola
              Dompet Amal. Dana yang dikumpulkan ini akan dikeluarkan untuk
              kepentingan sosial seperti santunan kedukaan karyawan, bantuan
              berobat, pernikahan, kelahiran anak dan kegiatan sosial lainnya
              yang relevan. Jadi selain setiap pegawai bisa tau berapa dana DAP
              setiap angota yang disetor ke DAP setiap bulan, pegawai juga bisa
              mengetahui total dana DAP yang terkumpul saat ini, juga dapat
              mengetahui record transaksi pengeluaran. Setiap karyawan yang
              menyetorkan dana setiap bulan dapat melakukan pengajuan bantuan
              sesuai fasilitas DAP (kedukaan, musibah, berobat, kelahiran,
              aqiqah, masuk sekolah) dengan mengisi form dan melampirkan dokumen
              bukti yang relevan, terdapat informasi panduan dan kriteria DAP.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h1 className="lg:text-4xl text-2xl text-secondary mb-5 text-center font-bold">
          Visi dan Misi
        </h1>
        <div className="grid lg:grid-cols-3 text-justify grid-cols-1">
          <div
            className="text-tertiary"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <h1 className="font-bold mb-5 lg:text-xl text-lg text-center">
              Visi Dompet Amal Polibatam
            </h1>
            <p className="lg:text-lg text-sm">
              Menjadi sarana terbaik bagi karyawan Polibatam untuk berbagi
              dengan sesama. Visi ini menggambarkan tujuan Dompet Amal Polibatam
              untuk menjadi sarana yang bermanfaat bagi karyawan Polibatam untuk
              berbagi dengan sesama. Dompet Amal Polibatam diharapkan dapat
              menjadi wadah bagi karyawan Polibatam untuk menyalurkan kepedulian
              sosial mereka kepada sesama yang membutuhkan.
            </p>
          </div>
          <img
            src="./Visi.gif"
            alt="visi&Misi"
            className="w-96 mx-auto"
            data-aos="fade-down"
            data-aos-duration="900"
          />
          <div
            className="text-tertiary"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <h1 className="font-bold mb-5 lg:text-xl text-lg text-center">
              Misi Dompet Amal Polibatam
            </h1>
            <p className="lg:text-lg text-sm">
              Dompet Amal Polibatam akan dikelola secara efisien dan transparan
              untuk memastikan bahwa dana yang terkumpul dapat digunakan secara
              tepat sasaran. Selain itu, Dompet Amal Polibatam akan memberikan
              kemudahan bagi karyawan Polibatam untuk mengetahui saldo dana,
              laporan keuangan, dan pengajuan bantuan. Hal ini bertujuan untuk
              meningkatkan transparansi dan kepercayaan karyawan Polibatam
              terhadap Dompet Amal Polibatam. Dompet Amal Polibatam juga akan
              meningkatkan kesadaran karyawan Polibatam untuk berbagi dengan
              sesama melalui berbagai kegiatan edukasi dan sosialisasi.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16" data-aos="flip-up" data-aos-duration="900">
        <h1 className="lg:text-4xl text-2xl text-secondary text-center font-bold">
          Moto
        </h1>
        <p className="text-tertiary text-center lg:text-2xl text-lg">
          “Bersama bergabagi, bersama sejahtera”
        </p>
      </div>

      <div className="mt-16" id="kontak">
        <h1 className="lg:text-4xl text-2xl text-secondary font-bold mb-8 text-center">
          Hubungi Kami
        </h1>
        <div className="flex justify-around">
          <div
            className="flex flex-col py-10 gap-4 items-center bg-primary rounded-3xl drop-shadow-2xl lg:w-1/2 w-full px-5"
            data-aos="zoom-in"
            data-aos-duration="900"
            data-aos-easing="ease-in-sine"
          >
            <h1 className="text-2xl text-black">Berikan Pesan</h1>
            <label className="form-control gap-1 w-full max-w-md">
              <span className="text-tertiary pl-1">Masukan Nama Lengkap</span>
              <input
                type="text"
                placeholder="Masukan nama lengkap anda"
                className="input input-bordered w-full max-w-md bg-primary border-2 text-tertiary"
              />
            </label>
            <label className="form-control gap-1 w-full max-w-md bg-primary">
              <span className="text-tertiary pl-1">Email Anda</span>
              <input
                type="text"
                placeholder="Masukan email anda"
                className="input input-bordered w-full max-w-md bg-primary border-2 text-tertiary"
              />
            </label>
            <label className="form-control gap-1 w-full max-w-md bg-primary">
              <span className="text-tertiary pl-1">Subject</span>
              <input
                type="text"
                placeholder="Masukan subject anda"
                className="input input-bordered w-full max-w-md bg-primary border-2 text-tertiary"
              />
            </label>
            <label className="form-control gap-1 w-full max-w-md bg-primary">
              <span className="text-tertiary pl-1">Pesan</span>
              <textarea
                type="text"
                placeholder="Masukan pesan anda"
                className="input input-bordered w-full max-w-md bg-primary border-2 text-tertiary pt-2 placeholder:pt-5 h-20"
              />
            </label>
            <button className="max-w-max bg-secondary px-14 text-primary rounded-full py-1">
              Kirim
            </button>
          </div>
          <img src="./Contact.gif" alt="contact" className="hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default Home;
