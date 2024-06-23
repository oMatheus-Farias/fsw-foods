"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { useSession } from "next-auth/react";
import { getUserFavoriteRestaurants } from "@/app/_actions/user-favorite-restaurants";

const Restaurants = () => {
  const searchParms = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const session = useSession();
  const userId = session.data?.user.id;
  const [userFavoriteRestaurants, setUserFavoriteRestaurants] = useState<
    UserFavoriteRestaurant[]
  >([]);

  const searchFor = searchParms.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return notFound();

      const foundRestaurants = await searchForRestaurants(searchFor);

      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  useEffect(() => {
    const fetchUserFavoriteRestaurants = async () => {
      if (!userId) return;
      try {
        const response = await getUserFavoriteRestaurants(userId);
        setUserFavoriteRestaurants(response);
      } catch (error) {
        console.error("Error fetching user favorites restaurants", error);
      }
    };

    fetchUserFavoriteRestaurants();
  }, [userId]);

  if (!searchFor) return notFound();

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h1>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              className="min-w-full max-w-full"
              key={restaurant.id}
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
