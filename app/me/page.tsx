"use client"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { GetUserBoards } from "@/lib/Board";
import { GetUserJobs } from "@/lib/Job";
import { useEffect, useState } from "react";
import { CreateJobModal } from "@/components/CreateJobModal";
import { GetUserOrganization, CreateOrganization } from "@/lib/Organization";
import { Button } from "@/components/ui/button";
import { Job } from "@/components/Job";

export default function Page() {
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ jobs, setJobs ] = useState();
    const [ organization, setOrganization] = useState();
    const { data: session } = useSession({required: true, onUnauthenticated() {
        router.push('/')
    }})
    useEffect(() => {
        const FetchUserData = async () => {
            const organization = await GetUserOrganization();
            setLoading(false);
            if(organization.error) {
               console.error(organization.error)
            } else {
                setOrganization(organization.organization as any)
            }
            setLoading(false);
        }
        FetchUserData();
    }, [])
    return (
        <Layout session={session}>
            <center>
                <div className="w-full">
                    <br />
                <header className="flex h-[55px] items-center gap-1 bg-background px-5">
          <h1 className="text-xl font-semibold">Dashboard</h1>
            <CreateJobModal />
        </header>
                </div>
                <br />
                <h1 className="font-bold text-3xl">My Jobs</h1>
                <br />
                {
                    loading 
                    ? 
                    <>
                    loading..
                    </>
                    : 
                    <>
                    <div className='2xl:w-3/6 lg:w-3/5 w-full h-full'>
                    <div className='lg:w-9/12 w-[95%] flex flex-col justify-between'>
                        <Job title={"Full Stack Engineer"} location={"Cairo, Egypt"}/>
                    </div>
                    </div>
                    </>
                }
                {/* <CreateJobModal /> */}
            </center>
        </Layout>
    )
}