import { useRestApi } from "../../hooks/useRestApi";
import type { ProductDto } from "../../types";
import { ProductList } from "./ProductList";

export function Products() {
  const { items } = useRestApi<ProductDto>("/product");

  // props = kívülről tud adatot kapni a komponens
  return <ProductList products={items ?? []} />;
}
