import React from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import NoSsr from "@mui/base/NoSsr";
import Connect from "../hooks/Connect";
import USDC_LOGO from "../public/token-logos/usd-coin-usdc-logo.svg";
import DAI_LOGO from "../public/token-logos/multi-collateral-dai-dai-logo.svg";

import { useSelector } from "react-redux";
import { IAppStore } from "../types/store";
import Portal from "./layout/Portal";

interface IWalletRow {
  balance: string;
  imageSrc: any;
  altText: string;
  primaryText: string;
  secondaryText: string;
}

const WalletData = () => {
  const { isLoading } = Connect();
  const { usdcBalance, daiBalance, walletAddress } = useSelector(
    (state: IAppStore) => state.wallet
  );
  const walletRows: IWalletRow[] = [
    {
      balance: usdcBalance,
      imageSrc: USDC_LOGO,
      altText: "usdc-logo",
      primaryText: "USDC",
      secondaryText: "USD Coin",
    },
    {
      balance: daiBalance,
      imageSrc: DAI_LOGO,
      altText: "dai-logo",
      primaryText: "DAI",
      secondaryText: "Dai",
    },
  ];

  if (!walletAddress && !isLoading) {
    return <>Please connect your wallet</>;
  }

  return (
    <>
      <NoSsr>
        <Portal isLoading={isLoading} />
      </NoSsr>
      <Grid item sx={{ minWidth: { xs: 300, md: 400 } }}>
        <List
          subheader={
            <ListSubheader>
              <Typography variant="h6">Your balances</Typography>
            </ListSubheader>
          }
        >
          {walletRows.map((walletRow: IWalletRow, i: number) => {
            return (
              <div key={i}>
                <ListItem secondaryAction={walletRow.balance}>
                  <ListItemAvatar>
                    <Avatar>
                      <Image
                        src={walletRow.imageSrc}
                        alt={walletRow.altText}
                        width={40}
                        height={40}
                        style={{ backgroundColor: "#FFF" }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={walletRow.primaryText}
                    secondary={walletRow.secondaryText}
                  />
                </ListItem>
                {i !== walletRows.length - 1 && <Divider />}
              </div>
            );
          })}
        </List>
      </Grid>
    </>
  );
};

export default WalletData;
