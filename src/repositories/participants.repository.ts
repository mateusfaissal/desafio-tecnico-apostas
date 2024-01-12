import prisma from "@/database/database";

async function create(name: string, balance: number) {
    const participant = await prisma.participant.create({
        data: {
            name: name,
            balance: balance
        }
    })
    return participant;
}

async function get() {
    const participants = await prisma.participant.findMany()
    return participants;
}

async function getById(participantId: number) {
    const participant = prisma.participant.findUnique({
        where: {
            id: participantId
        }
    })
    return participant;
}

async function update(id: number, balance: number) {
    const newBalance = prisma.participant.update({
        where: {
            id: id
        },
        data: {
            balance: balance
        }
    })
    return newBalance;
}

export const participantRepository = {
    create,
    get,
    getById,
    update
};