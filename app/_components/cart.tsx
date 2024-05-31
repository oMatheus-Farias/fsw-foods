/* eslint-disable no-unused-vars */
"use client";

import { useContext, useState } from "react";
import { CartContext } from "../_contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const { data } = useSession();
  const router = useRouter();

  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products?.[0].restaurant;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        subtotalPrice: Number(subtotalPrice),
        totalPrice: Number(totalPrice),
        totalDiscounts: Number(totalDiscounts),
        deliveryFee: Number(restaurant.deliveryFee),
        deliveryTimeMinutes: Number(restaurant.deliveryTimeMinutes),
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: {
            id: data?.user?.id,
          },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
      setIsOpen(false);

      toast("Pedido finalizado com sucesso!", {
        description: "Acompanhe o status na aba de pedidos.",
        action: {
          label: "Ver pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        <div className="flex-auto space-y-4">
          {products.map((product) => (
            <CartItem key={product.id} cartProduct={product} />
          ))}
        </div>

        <div className="mt-6">
          <Card>
            <CardContent className="space-y-2 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Descontos</span>
                <span>- {formatCurrency(totalDiscounts)}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Entrega</span>

                {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  formatCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button
          className="mt-6 w-full"
          onClick={() => setIsConfirmDialogOpen(true)}
          disabled={isSubmitLoading}
        >
          {isSubmitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Finalizar Pedido
        </Button>
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              O pedido será enviado para o restaurante e você poderá acompanhar
              o status na aba de pedidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              className="h-10 rounded-md bg-primary text-white"
            >
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
