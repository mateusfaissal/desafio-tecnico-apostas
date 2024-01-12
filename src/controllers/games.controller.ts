import { invalidIdError } from '@/errors/invalid-id-error';
import { FinishGame } from '@/schemas';
import { gameService } from '@/services/games.service';
import { game } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function create(req: Request, res: Response) {
    const { homeTeamName, awayTeamName } = req.body as Omit<game, 'id' | 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished' >

    const newGame = await gameService.create(homeTeamName, awayTeamName);
    res.status(httpStatus.CREATED).send(newGame);
}

async function get(req: Request, res: Response) {
    const games = await gameService.get();
    res.status(httpStatus.OK).send(games);
}

async function getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id || isNaN(id) || id < 1) {
        throw invalidIdError();
    } 

    const game = await gameService.getById(id);
    res.status(httpStatus.OK).send(game);
}

async function getByIdWithBets(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id || isNaN(id) || id < 1) {
        throw invalidIdError();
    }

    const gameAndBets = await gameService.getByIdWithBets(id);
    res.status(httpStatus.OK).send(gameAndBets);
}

async function finish(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id || isNaN(id) || id < 1) {
        throw invalidIdError();
    }

    const finishGameReq = req.body as FinishGame

    const finishGame = await gameService.finish(id, finishGameReq)

    res.status(httpStatus.OK).send(finishGame);
}

export const gameController = {
    create,
    get,
    getById,
    getByIdWithBets,
    finish
};