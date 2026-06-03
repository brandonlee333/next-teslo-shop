-- AlterTable
ALTER TABLE "PostulacionApplication" ADD COLUMN "rejectionReason" TEXT,
ADD COLUMN "rejectionImageUrl" TEXT,
ADD COLUMN "rejectionImageName" TEXT,
ADD COLUMN "rejectionImageFormat" TEXT,
ADD COLUMN "rejectionImageSize" INTEGER,
ADD COLUMN "rejectedAt" TIMESTAMP(3);
