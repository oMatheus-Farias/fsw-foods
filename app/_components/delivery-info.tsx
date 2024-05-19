import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card, CardContent } from "./ui/card";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="mt-6">
        <CardContent className="flex justify-around py-2">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Entrega</span>
              <TimerIcon size={14} />
            </div>

            <p className="text-xs font-semibold">
              {restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DeliveryInfo;
