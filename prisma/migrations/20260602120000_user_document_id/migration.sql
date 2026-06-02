-- AlterTable
ALTER TABLE "User" ADD COLUMN "documentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_documentId_key" ON "User"("documentId");
