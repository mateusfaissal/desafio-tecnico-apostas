import supertest from "supertest";
import httpStatus from "http-status";
import app from "@/app";
import prisma from "@/database/database";
import { createFakeGame } from "../factories/games.factory";


beforeEach(async () => {
    await prisma.game.deleteMany();
  });

  const server = supertest(app);

  describe("Integration tests for entity games", () => {
    it("Should respond with a status code of 422 when the body content is missing or invalid", async() => {
        const res = await server.post('/games').send({});

        expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("Should respond with a status code of 201 when a participant is succesfully created", async () => {
        const fakeGame = createFakeGame();
        const res = await server.post('/games').send(fakeGame);

        expect(res.status).toBe(httpStatus.CREATED);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...fakeGame,
                homeTeamScore: expect.any(Number),
                awayTeamScore: expect.any(Number)
            })
        )
    })
 });

  
 

