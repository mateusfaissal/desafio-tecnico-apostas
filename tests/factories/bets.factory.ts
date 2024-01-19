import { BetReqInput } from "@/schemas";
import { faker } from "@faker-js/faker"


export function createFakeBet(): BetReqInput {
    const fakeBet: BetReqInput = {
        homeTeamScore: faker.number.int(),
        awayTeamScore: faker.number.int(),
        amountBet: faker.number.int({min: -1, max: 0}),
        gameId: faker.number.int({min: 1, max: 999999}),
        participantId: faker.number.int({min: 1, max: 999999})
    }
    return fakeBet;
}