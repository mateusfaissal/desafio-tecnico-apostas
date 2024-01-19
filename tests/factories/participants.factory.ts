import { faker } from "@faker-js/faker"
import prisma from "@/database/database"

export async function createFakeParticipant() {
    
    return prisma.participant.create({
        data: {
        id: faker.number.int({min: 1, max: 999999}),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        name: faker.person.firstName() + "" + faker.person.lastName(),
        balance: faker.number.int({min: 1000, max: 999999})
        } 
    })
}

 export function fakeParticipantReqBody() {
     return {
        name: faker.person.firstName() + "" + faker.person.lastName(),
         balance: faker.number.int({min: 1000, max: 999999})
     }
 }

 export function fakeParticipantReqBodyWithoutMinBalance() {
    return {
       name: faker.person.firstName() + "" + faker.person.lastName(),
        balance: faker.number.int({min: 0, max: 999})
    }
}
