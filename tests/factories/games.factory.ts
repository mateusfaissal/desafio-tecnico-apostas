import { faker } from "@faker-js/faker"
import { FinishGame, InputGame } from "@/schemas"
import prisma from "@/database/database";


export function createFakeGame(): InputGame {
    const fakeGame: InputGame = {
        homeTeamName: faker.company.name(),
        awayTeamName: faker.company.name()
    }
    return fakeGame;
}

export async function createFakeFinishedGame() {
    const finishGame: FinishGame & InputGame = {
        homeTeamName: faker.company.name(),
        awayTeamName: faker.company.name(),
        awayTeamScore: faker.number.int({ min: 0, max: 999999 }),
        homeTeamScore: faker.number.int({ min: 0, max: 999999 }),
    }
    const newFinishedGame = await prisma.game.create({
        data: {
            ...finishGame,
            isFinished: true
        }
    })
    return newFinishedGame;
}

