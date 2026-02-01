import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import type { JwtData } from "../types";
import { getRolesFromJwt } from "../utils";

// Ezekben az adatokban nem bízunk meg, csak a megjelenítéshez használjuk
export function useAccount() {
  const { data: accessToken } = useQuery<string | null>({
    queryKey: ["cookietoken"],
  });

  console.log(accessToken);

  const data = accessToken ? jwtDecode<JwtData>(accessToken) : null;
  const roles = getRolesFromJwt(data);
  const isAdmin = roles.includes("Admin");

  return {
    data,
    roles,
    isAdmin,
  };
}
