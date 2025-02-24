import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../state/UserReducer"; // Import the clearUser action

const drawerWidth = 180;

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
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SideNav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.drawer.isOpen);

  const user = useSelector((state) => state.user.user);
  const backendUrl =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_URL_PROD
      : import.meta.env.VITE_BACKEND_URL;

  const menuItems = [
    { name: "Home", route: "home", icon: <HomeIcon /> },
    { name: "Generate", route: "generate", icon: <DescriptionIcon /> },
    { name: "Reports", route: "reports", icon: <AssessmentIcon /> },
    { name: "About", route: "about", icon: <InfoIcon /> },
  ];

  const logoutItem = { name: "Logout", route: "/", icon: <LogoutIcon /> };

  const handleLogout = async () => {
    console.log("logging off...");
    try {
      const response = await fetch(`${backendUrl}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        dispatch(clearUser());
        localStorage.removeItem("isLoggedIn");
        navigate("/analyze");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={isDrawerOpen}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                if (!user && (item.name === "Home" || item.name === "About")) {
                  navigate(`/${item.route}`);
                } else if (user) {
                  navigate(`/${item.route}`);
                }
              }}
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  isDrawerOpen
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
                disabled={
                  !user && (item.name === "Generate" || item.name === "Reports")
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: isDrawerOpen ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={[
                    isDrawerOpen
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List sx={{ marginTop: "auto", display: "flex" }}>
          {user ? (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleLogout}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: isDrawerOpen ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: isDrawerOpen ? 3 : "auto",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/login")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: isDrawerOpen ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: isDrawerOpen ? 3 : "auto",
                  }}
                >
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Login"
                  sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
