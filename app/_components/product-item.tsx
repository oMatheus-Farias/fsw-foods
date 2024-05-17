import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDown } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          imageUrl: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="min-w-36 max-w-36 space-y-2">
      <div className="relative max-h-36 min-h-36 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={0}
          width={0}
          fill
          sizes="100%"
          className="rounded-lg object-cover shadow-md"
        />

        {product.discountPercentage > 0 && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDown size={12} />
            <span className="text-xs font-semibold">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      <div>
        <h2 className="truncate text-sm" title={product.name}>
          {product.name}
        </h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-2"
          title={product.restaurant.name}
        >
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            height={0}
            width={0}
            sizes="100%"
            className="h-7 w-7 rounded-full object-cover"
          />

          <span className="block truncate text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
