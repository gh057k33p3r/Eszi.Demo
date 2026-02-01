import { useRestApi } from "../../hooks/useRestApi";
import type { Product } from "../../types";
import { ProductForm } from "../Products/ProductForm";
import { ProductList } from "../Products/ProductList";

export function ProductsAdmin() {
  const { items, reloadItems, createAsync, removeAsync } =
    useRestApi<Product>("product");

  return (
    <div>
      <ProductForm
        onSubmit={async (product, reset) => {
          await createAsync(product);
          reset();
        }}
      />
      <ProductList
        products={items ?? []}
        renderItem={(p) => (
          <li key={p.id}>
            {p.name}{" "}
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={async () => {
                await removeAsync(p.id);
                reloadItems();
              }}
            >
              Törlés
            </span>
          </li>
        )}
      />
    </div>
  );
}
