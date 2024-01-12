import prisma from "@/database/database";
import { BetWithoutIdAndDates } from "@/schemas/bets.schema";

async function create(bet: BetWithoutIdAndDates) {
    const newBet = prisma.bet.create({
        data: bet
    })

    return newBet;
}

export const betRepository = {
    create
}