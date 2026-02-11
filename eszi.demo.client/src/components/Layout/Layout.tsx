import { Outlet } from "react-router";
import { Menu } from "../Menu/Menu";
import { useAccessToken } from "../../hooks/useAccessToken";
import { LoginForm } from "../LoginForm/LoginForm";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { UserInfo } from "./UserInfo";
import "./Layout.css";
import { useState } from "react";
import CustomAppBar from "./CustomAppBar";
import CustomDrawer from "./CustomDrawer";

export function Layout() {
  const { accessToken, isLoading } = useAccessToken();

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 3 }}>
              <Menu />
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              <UserInfo />
              {!accessToken ? <LoginForm /> : <LogoutButton />}
            </div>
          </div>
          <Outlet />
        </>
      ) : (
        "Betöltés..."
      )}
    </>
  );
}
