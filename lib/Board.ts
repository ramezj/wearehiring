"use server"
import prisma from "./database"
import { getServerSession } from "next-auth"
import { authConfig } from "./Auth"

export async function GetBoard(id:string) {
    const board = await prisma.board.findUnique({
        where: {
            id
        },
        include: {
            jobs:true
        }
    });
    if(!board) return { error: 'board not found'}
    return { board: board }
}

export async function GetUserBoards() {
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated' }
    const board = await prisma.board.findFirst({
        where: {
            userId: session.user.id
        },
        include: {
            jobs: true
        }
    })
    if(!board) return { error: 'no job boards found'}
    return { board: board }
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
