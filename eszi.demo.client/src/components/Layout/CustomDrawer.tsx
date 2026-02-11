import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { CustomMenuItem } from "../Menu/CustomMenuItem";
import { adminMenuItems, menuItems } from "../Menu/menuItems";
import { useAccount } from "../../hooks/useAccount";

interface CustomDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function CustomDrawer({
  open,
  toggleDrawer,
}: CustomDrawerProps) {
  const { isAdmin } = useAccount();

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item) => (
            <CustomMenuItem key={item.label} menuItem={item} />
          ))}
        </List>
        {isAdmin ? (
          <>
            <Divider />
            <List>
              {adminMenuItems.map((item) => (
                <CustomMenuItem key={item.label} menuItem={item} />
              ))}
            </List>
          </>
        ) : null}
      </Box>
    </Drawer>
  );
}
