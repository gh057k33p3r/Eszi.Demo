import { Snackbar, Alert, type AlertColor } from "@mui/material";

interface NotificationLayerProps {
  isOpen: boolean;
  closeNotification(): void;
  message: string;
  severity: AlertColor;
  duration?: number;
}

export function NotificationLayer({
  isOpen,
  duration = 3000,
  closeNotification,
  severity,
  message,
}: NotificationLayerProps) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={closeNotification}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={closeNotification}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
