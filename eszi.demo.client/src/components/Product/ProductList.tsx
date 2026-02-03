import type { ProductDto } from "../../types";

interface ProductListProps {
  products: ProductDto[];
  renderItem?: (product: ProductDto) => React.ReactNode;
}

export function ProductList({ products, renderItem }: ProductListProps) {
  return (
    <>
      {products.length > 0 ? (
        <ul>
          {products.map((p) => {
            return <>{renderItem?.(p) ?? <li key={p.id}>{p.name}</li>}</>;
          })}
        </ul>
      ) : (
        "Nincsenek termékek!"
      )}
    </>
  );
}
