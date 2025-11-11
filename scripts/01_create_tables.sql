-- Create Books table
CREATE TABLE IF NOT EXISTS "Book" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "isbn" TEXT NOT NULL UNIQUE,
  "category" TEXT NOT NULL,
  "publisher" TEXT NOT NULL,
  "publishedYear" INTEGER NOT NULL,
  "availableCopies" INTEGER NOT NULL,
  "totalCopies" INTEGER NOT NULL,
  "location" TEXT NOT NULL,
  "description" TEXT,
  "coverImage" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Users table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT NOT NULL,
  "userType" TEXT NOT NULL,
  "department" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Activo',
  "memberSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Loans table
CREATE TABLE IF NOT EXISTS "Loan" (
  "id" TEXT PRIMARY KEY,
  "bookId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "dueDate" TIMESTAMP(3) NOT NULL,
  "returnDate" TIMESTAMP(3),
  "status" TEXT NOT NULL DEFAULT 'Activo',
  "renewalCount" INTEGER NOT NULL DEFAULT 0,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Loan_bookId_idx" ON "Loan"("bookId");
CREATE INDEX IF NOT EXISTS "Loan_userId_idx" ON "Loan"("userId");
CREATE INDEX IF NOT EXISTS "Loan_status_idx" ON "Loan"("status");
