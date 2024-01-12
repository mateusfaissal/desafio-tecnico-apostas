import { game } from '@prisma/client';
import Joi from 'joi';

export const gameSchema = Joi.object<game>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
})

export const gameFinishSchema = Joi.object<game>({
    homeTeamScore: Joi.number().required().min(0),
    awayTeamScore: Joi.number().required().min(0)
});

export type FinishGame = Omit<game, "id" | "createdAt" | "updatedAt" | "homeTeamName" | "awayTeamName" | "isFinished">