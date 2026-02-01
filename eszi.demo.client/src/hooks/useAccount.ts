import { jwtDecode } from "jwt-decode";
import type { JwtData } from "../types";
import { getRolesFromJwt } from "../utils";
import { useAccessToken } from "./useAccessToken";

// Ezekben az adatokban nem bízunk meg, csak a megjelenítéshez használjuk
export function useAccount() {
  const { accessToken } = useAccessToken(false);

  const data = accessToken ? jwtDecode<JwtData>(accessToken) : null;
  const roles = getRolesFromJwt(data);
  const isAdmin = roles.includes("Admin");

  return {
    data,
    roles,
    isAdmin,
  };
}
