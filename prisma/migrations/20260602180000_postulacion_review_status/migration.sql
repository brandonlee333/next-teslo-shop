-- CreateEnum
CREATE TYPE "PostulacionReviewStatus" AS ENUM ('IN_PROGRESS', 'APPROVED', 'DISCARDED');

-- AlterTable
ALTER TABLE "PostulacionApplication" ADD COLUMN "reviewStatus" "PostulacionReviewStatus" NOT NULL DEFAULT 'IN_PROGRESS';
