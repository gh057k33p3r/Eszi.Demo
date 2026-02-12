import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomAvatarMenu } from "./CustomAvatarMenu";

interface CustomAppBarProps {
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function CustomAppBar({ toggleDrawer }: CustomAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ESZI Demo
          </Typography>
          <CustomAvatarMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
