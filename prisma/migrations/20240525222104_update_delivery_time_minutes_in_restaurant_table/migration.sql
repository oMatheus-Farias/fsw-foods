/*
  Warnings:

  - You are about to drop the column `deliveryTimeMinutesMinutes` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "deliveryTimeMinutesMinutes",
ADD COLUMN     "deliveryTimeMinutes" INTEGER;
