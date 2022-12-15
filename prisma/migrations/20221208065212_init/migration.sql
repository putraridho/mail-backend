-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mail" (
    "id" TEXT NOT NULL,
    "subject" TEXT,
    "attachment" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentMail" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mailId" TEXT NOT NULL,

    CONSTRAINT "SentMail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MailToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SentMail_mailId_key" ON "SentMail"("mailId");

-- CreateIndex
CREATE UNIQUE INDEX "_MailToUser_AB_unique" ON "_MailToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MailToUser_B_index" ON "_MailToUser"("B");

-- AddForeignKey
ALTER TABLE "SentMail" ADD CONSTRAINT "SentMail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentMail" ADD CONSTRAINT "SentMail_mailId_fkey" FOREIGN KEY ("mailId") REFERENCES "Mail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MailToUser" ADD CONSTRAINT "_MailToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Mail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MailToUser" ADD CONSTRAINT "_MailToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
