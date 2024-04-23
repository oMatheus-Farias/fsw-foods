/*
  Warnings:

  - You are about to drop the column `deliveryFree` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `deliveryFee` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "deliveryFree",
ADD COLUMN     "deliveryFee" DECIMAL(10,2) NOT NULL;
