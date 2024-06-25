/*
  Warnings:

  - Added the required column `quizId` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "quizId" INTEGER NOT NULL;
