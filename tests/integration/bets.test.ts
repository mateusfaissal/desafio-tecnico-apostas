import supertest from "supertest";
import httpStatus from "http-status";
import app from "@/app";
import prisma from "@/database/database";
import { createFakeBet } from "../factories/bets.factory";

beforeEach(async () => {
    await prisma.bet.deleteMany();
  });

  const server = supertest(app);

  describe("Integration tests for entity bets", () => {
    it("Should respond with a status code of 422 when the body content is missing or invalid", async() => {
        const res = await server.post('/bets').send({});

        expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("Should respond with a status code of 422 when a bet is created with negative or zero amount", async () => {
        const fakeBet = createFakeBet();
        const res = await server.post('/bets').send(fakeBet);
        
        expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(res.text).toEqual('{"error":"\\"amountBet\\" must be greater than or equal to 0"}')
    })

   
  })


