-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY[]::"Role"[];
