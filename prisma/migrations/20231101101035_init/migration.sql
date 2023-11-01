-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "snippet" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
