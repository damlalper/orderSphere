-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "producerId" INTEGER;

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
