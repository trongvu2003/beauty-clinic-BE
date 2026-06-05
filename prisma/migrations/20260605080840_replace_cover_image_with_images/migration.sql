/*
  Warnings:

  - You are about to drop the column `coverImage` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `brands` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "coverImage",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "brands" DROP COLUMN "logoUrl",
ADD COLUMN     "imageUrl" TEXT;
