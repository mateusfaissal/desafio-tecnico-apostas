import { participantService } from "@/services";
import { participant } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
 
async function create(req: Request, res: Response) {
    const { name, balance } = req.body as Omit<participant, 'id' | 'createdAt' | 'updatedAt'>
    
    const newParticipant = await participantService.create(name, balance);

    res.status(httpStatus.CREATED).send(newParticipant);
}

 
async function get(req: Request, res: Response) {
    const participants = await participantService.get()
    res.status(httpStatus.OK).send(participants);
}


export const participantController = {
    create,
    get,
};