-- CreateTable
CREATE TABLE "PostulacionApplication" (
    "id" TEXT NOT NULL,
    "occupantCount" INTEGER,
    "occupantAges" TEXT,
    "titularNames" TEXT,
    "titularEmails" TEXT,
    "currentResidence" TEXT,
    "previousRent" TEXT,
    "moveReason" TEXT,
    "pets" TEXT,
    "vehicleParking" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostulacionApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostulacionDocument" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "PostulacionDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostulacionApplication_userId_key" ON "PostulacionApplication"("userId");

-- CreateIndex
CREATE INDEX "PostulacionDocument_applicationId_category_idx" ON "PostulacionDocument"("applicationId", "category");

-- AddForeignKey
ALTER TABLE "PostulacionApplication" ADD CONSTRAINT "PostulacionApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostulacionDocument" ADD CONSTRAINT "PostulacionDocument_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PostulacionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
