import { Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Grid container sx={{ minHeight: "85vh" }}>
        <Grid item container justifyContent="center" alignItems="center">
          {children}
        </Grid>
      </Grid>
    </>
  );
};
export default Layout;
