import { Router } from "express";
import { validateSchemaMiddleware } from "@/middlewares/schema-validation";
import { gameFinishSchema, gameSchema } from "@/schemas/games.schema";
import { gameController } from "@/controllers/games.controller";

const gamesRouter = Router();

gamesRouter.post('/', validateSchemaMiddleware(gameSchema), gameController.create)
gamesRouter.get('/', gameController.get)
gamesRouter.get('/:id', gameController.getByIdWithBets)
gamesRouter.post('/:id/finish', validateSchemaMiddleware(gameFinishSchema), gameController.finish)

export default gamesRouter;