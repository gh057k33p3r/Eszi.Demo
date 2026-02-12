import { useContext } from "react";
import { ApiContext } from "./ApiFunctionsContext";

export function useApiFunctions() {
  const context = useContext(ApiContext);
  return context;
}
