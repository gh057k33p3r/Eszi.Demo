import type { ReactNode } from "react";
import { ApiContext } from "./ApiFunctionsContext";
import { apiFunctions } from "../../utils/apiFunctions";

interface ApiContextProviderProps {
  children: ReactNode;
}

export function ApiContextProvider({ children }: ApiContextProviderProps) {
  return (
    <ApiContext.Provider value={apiFunctions}>{children}</ApiContext.Provider>
  );
}
