-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);
