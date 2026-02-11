import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { MenuItem } from "../../types";

interface CustomMenuItemProps {
  menuItem: MenuItem;
}

export function CustomMenuItem({ menuItem }: CustomMenuItemProps) {
  const { icon, label } = menuItem;

  return (
    <ListItem key={label} disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
