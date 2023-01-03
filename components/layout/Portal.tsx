import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const style: any = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PortalProps {
  isLoading?: boolean;
}

const Portal = (props: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(!!props.isLoading);
  }, [props.isLoading]);

  return mounted && ref.current ? (
    createPortal(
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
        open={mounted}
      >
        <CircularProgress color="inherit" />
      </Backdrop>,
      ref.current
    )
  ) : (
    <></>
  );
};

export default Portal;
