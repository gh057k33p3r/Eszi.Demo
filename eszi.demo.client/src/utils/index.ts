import type { JwtData } from "../types";

export function getRolesFromJwt(data: JwtData | null): string[] {
  if (!data) return [];

  const roles =
    data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  try {
    if (Array.isArray(roles)) return roles;
    if (typeof roles === "string") return [roles];

    return [];
  } catch {
    return [];
  }
}
