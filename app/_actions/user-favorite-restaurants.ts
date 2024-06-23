"use server";

import { db } from "../_lib/prisma";

export const getUserFavoriteRestaurants = async (userId: string) => {
  return await db.userFavoriteRestaurant.findMany({
    where: { userId },
  });
};
