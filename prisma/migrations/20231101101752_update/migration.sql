/*
  Warnings:

  - Added the required column `snippet` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "snippet" TEXT NOT NULL;
