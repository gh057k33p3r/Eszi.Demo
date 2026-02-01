import { useNavigate } from "react-router";
import { adminMenuItems, menuItems } from "./menuItems";
import { useAccount } from "../../hooks/useAccount";
import type { MenuItem } from "../../types";

export function Menu() {
  const navigate = useNavigate();

  const { isAdmin } = useAccount();

  const mapMenuItems = (mi: MenuItem, index: number) => (
    <div
      key={index}
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(mi.url);
      }}
    >
      {mi.label}
    </div>
  );

  return (
    <>
      {menuItems.map(mapMenuItems)}
      {isAdmin ? adminMenuItems.map(mapMenuItems) : null}
    </>
  );
}
