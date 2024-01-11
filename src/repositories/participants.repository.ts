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

export const participantRepository = {
    create,
    get,
};