import { Outlet } from "react-router";
import { useAccessToken } from "../../hooks/useAccessToken";
import { LoginForm } from "../LoginForm/LoginForm";

export function AuthenticatedLayout() {
  const { accessToken } = useAccessToken();

  return <>{accessToken ? <Outlet /> : <LoginForm />}</>;
}
