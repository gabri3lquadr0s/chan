-- CreateEnum
CREATE TYPE "Category" AS ENUM ('anime', 'chat', 'sports', 'manga', 'comcis', 'random', 'memes');

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "abreviation" VARCHAR(10) NOT NULL,
    "category" "Category"[],
    "allowsNsfw" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" SERIAL NOT NULL,
    "board" INTEGER NOT NULL,
    "creator" VARCHAR(30) NOT NULL,
    "subject" VARCHAR(50) NOT NULL,
    "comment" VARCHAR(500) NOT NULL,
    "tags" TEXT[],
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSpoiler" BOOLEAN NOT NULL DEFAULT false,
    "isNsfw" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN DEFAULT false,
    "file" BYTEA,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" SERIAL NOT NULL,
    "thread" INTEGER NOT NULL,
    "creator" VARCHAR(30) NOT NULL,
    "comment" VARCHAR(500) NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSpoiler" BOOLEAN NOT NULL DEFAULT false,
    "isNsfw" BOOLEAN NOT NULL DEFAULT false,
    "file" BYTEA,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Board_name_key" ON "Board"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Board_abreviation_key" ON "Board"("abreviation");

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_board_fkey" FOREIGN KEY ("board") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_thread_fkey" FOREIGN KEY ("thread") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
