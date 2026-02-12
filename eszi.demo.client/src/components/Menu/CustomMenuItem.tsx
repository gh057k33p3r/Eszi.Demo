import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { MenuItem } from "../../types";
import { useNavigate } from "react-router";

interface CustomMenuItemProps {
  menuItem: MenuItem;
}

export function CustomMenuItem({ menuItem }: CustomMenuItemProps) {
  const { icon, label } = menuItem;
  const navigate = useNavigate();

  return (
    <ListItem
      key={label}
      disablePadding
      onClick={() => {
        navigate(menuItem.url);
      }}
    >
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
