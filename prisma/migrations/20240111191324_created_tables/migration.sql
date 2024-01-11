-- CreateTable
CREATE TABLE "bet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "amountBet" INTEGER NOT NULL,
    "gameId" INTEGER,
    "participantId" INTEGER,
    "status" VARCHAR(10),
    "amountWon" INTEGER,

    CONSTRAINT "bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "homeTeamName" VARCHAR(255) NOT NULL,
    "awayTeamName" VARCHAR(255) NOT NULL,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bet" ADD CONSTRAINT "bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bet" ADD CONSTRAINT "bet_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
