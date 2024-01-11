import { notFoundError } from "@/errors/not-found-error";
import { gameRepository } from "@/repositories/games.repository"


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

export const gameService = {
    create,
    get,
    getById
}