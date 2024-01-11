import { participantRepository } from "@/repositories";

async function create(name: string, balance: number) {
    const newParticipant = await participantRepository.create(name, balance);
    return newParticipant;

}

async function get() {
    const participants = await participantRepository.get()
    return participants;
}

export const participantService = {
    create,
    get,
};