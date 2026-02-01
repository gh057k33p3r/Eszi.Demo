import { useRestApi } from "../../hooks/useRestApi";
import type { Product } from "../../types";
import { ProductList } from "./ProductList";

export function Products() {
  const { items } = useRestApi<Product>("product");

  return <ProductList products={items ?? []} />;
}
