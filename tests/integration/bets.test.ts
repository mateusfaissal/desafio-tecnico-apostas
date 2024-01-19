import supertest from "supertest";
import httpStatus from "http-status";
import app from "@/app";
import prisma from "@/database/database";

beforeEach(async () => {
    await prisma.bet.deleteMany();
    await prisma.game.deleteMany();
    await prisma.participant.deleteMany();
  });

  const server = supertest(app);

  describe("Integration tests for entity bets", () => {
    it("Should respond with a status code of 422 when the body content is missing or invalid", async() => {
        const res = await server.post('/bets').send({});

        expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

     it("Should respond with a status code of 422 when a bet is created with negative or zero amount", async () => {
        const participant = await prisma.participant.create({
            data: {
              name: "John",
              balance: 2000
            }
         });
          const game = await prisma.game.create({
            data:{
              homeTeamName: "Manchester United",
              awayTeamName: "Chelsea"
            }
          })
          const res = await server.post('/bets').send({
                homeTeamScore: 1,
                awayTeamScore: 1, 
                amountBet: -1, 
                gameId: game.id, 
                participantId: participant.id, 
          });
        
         expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
         expect(res.text).toEqual('{"error":"\\"amountBet\\" must be greater than or equal to 1"}')
     })

     it("Should respond with a status code of 403 when attempting to place a bet that exceeds the participant's available balance.", async() => {
        const participant = await prisma.participant.create({
          data: {
            name: "Carlos Eduardo",
            balance: 5000
          }
       });
        const game = await prisma.game.create({
          data:{
            homeTeamName: "Manchester United",
            awayTeamName: "Chelsea"
          }
        })
        const res = await server.post('/bets').send({
            homeTeamScore: 1,
              awayTeamScore: 1, 
              amountBet: 6000, 
              gameId: game.id, 
              participantId: participant.id, 
        });
        expect(res.status).toBe(httpStatus.FORBIDDEN);
        expect(res.text).toBe("Insufficient balance for this bet");
       })

       it('Should respond with a status code of 403 when attempting to place a bet on a game that is already finished', async() => {
        const participant = await prisma.participant.create({
            data: {
              name: "Mateus",
              balance: 5000
            }
         });

        const game = await prisma.game.create({
          data:{
            homeTeamName: "Manchester United",
            awayTeamName: "Chelsea",
            isFinished: true
          }
        })
        const res = await server.post('/bets').send({
            homeTeamScore: 1,
              awayTeamScore: 1, 
              amountBet: 3000, 
              gameId: game.id, 
              participantId: participant.id, 
        });
        expect(res.status).toBe(httpStatus.FORBIDDEN);
        expect(res.text).toBe("You cannot bet on a game that is already finished");
       })
    
  })


