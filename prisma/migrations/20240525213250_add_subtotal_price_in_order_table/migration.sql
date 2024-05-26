/*
  Warnings:

  - Added the required column `subtotalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "subtotalPrice" DECIMAL(10,2) NOT NULL;
