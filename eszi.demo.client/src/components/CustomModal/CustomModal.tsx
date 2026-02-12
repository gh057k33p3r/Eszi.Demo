import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CustomModalProps {
  isOpen: boolean;
  handleClose(result: boolean): void;
  label: string;
}

export default function CustomModal({
  isOpen,
  handleClose,
  label,
}: CustomModalProps) {
  return (
    <div>
      <Modal open={isOpen} onClose={() => handleClose(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {label}
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => handleClose(true)}
              variant="contained"
              fullWidth
            >
              Igen
            </Button>
            <Button
              onClick={() => handleClose(false)}
              variant="outlined"
              fullWidth
            >
              Nem
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
