/*
  Warnings:

  - Added the required column `birthday` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;
