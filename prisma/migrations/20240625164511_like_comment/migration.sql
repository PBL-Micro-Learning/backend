/*
  Warnings:

  - You are about to drop the column `lesson_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `lesson_id` on the `likes` table. All the data in the column will be lost.
  - Added the required column `content_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "lesson_id",
ADD COLUMN     "content_id" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "lesson_id",
ADD COLUMN     "content_id" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
