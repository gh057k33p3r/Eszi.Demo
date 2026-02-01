import { createBrowserRouter } from "react-router";
import App from "../App";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Layout } from "../components/Layout/Layout";
import { AuthenticatedLayout } from "../components/Layout/AuthenticatedLayout";
import { AdminLayout } from "../components/Layout/AdminLayout";
import { Products } from "../components/Products/Products";
import { ProductsAdmin } from "../components/Admin/ProductsAdmin";

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
        element: <AuthenticatedLayout />,
        children: [
          {
            element: <App />,
            path: "/weather-forecasts",
          },
        ],
      },
      {
        element: <Products />,
        path: "/products",
      },
      {
        element: <AdminLayout />,
        children: [
          {
            element: <ProductsAdmin />,
            path: "/admin",
          },
        ],
      },
    ],
  },
]);
