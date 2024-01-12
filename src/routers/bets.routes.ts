import { Router } from "express";
import { validateSchemaMiddleware } from "@/middlewares/schema-validation";
import { betSchema } from "@/schemas/bets.schema";
import { betController } from "@/controllers/bets.controller";


const betRouter = Router();

betRouter.post('/', validateSchemaMiddleware(betSchema), betController.create);

export default betRouter;