"use server"

import prisma from "./database";
import { getServerSession } from "next-auth"
import { authConfig } from "./Auth"

export async function CreateJob(title: string, location: string, salary: number) {
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated'}
    try {
        const createjob = await prisma.job.create({
            data: {
                userId: session.user.id,
                title,
                location,
                salary
            }
        })
        if(!createjob) return { error: 'something went wrong'}
        return { job: createjob }
    } catch (error) {
        console.error(error);
        return { error: 'something is up, contact the developer.'}
    }
}

export async function GetUserJobs() {
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated'}
    try {
        const userjobs = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            include: {
                jobs: true
            }
        })
        if(!userjobs) return { error: 'something went wrong'}
        return { jobs: userjobs }
    } catch (error) {
        console.error(error);
    }
}

export async function GetJobs(id: String) {
    if(!id) return { error: "no id was given" }
    const jobs = await prisma.user.findFirst({
        where: {
            boardId: id as string
        },
        include: {
            jobs:true
        }
    })
    if(!jobs) return { error: "no board found"}
    return { jobs: jobs.jobs }
}