import { axiosInstance } from "../axios";
import type { LoginRequest } from "../types";

export interface ApiFunctionsContext {
  login(values: LoginRequest): Promise<void>;
}

async function login(values: LoginRequest) {
  await axiosInstance.post("/auth/login", values).then((resp) => resp.data);
}

export const apiFunctions: ApiFunctionsContext = { login };
