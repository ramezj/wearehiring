"use server"

import prisma from "./database";
import { getServerSession } from "next-auth"
import { authConfig } from "./Auth"

export async function CreateJob(title: string, location: string, salary: number) {
    const session = await getServerSession(authConfig);
    if(!session) return { error: 'Unauthenticated'}
    const organizationId = await prisma.organization.findFirst({
        where: {
            userId: session.user?.id
        }
    })
    try {
        const createjob = await prisma.job.create({
            data: {
                organizationId: organizationId?.id as string,
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
                organizations:true
            }
        })
        console.log(userjobs);
        if(!userjobs) { 
            console.error(userjobs);
            return { error: 'something went wrong'} 
        }
        return { jobs: userjobs }
    } catch (error) {
        console.error(error);
    }
}

export async function GetJobs(id: String) {
    if(!id) return { error: "no id was given" }
    const jobs = await prisma.organization.findFirst({
        where: {
            id: id as string
        },
        include: {
            jobs:true
        }
    })
    if(!jobs) return { error: "no board found"}
    return { jobs: jobs.jobs }
}

export async function GetJob(id: String) {
    if(!id) return { error: "no id was given" }
    const job = await prisma.job.findFirst({
        where: {
            id: id as string
        }
    })
    if(!job) return { error: "No Job Found"}
    return { job: job }
}