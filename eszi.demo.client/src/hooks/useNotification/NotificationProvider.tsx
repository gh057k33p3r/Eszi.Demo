import { useState, type ReactNode } from "react";
import {
  NotificationContext,
  type NotificationContextValues,
} from "./NotificationContext";
import { NotificationLayer } from "./NotificationLayer";
import type { AlertColor } from "@mui/material";

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [message, setMessage] = useState<string>("");
  const [duration, setDuration] = useState<number>(3000);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function openNotification(
    message: string,
    severity: AlertColor,
    duration?: number,
  ) {
    setMessage(message);
    setSeverity(severity);
    if (duration) {
      setDuration(duration);
    }
    setIsOpen(true);
  }

  function closeNotification() {
    setIsOpen(false);
  }

  const value: NotificationContextValues = {
    openNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationLayer
        isOpen={isOpen}
        closeNotification={closeNotification}
        message={message}
        severity={severity}
        duration={duration}
      />
    </NotificationContext.Provider>
  );
}
