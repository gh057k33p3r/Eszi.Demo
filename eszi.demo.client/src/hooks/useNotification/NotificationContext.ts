import type { AlertColor } from "@mui/material";
import { createContext } from "react";

export interface NotificationContextValues {
  openNotification(
    message: string,
    severity: AlertColor,
    duration?: number,
  ): void;
}

export const NotificationContext = createContext<NotificationContextValues>(
  {} as NotificationContextValues,
);
