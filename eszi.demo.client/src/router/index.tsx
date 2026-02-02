import { createBrowserRouter } from "react-router";
import App from "../App";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Layout } from "../components/Layout/Layout";
import { AuthenticatedLayout } from "../components/Layout/AuthenticatedLayout";
import { AdminLayout } from "../components/Layout/AdminLayout";
import { Products } from "../components/Product/Products";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <div>Home</div>,
        path: "/",
      },
      {
        element: <LoginForm />,
        path: "/login",
      },
      {
        element: <Products />,
        path: "/products",
      },
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            element: <App />,
            path: "/weather-forecasts",
          },
        ],
      },
      {
        element: <AdminLayout />,
        children: [
          {
            element: <div>Product admin</div>,
            path: "/product-admin",
          },
        ],
      },
    ],
  },
]);
