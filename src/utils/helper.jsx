import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Store/Auth";

export const detailUser = () => {
  const { loginResponse } = useAuth();
  const user = jwtDecode(loginResponse);
  return user;
};

export const toRupiah = (IDR) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(IDR);

  return rupiah;
};

export const hari = (hari) => {
  return `${hari} Hari`;
};

export const formatDate = (rawDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(rawDate).toLocaleDateString("id-ID", options);
  return formattedDate;
};
