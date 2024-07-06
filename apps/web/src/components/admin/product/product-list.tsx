import type { Product } from "@/types";

import ProductCard from "./product-card";

const ProductList = ({ title, data }: { title: string; data: Product[] }) => {
  return (
    <>
      <h2 className="h2-bold">{title}</h2>

      {data.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-3">
          {data.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No product found</p>
        </div>
      )}
    </>
  );
};

export default ProductList;
