"use client";

import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useState } from "react";
import ProductList from "@/app/_components/product-list";
import DeliveryInfo from "@/app/_components/delivery-info";
import { CartContext } from "@/app/_contexts/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          imageUrl: true;
          name: true;
        };
      };
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addProductToCart, products } = useContext(CartContext);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantityClick = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, quantity, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        <div className="flex items-center gap-[0.375rem] px-5">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            height={0}
            width={0}
            sizes="100%"
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <div className="px-5">
          <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>
        </div>

        <div className="flex justify-between px-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>

              {product.discountPercentage > 0 && (
                <DiscountBadge
                  discountPercentage={product.discountPercentage}
                />
              )}
            </div>

            {product.discountPercentage > 0 && (
              <span className="block text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mt-6 px-5">
          <h3 className="mb-3 font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 px-5 font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-6 px-5">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <div className="h-full py-5">
            {products.length > 0 ? (
              <Cart setIsOpen={setIsCartOpen} />
            ) : (
              <p className="text-center text-muted-foreground">
                Sua sacola está vazia
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem produtos de outro restaurante na sacola. Deseja limpar a
              sacola e adicionar este produto?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
