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
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Page() {
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ jobs, setJobs ] = useState([]);
    const [ organization, setOrganization] = useState<Organization>();
    const { data: session } = useSession({required: true, onUnauthenticated() {
        router.push('/')
    }})
    useEffect(() => {
        const FetchUserData = async () => {
            const res = await GetUserOrganization();
            setLoading(false);
            if(res.error) {
               console.error(res.error)
            } else {
                setOrganization(res.organization)
                setJobs(res.organization?.jobs as any)
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
            <header className="flex h-[55px] items-center gap-1 bg-background md:px-16 px-3">
            <Button asChild className="gap-1" size="sm">
            <Link target="_blank" href={`/${organization?.id}`}>
            View Board
            <ArrowUpRight className="h-4 w-4"/>
            </Link>
            </Button>
                <CreateJobModal/>
            </header>
                </div>
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
                    {
                        jobs.map((job: Job) => {
                            return (
                                <>
                                <Job title={job.title} id={job.id} location={job.location} type={job.type}/> 
                                <br />
                                </>
                            )
                        })
                        }
                    </div>
                    </div>
                    </>
                }
            </center>
        </Layout>
    )
}