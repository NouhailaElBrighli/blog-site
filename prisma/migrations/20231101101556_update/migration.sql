/*
  Warnings:

  - You are about to drop the column `snippet` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `title` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "snippet",
ADD COLUMN     "title" TEXT NOT NULL;
