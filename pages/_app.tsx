import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import { SnackbarProvider } from "notistack";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={4000} preventDuplicate>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
