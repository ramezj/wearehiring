"use client"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GetUserBoards } from "@/lib/Board";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ jobs, setJobs ] = useState();
    const { data: session } = useSession({required: true, onUnauthenticated() {
        router.push('/')
    }})
    useEffect(() => {
        const FetchUserData = async () => {
            const boards = await GetUserBoards();
            setLoading(false);
            if(boards.error) console.error(boards.error)
            else {
                setJobs(boards.board?.jobs as any);
            }
        }
        FetchUserData();
    }, [])
    return (
        <Layout session={session}>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold mt-8">My Jobs:</h1>
                {
                    loading 
                    ? 
                    <>
                    loading..
                    </>
                    : 
                    <>
                    {JSON.stringify(jobs)}
                    </>
                }
            </div>
        </Layout>
    )
}