import { Grid } from "@mui/material";
import TransactionForm from "../components/TransactionForm";

export default function Transfer() {
  return (
    <>
      <Grid item md={6} xs={12} container justifyContent="center">
        <TransactionForm />
      </Grid>
    </>
  );
}
