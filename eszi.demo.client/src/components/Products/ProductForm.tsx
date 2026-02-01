import { useState } from "react";
import type { Product } from "../../types";

interface ProductFormProps {
  onSubmit: (product: Product, reset: () => void) => void;
  submitLabel?: string | null;
}

export function ProductForm({ onSubmit, submitLabel }: ProductFormProps) {
  const defaultValue: Product = {
    id: 0,
    name: "",
    price: 0,
    description: "",
  };

  const [product, setProduct] = useState<Product>(defaultValue);

  const reset = () => {
    setProduct(defaultValue);
  };

  const onChange =
    (key: keyof Product) =>
    (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setProduct((prev) => {
        return {
          ...prev,
          [key]: event.target.value,
        };
      });
    };

  return (
    <>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Megnevezés"
          value={product.name}
          onChange={onChange("name")}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Leírás"
          value={product.description ?? ""}
          onChange={onChange("description")}
        />
      </div>
      <div>
        <input
          type="text"
          name="price"
          placeholder="Ár"
          value={product.price}
          onChange={onChange("price")}
        />
      </div>
      <div>
        <input
          type="button"
          value={submitLabel ?? "Küldés"}
          onClick={() => {
            onSubmit(product, reset);
          }}
        />
      </div>
    </>
  );
}
