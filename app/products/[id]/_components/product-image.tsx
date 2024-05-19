"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";

interface ProductImageProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[22.5rem] w-full">
      <Image
        src={product?.imageUrl}
        alt={product?.name}
        height={0}
        width={0}
        fill
        sizes="100%"
        className="object-cover"
        priority
      />

      <Button
        onClick={handleBackClick}
        className="absolute left-4 top-4 rounded-full bg-slate-100 text-foreground hover:text-white"
        size="icon"
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
