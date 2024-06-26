/*
  Warnings:

  - You are about to drop the column `content` on the `answers` table. All the data in the column will be lost.
  - Added the required column `mark` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "content",
ADD COLUMN     "mark" "AnswerOptions" NOT NULL;
