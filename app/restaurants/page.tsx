import { Suspense } from "react";
import Restaurants from "./_components/restaurant";

const RestaurantPage = () => {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
};

export default RestaurantPage;
