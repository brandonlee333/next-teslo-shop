-- CreateTable
CREATE TABLE "PostulacionComment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "PostulacionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostulacionCommentAttachment" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "PostulacionCommentAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostulacionComment_applicationId_createdAt_idx" ON "PostulacionComment"("applicationId", "createdAt");

-- CreateIndex
CREATE INDEX "PostulacionCommentAttachment_commentId_idx" ON "PostulacionCommentAttachment"("commentId");

-- AddForeignKey
ALTER TABLE "PostulacionComment" ADD CONSTRAINT "PostulacionComment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PostulacionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostulacionCommentAttachment" ADD CONSTRAINT "PostulacionCommentAttachment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PostulacionComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
