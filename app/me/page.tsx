"use client"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const { data: session } = useSession({required: true, onUnauthenticated() {
        router.push('/')
    }})
    return (
        <Layout session={session}>
            <div className="flex justify-center">
                <h1 className="text-2xl font-medium mt-8">Hello, {session?.user.name}</h1>
            </div>
        </Layout>
    )
}