export interface MenuItem {
  label: string;
  url: string;
}

export interface JwtData {
  firstName: string;
  lastName: string;
  ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]?:
    | string
    | string[]; // amikor csak 1 van akkor sima string, amikor több akkor string[]
}
