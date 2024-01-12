import prisma from "@/database/database";
import { BetWithoutIdAndDates, ForUpdateBets } from "@/schemas/bets.schema";


async function create(bet: BetWithoutIdAndDates) {
    const newBet = prisma.bet.create({
        data: bet
    })

    return newBet;
}

async function update(id: number, updateBet: ForUpdateBets) {
    const updatedBets = prisma.bet.update({
        where: {
            id: id
        },
        data: {
            ...updateBet
        }
    })
    return updatedBets;
}

async function getById(gameId: number) {
    const betsByGameId = prisma.bet.findMany({
        where: {
            gameId: gameId
        }
    })
    return betsByGameId;
}

export const betRepository = {
    create,
    update,
    getById
}