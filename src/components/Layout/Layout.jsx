import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import NavBar from "../NavBar";

const Layout = () => {
  return (
    <>
      <Header />

      <Box component="main" paddingY="3rem">
        <Outlet />
      </Box>
      <NavBar />
    </>
  );
};

export default Layout;
