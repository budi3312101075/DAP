import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Outlet, useNavigate } from "react-router-dom";
import { detailUser } from "../../utils/helper";
import { BiLogOut } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsersRectangle } from "react-icons/fa6";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { useAuth } from "../../Store/Auth";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "../../Components/Atoms/Button";
import { toast } from "react-toastify";
import { TbPassword } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#68ACC9",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: registers,
    handleSubmit: handleSubmits,
    reset: resets,
    formState,
  } = useForm();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Mendeteksi apakah layar adalah layar seluler

  const [open, setOpen] = React.useState(false); // Set nilai awal open berdasarkan deteksi layar
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const user = detailUser();
  const role = user.role;
  // console.log(user.id);

  const [currentUser, setCurrentUser] = React.useState({});

  const { loginResponse, setLoginResponse, setLogOut } = useAuth();
  const handleLogout = async () => {
    const logout = await axios.get("http://localhost:5000/Logout");
    setLoginResponse(logout);
    navigate("/");
    setLogOut();
    // localStorage.clear();
  };

  const getMe = async () => {
    const response = await axios.get("http://localhost:5000/getMe");
    setCurrentUser(response.data.data[0]);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/Users/${currentUser.id}`,
        data
      );
      toast.success(response.data.msg);
      getMe();
      document.getElementById("my_modal_10").close();
    } catch (error) {
      toast.error(error.response.data.failed);
      document.getElementById("my_modal_10").close();
    }
  };

  const resetPassword = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/resetPassword/${currentUser.id}`,
        data
      );
      getMe();
      resets();
      toast.success(response.data.msg);
      document.getElementById("my_modal_20").close();
    } catch (error) {
      toast.error(error.response.data.msg);
      resets();
      document.getElementById("my_modal_20").close();
    }
  };

  React.useEffect(() => {
    setValue("username", currentUser?.username);
    setValue("email", currentUser?.email);
    setValue("no_telepon", currentUser?.no_telepon);
  }, [currentUser, onSubmit]);

  React.useEffect(() => {
    getMe();
  }, []);

  const [navAdmin, setNavAdmin] = React.useState([
    {
      id: 1,
      navigasi: "/",
      nama: "Dashboard",
      icon: <LuLayoutDashboard size={23} className="text-gray-600" />,
    },
    {
      id: 2,
      navigasi: "/Daftar-pengajuan",
      nama: "Daftar Pengajuan",
      icon: <InboxIcon size={25} className="text-gray-600" />,
    },
    {
      id: 3,
      navigasi: "/laporan",
      nama: "Laporan",
      icon: <TbReportAnalytics size={25} className="text-gray-600" />,
    },
    {
      id: 4,
      navigasi: "/keuangan",
      nama: "Keuangan",
      icon: <LiaMoneyBillWaveSolid size={25} className="text-gray-600" />,
    },
  ]);

  const [navSuper, setNavSuper] = React.useState([
    {
      id: 1,
      navigasi: "/",
      nama: "Dashboard",
      icon: <LuLayoutDashboard size={23} className="text-gray-600" />,
    },
    {
      id: 2,
      navigasi: "/Daftar-pengajuan",
      nama: "Daftar Pengajuan",
      icon: <InboxIcon size={25} className="text-gray-600" />,
    },
    {
      id: 3,
      navigasi: "/laporan",
      nama: "Laporan",
      icon: <TbReportAnalytics size={25} className="text-gray-600" />,
    },
    {
      id: 4,
      navigasi: "/keuangan",
      nama: "Keuangan",
      icon: <LiaMoneyBillWaveSolid size={25} className="text-gray-600" />,
    },
    {
      id: 5,
      navigasi: "/Kriteria",
      nama: "Kriteria Bantuan",
      icon: <CgNotes size={23} className="text-gray-600" />,
    },
    {
      id: 6,
      navigasi: "/daftar-user",
      nama: "Daftar User",
      icon: <FaUsersRectangle size={23} className="text-gray-600" />,
    },
  ]);

  const [navManajemen, setNavManajemen] = React.useState([
    {
      id: 1,
      navigasi: "/",
      nama: "Dashboard",
      icon: <LuLayoutDashboard size={23} className="text-gray-600" />,
    },
    {
      id: 2,
      navigasi: "/laporan",
      nama: "Laporan",
      icon: <TbReportAnalytics size={25} className="text-gray-600" />,
    },
  ]);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f1f1ea" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <div className="font-bold">DANA AMAL POLIBATAM</div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* sidebar menu */}
          {role === "Admin" ? (
            // Logika atau tampilan khusus untuk Admin
            <ListItem sx={{ display: "block" }}>
              {navAdmin.map((link) => (
                <ListItemButton
                  key={link.id}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => navigate(link.navigasi)} //navigasi ke halaman mana
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <span className="-ml-2">{link.icon}</span>
                  </ListItemIcon>
                  <ListItemText
                    primary={link.nama} //nama
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              ))}
            </ListItem>
          ) : role === "SuperAdmin" ? (
            // Logika atau tampilan khusus untuk superadmin
            <ListItem sx={{ display: "block" }}>
              {navSuper.map((link) => (
                <ListItemButton
                  key={link.id}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => navigate(link.navigasi)} //navigasi ke halaman mana
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <span className="-ml-2">{link.icon}</span>
                  </ListItemIcon>
                  <ListItemText
                    primary={link.nama} //nama
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              ))}
            </ListItem>
          ) : role === "Manajemen" ? (
            // Logika atau tampilan default jika tidak ada yang sesuai
            <ListItem sx={{ display: "block" }}>
              {navManajemen.map((link) => (
                <ListItemButton
                  key={link.id}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => navigate(link.navigasi)} //navigasi ke halaman mana
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <span className="-ml-2">{link.icon}</span>
                  </ListItemIcon>
                  <ListItemText
                    primary={link.nama} //nama
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              ))}
            </ListItem>
          ) : (
            <h1>Role Tidak Diketahui</h1>
          )}
        </List>
        <Divider />
        {/* Button Disini */}
        <List>
          <ListItem sx={{ display: "block" }}>
            {/* // button update profile == hidden saat superadmin*/}
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display: role == "SuperAdmin" ? "none" : "",
              }}
              onClick={() => {
                document.getElementById("my_modal_10").showModal();
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CgProfile className="-ml-1 text-gray-600" size={25} />
              </ListItemIcon>
              <ListItemText
                primary={"Ubah Profile"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>

            {/* Button ganti password */}
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                document.getElementById("my_modal_20").showModal();
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TbPassword className="-ml-1 text-gray-600" size={25} />
              </ListItemIcon>
              <ListItemText
                primary={"Ganti Password"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>

            {/* button logout */}
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BiLogOut className="-ml-2 text-gray-600" size={25} />
              </ListItemIcon>
              <ListItemText primary={"Keluar"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
      {/* modal untuk ubah profile */}
      <dialog id="my_modal_10" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">Update Profile</h3>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full justify-center items-center rounded-xl"
          >
            {errors.username && (
              <span className="text-red-600 ">
                Hanya huruf dan angka yang diperbolehkan untuk Username dan
                tidak boleh spasi
              </span>
            )}
            <div className="w-full">
              <p className="pl-2 mb-1">Username</p>
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
            </div>

            {errors.email && (
              <span className="text-red-600 ">
                Harus berupa email yang valid
              </span>
            )}
            <div className="w-full">
              <p className="pl-2 mb-1">Email</p>
              <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
                <input
                  type="email"
                  className="w-full bg-[#f2f4f6] placeholder:text-tertiary"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                  })}
                  placeholder="Masukan email"
                />
              </div>
            </div>

            {errors.no_telepon && (
              <span className="text-red-600 ">Hanya menerima angka</span>
            )}
            <div className="w-full">
              <p className="pl-2 mb-1">Nomor Telepon</p>
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
              document.getElementById("my_modal_10").close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
      {/* modal untuk reset password*/}
      <dialog id="my_modal_20" className="modal">
        <div className="modal-box bg-primary text-black max-w-none flex flex-col gap-8">
          <h3 className="font-bold text-lg">Reset Password</h3>
          <form
            onSubmit={handleSubmits(resetPassword)}
            className="flex flex-col gap-5 w-full justify-center items-center rounded-xl"
          >
            {formState.errors.currentPassword && (
              <span className="text-red-600">Password harus diisi.</span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registers("currentPassword", { required: true })}
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
            {formState.errors.newPassword && (
              <span className="text-red-600">Password harus diisi.</span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registers("newPassword", { required: true })}
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
            {formState.errors.confirmPassword && (
              <span className="text-red-600">Password harus diisi.</span>
            )}
            <div className="input input-bordered border-black flex justify-between w-full gap-5 items-center bg-[#f2f4f6]">
              <input
                type={showPassword ? "text" : "password"}
                {...registers("confirmPassword", { required: true })}
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
          <button
            className="px-4 py-2 bg-black rounded-lg text-white w-full "
            onClick={() => {
              document.getElementById("my_modal_20").close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </Box>
  );
}
