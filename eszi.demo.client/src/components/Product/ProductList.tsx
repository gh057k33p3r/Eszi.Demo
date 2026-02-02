import type { ProductDto } from "../../types";

interface ProductListProps {
  products: ProductDto[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <>
      {products.length > 0 ? (
        <ul>
          {products.map((p) => {
            return <li key={p.id}>{p.name}</li>;
          })}
        </ul>
      ) : (
        "Nincsenek termékek!"
      )}
    </>
  );
}
