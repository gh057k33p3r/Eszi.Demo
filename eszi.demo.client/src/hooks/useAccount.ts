import { jwtDecode } from "jwt-decode";
import { useAccessToken } from "./useAccessToken";
import type { JwtData } from "../types";
import { getRolesFromJwt } from "../utils";

export function useAccount() {
  // Mindig a friss token lesz, anélkül, hogy újrahívnám a cookietokent
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
