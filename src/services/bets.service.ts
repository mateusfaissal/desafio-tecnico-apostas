import prisma from "@/database/database";
import { balanceError } from "@/errors/balance-error";
import { belowMinimumBetError } from "@/errors/below-minimum-bet-error";
import { invalidOperationError } from "@/errors/invalid-operation-error";
import { notFoundError } from "@/errors/not-found-error";
import { gameRepository, participantRepository } from "@/repositories";
import { betRepository } from "@/repositories/bets.repository";
import { BetReqInput } from "@/schemas/bets.schema";
import { game, participant } from "@prisma/client";


//all API bets business rules validations
async function validateParticipantAndBet(bet: BetReqInput) {
    const participant = await getParticipantByIdOrThrow(bet.participantId);
    const game = await getGameByIdOrThrow(bet.gameId);

    validateIsFinished(game);
    validateBetAmount(bet.amountBet, participant.balance);

    return participant;
}

async function getParticipantByIdOrThrow(participantId: number) {
    const participant = await participantRepository.getById(participantId);

    if (!participant) {
        throw notFoundError();
    }
    return participant;
}

async function getGameByIdOrThrow(gameId: number) {
    const game = await gameRepository.getById(gameId);

    if (!game) {
        throw notFoundError();
    }
    return game;
}

function validateIsFinished(game: game) {
    if (game.isFinished) {
        throw invalidOperationError();
    }
}

function validateBetAmount(betAmount: number, balance: number) {
    const minimumAmount = 1000;

    if (betAmount > balance) {
        throw balanceError();
    }

    if (betAmount < minimumAmount) {
        throw belowMinimumBetError();
    }
}

async function updateBalance(participant: participant, betAmount: number) {
    const newBalance = await participantRepository.update(participant.id, participant.balance - betAmount);
    return newBalance;
}

//function to actually create a bet and update the amount of the participant

async function create(bet: BetReqInput) {
    const participant = await validateParticipantAndBet(bet);

    const transaction = await prisma.$transaction(async () => {

        const newBet = await betRepository.create({
            ...bet,
            status: "PENDING",
            amountWon: null,
        });

        await updateBalance(participant, newBet.amountBet);
        return newBet;
    })

    return transaction;
}

export const betService = {
    create
};

