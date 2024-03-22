"use client"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { GetUserBoards } from "@/lib/Board";
import { GetUserJobs } from "@/lib/Job";
import { useEffect, useState } from "react";
import { CreateJobModal } from "@/components/CreateJobModal";

export default function Page() {
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ jobs, setJobs ] = useState();
    const { data: session } = useSession({required: true, onUnauthenticated() {
        router.push('/')
    }})
    useEffect(() => {
        const FetchUserData = async () => {
            const jobs = await GetUserJobs();
            setLoading(false);
            if(jobs?.error) console.error(jobs.error);
            else {
               setJobs(jobs?.jobs?.jobs as any)
               console.log(jobs?.jobs);
            }
        }
        FetchUserData();
    }, [])
    return (
        <Layout session={session}>
            <center>
                <h1 className="text-3xl font-bold mt-8">My Jobs:</h1>
                <br />
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
                <CreateJobModal />
            </center>
        </Layout>
    )
}