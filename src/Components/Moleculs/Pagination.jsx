import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePageNumbers = 5; // Jumlah halaman yang terlihat
  const halfVisible = Math.floor(visiblePageNumbers / 2);

  const generatePageNumbers = () => {
    const pages = [];

    // Tambahkan tombol "Previous"
    pages.push(
      <button
        key="previous"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );

    // Tambahkan tombol halaman pertama
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={currentPage === 1 ? "join-item btn" : ""}
      >
        1
      </button>
    );

    const start = Math.max(2, currentPage - halfVisible); // Mulai setelah halaman pertama
    const end = Math.min(totalPages - 1, currentPage + halfVisible); // Sebelum halaman terakhir

    if (start > 2) {
      pages.push(<button className="join-item btn-disabled ">...</button>); // Titik untuk halaman yang dilewati
    }

    // Tambahkan tombol halaman di sekitar halaman saat ini
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? "join-item btn" : ""}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages - 1) {
      pages.push(<button className="join-item btn-disabled ">...</button>); // Titik untuk halaman yang dilewati
    }

    // Tambahkan tombol halaman terakhir
    pages.push(
      <button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className={currentPage === totalPages ? "join-item btn" : ""}
      >
        {totalPages}
      </button>
    );

    // Tambahkan tombol "Next"
    pages.push(
      <button
        key="next"
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return pages;
  };

  return <div className="flex gap-3 text-black">{generatePageNumbers()}</div>;
};

export default Pagination;
