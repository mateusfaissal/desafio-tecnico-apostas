import supertest from "supertest";
import httpStatus from "http-status";
import app from "@/app";
import prisma from "@/database/database";
import { createFakeParticipant, fakeParticipantReqBody, fakeParticipantReqBodyWithoutMinBalance } from "../factories/participants.factory";

beforeEach(async () => {
    await prisma.participant.deleteMany();
  });

  const server = supertest(app);

  describe("Integration tests for entity participants", () => {
    it("Should respond with a status code of 422 when the body content is missing or invalid", async() => {
        const res = await server.post('/participants').send({});

        expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("Should respond with a status code of 200 and five participants when exists five participants in the database", async() => {
        await createFakeParticipant();
        await createFakeParticipant();
        await createFakeParticipant();
        await createFakeParticipant();
        await createFakeParticipant();

        const res = await server.get("/participants");

        expect(res.status).toBe(httpStatus.OK);
        expect(res.body).toHaveLength(5);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    name: expect.any(String),
                    balance: expect.any(Number)
                })
            ])
        )
    })

    it("Should respond with a status code of 201 when a participant is succesfully created", async () => {
        const fakeParticipant = fakeParticipantReqBody();
        const res = await server.post('/participants').send(fakeParticipant);

        expect(res.status).toBe(httpStatus.CREATED);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...fakeParticipant
            })
        )
    })

    it("Should respond with a status code of 422 when a participant is created without the minimum balance amount", async () => {
        const fakeParticipant = fakeParticipantReqBodyWithoutMinBalance();
        const res = await server.post('/participants').send(fakeParticipant);

        expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    })
  })


