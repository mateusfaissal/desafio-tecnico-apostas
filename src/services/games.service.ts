import prisma from "@/database/database";
import { invalidOperationError } from "@/errors/invalid-operation-error";
import { notFoundError } from "@/errors/not-found-error";
import { participantRepository } from "@/repositories";
import { betRepository } from "@/repositories/bets.repository";
import { gameRepository } from "@/repositories/games.repository"
import { FinishGame } from "@/schemas";
import { ForCalcBets } from "@/schemas/bets.schema";
import { bet, game } from "@prisma/client";


async function create(homeTeamName: string, awayTeamName: string) {
    const newGame = await gameRepository.create(homeTeamName, awayTeamName);
    return newGame;
}

async function get() {
    const games = await gameRepository.get();
    return games;
}

async function getById(gameId: number) {
    const game = await gameRepository.getById(gameId);

    if (!game) throw notFoundError();
    return game;
}

async function getByIdWithBets(gameId: number) {
    const gameAndBets = await gameRepository.getByIdWithBets(gameId);

    if (!gameAndBets) {
        throw notFoundError();
    }

    return gameAndBets;
}

//ALL VALIDATIONS AND APIs RULES FOR FINISH BETS ENDPOINT BELOW

function hasWon(bet: bet, gameFinished: FinishGame) {
    const hasWonBet = bet.homeTeamScore === gameFinished.homeTeamScore && bet.awayTeamScore === gameFinished.awayTeamScore;
    return hasWonBet;
}

function calcAmount(amountBet: number, calcBets: ForCalcBets) {
    const { betsTotal, wonBetsTotal } = calcBets;

    if (wonBetsTotal === 0) {
        return 0;
    }

    const winningPercentage = amountBet / wonBetsTotal;
    const totalAmountWon = winningPercentage * betsTotal * (1 - 0.3);
    
    return totalAmountWon;

}

/*
Calculates the total value of all bets and the total value of winning bets
based on the provided list of bets and the final result of a game.
*/
function calcBetsTotals(allBets: bet[], gameResult: FinishGame) {
    let betsTotal = 0;
    let wonBetsTotal = 0;

    allBets.forEach((b: bet) => {
        if (hasWon(b, gameResult)) wonBetsTotal += b.amountBet;
        betsTotal += b.amountBet;
    })

    return {
        betsTotal,
        wonBetsTotal
    };
}


/*
Updates bet statuses and participant balances based on a finished game.
Iterates through bets, calculates winnings, and updates the database asynchronously.
*/
async function participantsAndBetsUpdated(allBets: bet[], gameResult: FinishGame, calcBets: ForCalcBets) {
    const betsUpdate = async (bet: bet) => {
        const changeStatus = (wonGame: boolean, amountWon?: number) => {
            if(wonGame) {
                return {
                    status: "WON",
                    amountWon: amountWon,
                };
            } else {
                return {
                    status: "LOST",
                    amountWon: 0
                };
            }
        }
        if(hasWon(bet, gameResult)) {
            const totalWon = Math.floor(calcAmount(bet.amountBet, calcBets))
            const participant = await participantRepository.getById(bet.participantId)
            const updateBet = changeStatus(true, totalWon);

            await betRepository.update(bet.id, updateBet)
            await participantRepository.update(bet.participantId, participant.balance + totalWon)

        } else {
            const updateBet = changeStatus(false);
            await betRepository.update(bet.id, updateBet);
        }
    };

    await Promise.all(allBets.map(betsUpdate));
}

async function finish(id: number, gameResult: FinishGame) {
    const gameExists = await gameRepository.getById(id);
    if (!gameExists) {
        throw notFoundError();
    }
    if (gameExists.isFinished) {
        throw invalidOperationError();
    }

    return await prisma.$transaction(async () => {
        const updateScore = await gameRepository.finishGame(id, gameResult.homeTeamScore, gameResult.awayTeamScore);

        const allBets = await betRepository.getById(id);

        const finalResult = calcBetsTotals(allBets, gameResult)
        const { betsTotal, wonBetsTotal } = finalResult;

        const calcBets: ForCalcBets = {betsTotal, wonBetsTotal}

        await participantsAndBetsUpdated(allBets, gameResult, calcBets);

        return updateScore;
    })
}





export const gameService = {
    create,
    get,
    getById,
    getByIdWithBets,
    finish
}

