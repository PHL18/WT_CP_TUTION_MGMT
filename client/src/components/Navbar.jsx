import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import profileImage from "../assets/profile.png";
import navImg from "../assets/image_bg.png";
import white from "../assets/white.png";
const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleclick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleclose = () => setAnchorEl(null);
  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon></MenuIcon>
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="search.."></InputBase>
            <IconButton>
              <Search></Search>
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* Right side */}
        <FlexBetween gap="1.5rem ">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }}></LightModeOutlined>
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }}></DarkModeOutlined>
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }}></SettingsOutlined>
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleclick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="dropdown"
                height="40px"
                width="40px"
                src={white}
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              ></Box>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              ></ArrowDropDownOutlined>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              
              onClose={handleclose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <MenuItem onClick={handleclick}>LogOut</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
