-- CreateTable
CREATE TABLE "public"."ChatRecord" (
    "id" TEXT NOT NULL,
    "userInput" TEXT NOT NULL,
    "aiJson" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatRecord_pkey" PRIMARY KEY ("id")
);
