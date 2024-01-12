import { bet } from "@prisma/client";
import Joi from "joi";

export const betSchema = Joi.object<BetWithoutIdAndDates> ({
    homeTeamScore: Joi.number().required().min(0),
    awayTeamScore: Joi.number().required().min(0),
    amountBet: Joi.number().required().min(0),
    gameId: Joi.number().integer().required().min(1),
    participantId: Joi.number().integer().required().min(1),
})

export type BetWithoutIdAndDates = Omit<bet, "id" | "createdAt" | "updatedAt">
export type BetReqInput = Omit<BetWithoutIdAndDates, "status" | "amountWon">;
export type ForCalcBets = {
    betsTotal: number;
    wonBetsTotal: number;
  };
export type ForUpdateBets = Omit<bet, "id" | "createdAt" | "updatedAt" | "homeTeamScore" | "awayTeamScore" | "amountBet" | "gameId" | "participantId">;