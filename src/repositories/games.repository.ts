import prisma from "@/database/database";

async function create (homeTeamName: string, awayTeamName: string) {
    const newGame = prisma.game.create({
        data: {
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName
        }
    })
    return newGame;
}

async function get() {
    const games = prisma.game.findMany();
    return games;
}

async function getById(gameId: number) {
    const game = prisma.game.findUnique({
        where: {
            id: gameId
        }
    });
    return game;
}

export const gameRepository = {
    create,
    get,
    getById
};