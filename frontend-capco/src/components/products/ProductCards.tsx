import React from "react";
import { Product } from "../../models/products.model";

type Props = {
  product: Product;
  index: number;
  onSelectProduct: (productId: string) => void;
};

function ProductCards({ product, index, onSelectProduct }: Props) {
  return (
    <div
      key={product._id}
      onClick={() => onSelectProduct(product._id)}
      className={`group relative cursor-pointer col-span-1 hover:scale-105 transition ease-in-out duration:200  ${
        index % 5 === 0 && "sm:col-span-2"
      }`}
    >
      <p className="text-lg font-medium text-gray-700 min-h-[2rem]">
        <span aria-hidden="true" className="absolute inset-0" />
        {product.title.length > 30
          ? product.title.slice(0, 30) + "..."
          : product.title}
      </p>
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <div>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {product.description.length > 60
            ? product.description.slice(0, 60) + "..."
            : product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductCards;
