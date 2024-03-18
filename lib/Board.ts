"use server"
import prisma from "./database"
import { getServerSession } from "next-auth"
import { authConfig } from "./Auth"

export async function GetUserBoards() {
}

export async function CreateBoard(name: string) {
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated' }
    if(!name) return { error: 'Missing name'}
    const Create = await prisma.board.create({
        data: {
            name: name,
            userId: session.user?.id as string
        }
    })
    if(!Create) return { error: 'Something went wrong'}
    return { board: Create }
}
