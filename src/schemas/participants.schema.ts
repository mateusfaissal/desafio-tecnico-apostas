import { participant } from "@prisma/client";
import Joi from "joi";

export const participantSchema = Joi.object<participant>({
    name: Joi.string().required(),
    balance: Joi.number().integer().min(1000).required()
})

export type ReqBodyParticipant = Omit<participant, "id" | "createdAt" | "updatedAt"> 