"use client"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function Page() {
    const router = useRouter();
    const { data: session } = useSession({required: true, onUnauthenticated() {
        router.push('/')
      }})
    return (
        <Layout session={session}>
            <br />
        </Layout>
    )
}