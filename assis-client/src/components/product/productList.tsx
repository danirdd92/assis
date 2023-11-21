import { useProducts } from "@lib/hooks";
import { ProductCard } from "./productCard";

export const ProductList = () => {
  const products = useProducts();

  if (!products) return <div>loader</div>;

  return (
    <div className="flex flex-row-reverse flex-wrap gap-4 place-items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
