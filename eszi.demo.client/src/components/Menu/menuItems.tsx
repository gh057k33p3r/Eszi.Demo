import type { MenuItem } from "../../types";
import HomeIcon from "@mui/icons-material/Home";
import AirIcon from "@mui/icons-material/Air";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    url: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Weather Forecasts",
    url: "/weather-forecasts",
    icon: <AirIcon />,
  },
  {
    label: "Product",
    url: "/products",
    icon: <ShoppingCartIcon />,
  },
];

export const adminMenuItems: MenuItem[] = [
  {
    label: "Product Admin",
    url: "/product-admin",
    icon: <AdminPanelSettingsIcon />,
  },
];
