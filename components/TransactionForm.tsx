import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import Clear from "@mui/icons-material/Clear";

import USDC_LOGO from "../public/token-logos/usd-coin-usdc-logo.svg";
import DAI_LOGO from "../public/token-logos/multi-collateral-dai-dai-logo.svg";
import { ethers } from "ethers";
import tokens from "../constants/ethereum";
import { useSelector } from "react-redux";
import { IAppStore } from "../types/store";
import OwnerContractInstance from "../ethereum/owner";
import { IToken } from "../types/tokens";
import { useSnackbar } from "notistack";
import Connect from "../hooks/Connect";

import ERC20ABI from "../ethereum/erc20.abi.json";
import { FormHelperText } from "@mui/material";

const TransactionForm = () => {
  const [tokenSelection, setTokenSelection] = useState<IToken>({
    ...tokens.usdc,
  });
  const [targetWallet, setTargetWallet] = useState("");
  const [targetWalletValidation, setTargetWalletValidation] = useState<
    "success" | "error" | "primary"
  >("primary");
  const [allowance, setAllowance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [amountValidation, setAmountValidation] = useState<
    "success" | "error" | "primary"
  >("primary");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { updateBalances } = Connect();

  const { provider, signer } = useSelector(
    (state: IAppStore) => state.provider
  );

  // @ts-ignore
  const { daiBalance, usdcBalance, walletAddress } = useSelector(
    (state: IAppStore) => state.wallet
  );

  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [transferLoading, setTransferLoading] = useState<boolean>(false);

  const tokenSelectionChangeHanlder = (
    event: React.MouseEvent<HTMLElement>,
    newTokenSelection: "usdc" | "dai"
  ) => {
    setTokenSelection(tokens[newTokenSelection]);
    setAmount("");
  };

  const setTargetWalletHandler = (): void => {
    const isAddress = ethers.utils.isAddress(targetWallet);
    setTargetWalletValidation(isAddress ? "success" : "error");
    if (!isAddress) {
      enqueueSnackbar("Target Wallet is not valid", { variant: "warning" });
    } else {
      closeSnackbar();
    }
  };

  const getAllowance = useCallback(async () => {
    const ownerContract = OwnerContractInstance(signer);
    try {
      const tokenAllowance = await ownerContract.getAllowance(
        tokenSelection.address
      );
      setAllowance(
        (tokenAllowance / Math.pow(10, tokenSelection.decimals)).toString()
      );
    } catch (err) {
      console.log(err);
    }
  }, [signer, tokenSelection.address, tokenSelection.decimals]);

  useEffect(() => {
    if (!provider || !walletAddress) return;
    getAllowance();
  }, [getAllowance, provider, tokenSelection, walletAddress]);

  const approveHandler = async (): Promise<void> => {
    const ownerContract = OwnerContractInstance(signer);
    const tokenContract = new ethers.Contract(
      tokenSelection.address,
      ERC20ABI,
      signer
    );

    try {
      setApproveLoading(true);
      const operatorAddress = await ownerContract.operator();
      let txResponse = await tokenContract.approve(
        operatorAddress,
        ethers.utils.parseUnits(amount, tokenSelection.decimals),
        {
          gasLimit: 100000,
        }
      );
      const txReceipt = await txResponse.wait();
      getAllowance();
      enqueueSnackbar(
        `Approved ${amount} ${tokenSelection.symbol.toUpperCase()}`,
        {
          variant: "success",
          autoHideDuration: 7000,
        }
      );
      console.log("Transaction approved", txReceipt);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(
        `Failed to approve ${amount} ${tokenSelection.symbol.toUpperCase()}`,
        {
          variant: "error",
          autoHideDuration: 7000,
        }
      );
    }
    setApproveLoading(false);
  };

  const transferHandler = async (): Promise<void> => {
    try {
      setTransferLoading(true);
      const tokenBalance: number = +eval(tokenSelection.symbol + "Balance"); // daiBalance || usdcBalance
      if (tokenBalance < +amount) throw new Error("Not enough funds");
      const ownerContract = OwnerContractInstance(signer);
      let txResponse = await ownerContract.transferFrom(
        tokenSelection.address,
        walletAddress,
        targetWallet,
        ethers.utils.parseUnits(amount, tokenSelection.decimals),
        {
          gasLimit: 1000000,
        }
      );
      const txReceipt = await txResponse.wait();
      getAllowance();
      updateBalances();
      enqueueSnackbar(
        `Tranfered ${amount} ${tokenSelection.symbol.toUpperCase()} from ${walletAddress} to ${targetWallet}`,
        {
          variant: "success",
          autoHideDuration: 7000,
        }
      );
      console.log("Transaction approved", txReceipt);
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(
          error.message === "Not enough funds"
            ? error.message
            : `Failed to transfer ${amount} ${tokenSelection.symbol.toUpperCase()} from ${walletAddress} to ${targetWallet}`,
          {
            variant: "error",
          }
        );
      }
    }
    setTransferLoading(false);
  };

  if (!walletAddress) {
    return <>Please connect your wallet</>;
  }

  return (
    <Box component="form" sx={{ minWidth: { xs: 300, md: 400, lg: 500 } }}>
      <Grid container alignItems="center" justifyContent="space-around">
        <Typography variant="h6">
          Transfer {tokenSelection.symbol.toUpperCase()}
        </Typography>
        <ToggleButtonGroup
          size="small"
          value={tokenSelection}
          onChange={tokenSelectionChangeHanlder}
          exclusive
        >
          <ToggleButton
            value="usdc"
            key="usdc"
            disabled={
              tokenSelection.symbol === "usdc" ||
              approveLoading ||
              transferLoading
            }
          >
            <Avatar>
              <Image
                src={USDC_LOGO}
                alt="usdc-logo"
                width={40}
                height={40}
                style={{ backgroundColor: "#FFF" }}
              />
            </Avatar>
          </ToggleButton>
          <ToggleButton
            value="dai"
            key="dai"
            disabled={
              tokenSelection.symbol === "dai" ||
              approveLoading ||
              transferLoading
            }
          >
            <Avatar>
              <Image
                src={DAI_LOGO}
                alt="dai-logo"
                width={40}
                height={40}
                style={{ backgroundColor: "#FFF" }}
              />
            </Avatar>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid container direction="row" justifyContent="center" mt={1}>
        <FormControl
          sx={{ width: { xs: "25ch", md: "35ch" } }}
          variant="outlined"
        >
          <InputLabel htmlFor="wallet-address">Target Wallet</InputLabel>
          <OutlinedInput
            id="wallet-address"
            type="text"
            value={targetWallet}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setTargetWallet(event.target.value);
              setTargetWalletValidation("primary");
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={(): void => {
                    setTargetWallet("");
                    setTargetWalletValidation("primary");
                  }}
                  edge="end"
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            }
            label="Target Wallet"
          />
        </FormControl>
        <Button
          variant="outlined"
          onClick={setTargetWalletHandler}
          color={targetWalletValidation}
        >
          Set
        </Button>
      </Grid>
      <Typography variant="subtitle1" my={2} textAlign="center">
        Allowance: {allowance} {tokenSelection.symbol.toUpperCase()}
      </Typography>
      <Grid container justifyContent="space-evenly" mt={1}>
        <FormControl>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <OutlinedInput
            id="amount"
            type="text"
            label="Amount"
            value={amount}
            color={amountValidation}
            aria-describedby="amount-helper-text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(() => {
                isNaN(Number(event.target.value))
                  ? setAmountValidation("error")
                  : setAmountValidation("primary");
                return event.target.value;
              });
            }}
            endAdornment={
              <InputAdornment position="end">
                {tokenSelection.symbol.toUpperCase()}
              </InputAdornment>
            }
          />
          <FormHelperText id="amount-helper-text">
            Avbl:{" "}
            {`${+eval(
              tokenSelection.symbol + "Balance"
            )} ${tokenSelection.symbol.toUpperCase()}`}
          </FormHelperText>
        </FormControl>
        <Grid item container justifyContent="center" height={56} mt={1} gap={2}>
          <LoadingButton
            variant="outlined"
            onClick={approveHandler}
            loading={approveLoading}
          >
            Approve
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={transferHandler}
            disabled={
              targetWalletValidation !== "success" || +allowance < +amount
            }
            loading={transferLoading}
          >
            Transfer
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionForm;
