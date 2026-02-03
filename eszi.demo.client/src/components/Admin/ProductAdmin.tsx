import { useRestApi } from "../../hooks/useRestApi";
import type { ProductDto } from "../../types";
import { ProductForm } from "../Product/ProductForm";
import { ProductList } from "../Product/ProductList";

export function ProductAdmin() {
  const { items, refetchItems, createAsync, deleteAsync } =
    useRestApi<ProductDto>("/product");

  return (
    <>
      <ProductForm
        onSubmit={async (product, reset) => {
          await createAsync(product);
          reset();
          await refetchItems();
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
                await deleteAsync(p.id);
                await refetchItems();
              }}
            >
              Törlés
            </span>
          </li>
        )}
      />
    </>
  );
}
