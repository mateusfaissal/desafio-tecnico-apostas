import { Request, Response } from "express";
import httpStatus from "http-status";
import { BetReqInput } from "@/schemas/bets.schema";
import { betService } from "@/services/bets.service";


async function create(req: Request, res: Response) {
    const reqBet = req.body as BetReqInput;

    const newBet = await betService.create(reqBet);

    res.status(httpStatus.CREATED).send(newBet);
}

export const betController = {
    create,
};