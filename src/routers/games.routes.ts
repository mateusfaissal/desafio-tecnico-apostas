import { Router } from "express";
import { validateSchemaMiddleware } from "@/middlewares/schema-validation";
import { gameSchema } from "@/schemas/games.schema";
import { gameController } from "@/controllers/games.controller";

const gamesRouter = Router();

gamesRouter.post('/', validateSchemaMiddleware(gameSchema), gameController.create)
gamesRouter.get('/', gameController.get)
gamesRouter.get('/:id', gameController.getByIdWithBets)

export default gamesRouter;