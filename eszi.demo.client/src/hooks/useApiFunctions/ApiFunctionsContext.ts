import { createContext } from "react";
import type { ApiFunctionsContext } from "../../utils/apiFunctions";

export const ApiContext = createContext<ApiFunctionsContext>(
  {} as ApiFunctionsContext,
);
