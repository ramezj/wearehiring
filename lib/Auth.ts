import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Prisma, PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authConfig:NextAuthOptions = {
    providers: [ 
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({user, account, profile}) {
            const userExists = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            })
            if(userExists) {
                console.log("USER ALREADY EXISTS : ", user, account, profile)
            }
            if(!userExists) {
                const createUser = await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.name,
                        image: user.image,
                        emailVerified: null
                    }
                })
                const createAccount = await prisma.account.create({
                    data: {
                        userId: createUser.id,
                        type: account?.type as any,
                        provider: account?.provider as any,
                        providerAccountId : account?.providerAccountId as any,
                        access_token: account?.access_token,
                        expires_at: account?.expires_at,
                        token_type: account?.token_type,
                        scope: account?.scope,
                        id_token: account?.id_token
                    }
                })
                const createOrganization = await prisma.organization.create({
                    data: {
                        name: user.name as string,
                        userId: createUser.id
                    }
                })
            }
            return true
        },
        async session({ session, token }) {
            // Ensure session.user exists before trying to assign properties
            if (session.user) {
                // We safely assert token.sub is not null or undefined using `!` because
                // it's expected to always be present for an authenticated user's JWT
                session.user.id = token.sub!;
                session.user.name = token.name ?? session.user.name;
                session.user.email = token.email ?? session.user.email;
            }
            return session;
        },
        async jwt({ token, user }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
}