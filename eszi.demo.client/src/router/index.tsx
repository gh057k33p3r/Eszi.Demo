import { createBrowserRouter } from "react-router";
import App from "../App";
import { LoginForm } from "../components/LoginForm/LoginForm";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <LoginForm />,
    path: "/login",
  },
]);
