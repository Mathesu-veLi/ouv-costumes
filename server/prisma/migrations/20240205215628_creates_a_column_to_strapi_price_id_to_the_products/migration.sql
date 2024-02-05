/*
  Warnings:

  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[priceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "created_at",
ADD COLUMN     "priceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_priceId_key" ON "Product"("priceId");
