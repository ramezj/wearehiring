"use server"
import prisma from "./database"
import { getServerSession } from "next-auth"
import { authConfig } from "./Auth"

export async function GetOrganization(id:string) {
    const organization = await prisma.organization.findUnique({
        where: {
            id
        },
        include: {
            jobs:true
        }
    });
    if(!organization) return { error: 'board not found'}
    return { organization: organization }
}

export async function GetUserOrganization() {
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated' }
    const organization = await prisma.organization.findFirst({
        where: {
            userId: session.user.id
        },
        include: {
            jobs: true
        }
    })
    if(!organization) return { error: 'no job boards found'}
    return { organization: organization }
}

export async function CreateOrganization(name: string) {
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated' }
    if(!name) return { error: 'Missing name'}
    const Create = await prisma.organization.create({
        data: {
            name: name,
            userId: session.user?.id as string
        }
    })
    if(!Create) return { error: 'Something went wrong'}
    return { organization: Create }
}
