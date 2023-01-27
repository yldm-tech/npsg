/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Chat";

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);
