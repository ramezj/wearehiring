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
import { ArrowUpRight, Zap } from "lucide-react";

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
            <br />
            <header className="flex flex-col md:flex-row h-[55px] items-center gap-3 bg-background md:px-0 px-3">
            <CreateJobModal/>
            <Button asChild className="gap-1 w-full">
            <Link target="_blank" href={`/${organization?.id}`}>
            View Board
            <ArrowUpRight className="h-4 w-4"/>
            </Link>
            </Button>
            <Button asChild className="gap-1 w-full">
            <Link target="_blank" href={`/${organization?.id}`}>
            View Applicants
            <ArrowUpRight className="h-4 w-4"/>
            </Link>
            </Button>
            <Button className="gap-1 w-full">
            <Zap className="h-4 w-4" />
            Upgrade To Pro
            </Button>
            </header>
            <br />
            <div className='w-full h-full md:mt-0 mt-[7.25rem]'>
            <div className='lg:w-full w-[95%] flex flex-col justify-between'>
            { loading ? <>loading</>: 
                    <>
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
                    </>
                }
            </div>
            </div>
            </center>
        </Layout>
    )
}