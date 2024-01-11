import { game } from '@prisma/client';
import Joi from 'joi';

export const gameSchema = Joi.object<game>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
})