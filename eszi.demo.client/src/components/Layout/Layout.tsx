import { Outlet } from "react-router";
import { useAccessToken } from "../../hooks/useAccessToken";
import "./Layout.css";
import { useState } from "react";
import CustomAppBar from "./CustomAppBar";
import CustomDrawer from "./CustomDrawer";
import { Paper } from "@mui/material";

export function Layout() {
  const { isLoading } = useAccessToken();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <CustomAppBar toggleDrawer={toggleDrawer} />
          <CustomDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
          <Paper className="content-box">
            <Outlet />
          </Paper>
        </>
      ) : (
        "Betöltés..."
      )}
    </>
  );
}
