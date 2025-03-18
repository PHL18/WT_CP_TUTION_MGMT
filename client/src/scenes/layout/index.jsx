import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/SideBar";
import { useGetUserQuery } from "state/api";
import { useSelector } from "react-redux";

const Layout = () => {
  const isNonmobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Fixed naming
  const userId=useSelector((state)=>state.global.userId)
  const {data}=useGetUserQuery(userId)
  console.log("data", data)

  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonmobile={isNonmobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen} // ✅ Fixed naming
      />
       <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} // ✅ Fixed naming
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;