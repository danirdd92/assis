import { Product } from "@lib/types";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="card w-[300px] h-[300px] bg-base-100 shadow-xl">
      <figure className="h-[40%]">
        <img
          className="bg-cover w-full aspect-auto"
          src={`images/${product.image}`}
          alt={product.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
