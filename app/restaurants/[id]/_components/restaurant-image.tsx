"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "imageUrl" | "name">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[15.62rem] w-full">
      <Image
        src={restaurant?.imageUrl}
        alt={restaurant?.name}
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

      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-muted-foreground"
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
