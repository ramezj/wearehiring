"use client"
import { useEffect, useState } from "react"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react"
import { Job } from "@/components/Job"
import { Button } from "@/components/ui/button"
import { GetJobs } from "@/lib/Job"
import { useRouter } from "next/navigation"


export default function Page({ params }: { params: { slug: string }}) {
    const router = useRouter();
    const { data: session } = useSession();
    const [ jobs, setJobs ] = useState<any>(); 
    const [ loading, setLoading ] = useState<boolean>(true);
    useEffect(() => {
        const fetchBoard = async () => {
            const res = await GetJobs(params.slug);
            if(res.error) {
               router.push('/404');
            } else {
                setJobs(res.jobs);
            }
            setLoading(false);
        }
        fetchBoard();
    },[])
    
    return (
        <Layout session={session}>
        <div className="text-center w-full">
            <br /><br />
            <h1 className="text-4xl font-bold">We are hiring.</h1>
            { loading === true &&
            <>
            Loading jobs...
            </>
            }
            {
            loading === false && 
            <>
            </>
            }
            <br />
        </div>
        <center>
            <div className='2xl:w-3/6 lg:w-3/5 w-full h-full'>
                <div className='lg:w-9/12 w-[95%] flex flex-col justify-between'>
                    {
                        loading
                        ?
                        <>
                        </>
                        :
                        <>
                        {
                        jobs.map((job: Job) => {
                            return (
                                <>
                                <Job title={job.title} id={job.id} location={job.location}/> 
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