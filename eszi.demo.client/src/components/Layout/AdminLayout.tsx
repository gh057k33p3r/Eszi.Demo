import { Outlet } from "react-router";
import { useAccount } from "../../hooks/useAccount";

export function AdminLayout() {
  const { isAdmin } = useAccount();

  return <>{isAdmin ? <Outlet /> : "Nincs megfelelő jogosultsága!"}</>;
}
