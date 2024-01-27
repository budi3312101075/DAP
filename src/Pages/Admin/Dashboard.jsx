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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const user = detailUser();
  const role = user.role;
  console.log(role);

  const { loginResponse, setLoginResponse, setLogOut } = useAuth();
  const handleLogout = async () => {
    const logout = await axios.get("http://localhost:5000/Logout");
    setLoginResponse(logout);
    navigate("/");
    setLogOut();
    // localStorage.clear();
  };

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
      navigasi: "/Daftar-user",
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
    <Box sx={{ display: "flex" }}>
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
        {/* Button Logout Disini */}
        <List>
          <ListItem sx={{ display: "block" }}>
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
    </Box>
  );
}
