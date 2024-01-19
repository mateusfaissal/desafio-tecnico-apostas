import { faker } from "@faker-js/faker"
import { InputGame } from "@/schemas"

export function createFakeGame(): InputGame {
    const fakeGame: InputGame = {
        homeTeamName: faker.company.name(),
        awayTeamName: faker.company.name()
    }
    return fakeGame;
}