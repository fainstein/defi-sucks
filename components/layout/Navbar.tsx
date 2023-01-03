import * as React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

import { IAppStore } from "../../types/store";

const CustomizedLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const drawerWidth = 240;

const Navbar = () => {
  const walletAddress = useSelector(
    (state: IAppStore) => state.wallet.walletAddress
  );
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const walletStatusTitle = !walletAddress
    ? "Wallet not connected"
    : "Welcome: " + walletAddress.substring(0, 8) + "...";

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <CustomizedLink href="/">DeFi App</CustomizedLink>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={walletStatusTitle} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <CustomizedLink href="/transfer">
              <Button color="inherit" variant="outlined">
                Transfer
              </Button>
            </CustomizedLink>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <CustomizedLink href="/">DeFi App</CustomizedLink>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <CustomizedLink href="/transfer">
              <Button color="inherit" variant="outlined" sx={{ mr: 3 }}>
                Transfer
              </Button>
            </CustomizedLink>
            <ListItemText>{walletStatusTitle}</ListItemText>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
