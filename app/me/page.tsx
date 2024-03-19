"use client"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    return (
        <Layout session={session}>
            {JSON.stringify(session)}
        </Layout>
    )
}