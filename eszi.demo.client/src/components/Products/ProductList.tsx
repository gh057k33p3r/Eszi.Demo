import type { Product } from "../../types";

interface ProductListProps {
  products: Product[];
  renderItem?: (product: Product) => React.ReactNode;
}

export function ProductList({ products, renderItem }: ProductListProps) {
  return (
    <>
      {(products ?? []).length > 0 ? (
        <ul>
          {products?.map((p) => (
            <>{renderItem?.(p) ?? <li key={p.id}>{p.name}</li>} </>
          ))}
        </ul>
      ) : (
        "Nincsenek elemek!"
      )}
    </>
  );
}
