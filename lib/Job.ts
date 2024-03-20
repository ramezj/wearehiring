import prisma from "./database";
import { getServerSession } from "next-auth"
import { authConfig } from "./Auth"

export async function CreateJob(boardId: string, title: string, location: string, salary: number, workplace: string) {
    if(!boardId) return { error: "board id missing"};
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated'}
    try {
        const createjob = await prisma.job.create({
            data: {
                boardId: boardId,
                title,
                location,
                salary,
                workplace
            }
        })
        if(!createjob) return { error: 'something went wrong'}
        return { job: createjob }
    } catch (error) {
        console.error(error);
        return { error: 'something is up, contact the developer.'}
    }
}