import type { ReactNode } from "react";

export interface MenuItem {
  label: string;
  url: string;
  icon: ReactNode;
}

export interface JwtData {
  firstName: string;
  lastName: string;
  ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]?:
    | string
    | string[]; // ? azt jelenti, hogy lehet undefined
}

export interface ProductDto {
  id: number;
  name: string;
  description?: string | null;
  price: number;
}
