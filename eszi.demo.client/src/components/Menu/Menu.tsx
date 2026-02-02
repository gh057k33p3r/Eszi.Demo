import { useNavigate } from "react-router";
import { adminMenuItems, menuItems } from "./menuItems";
import type { MenuItem } from "../../types";
import { useAccount } from "../../hooks/useAccount";

export function Menu() {
  const navigate = useNavigate();

  const { isAdmin } = useAccount();

  const mapMenuItems = (mi: MenuItem, index: number) => {
    return (
      <div
        key={index}
        style={{ cursor: "pointer", border: "1px solid black" }}
        onClick={() => {
          navigate(mi.url);
        }}
      >
        {mi.label}
      </div>
    );
  };

  return (
    <>
      {menuItems.map(mapMenuItems)}
      {isAdmin ? adminMenuItems.map(mapMenuItems) : null}
    </>
  );
}
