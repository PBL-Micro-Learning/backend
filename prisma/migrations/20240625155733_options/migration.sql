/*
  Warnings:

  - Changed the type of `content` on the `answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "content",
ADD COLUMN     "content" "AnswerOptions" NOT NULL;

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "mark" "AnswerOptions" NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);
