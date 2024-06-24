-- CreateTable
CREATE TABLE "watched_contents" (
    "id" SERIAL NOT NULL,
    "content_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "watched_contents_pkey" PRIMARY KEY ("id")
);
