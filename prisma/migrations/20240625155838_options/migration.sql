/*
  Warnings:

  - You are about to drop the column `questionId` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `questions` table. All the data in the column will be lost.
  - Added the required column `question_id` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_id` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_id` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "questionId",
ADD COLUMN     "question_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "options" DROP COLUMN "questionId",
ADD COLUMN     "question_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "quizId",
ADD COLUMN     "quiz_id" INTEGER NOT NULL;
