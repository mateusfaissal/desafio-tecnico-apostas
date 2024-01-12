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

async function getByIdWithBets(gameId: number) {
    const gameAndBets = prisma.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            bet: true
        }
    })
    return gameAndBets;
}

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
    const updateGame = prisma.game.update({
        where: {
            id
        },
        data: {
            isFinished: true,
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore
        }
    })
    return updateGame;
}



export const gameRepository = {
    create,
    get,
    getById,
    getByIdWithBets,
    finishGame,
};