import { participantController } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares/schema-validation";
import { participantSchema } from "@/schemas";
import { Router } from "express";

const participantsRouter = Router();

participantsRouter.post('/', validateSchemaMiddleware(participantSchema), participantController.create)
participantsRouter.get('/', participantController.get)

export default participantsRouter;