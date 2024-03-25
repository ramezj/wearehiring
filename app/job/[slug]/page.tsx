"use client"
import { GetJob } from "@/lib/Job"
import { useEffect, useState } from "react"
import { Layout } from "@/components/Layouts/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Navigation, DollarSign, DollarSignIcon } from "lucide-react";

export default function Page({ params }: { params: { slug: string }}) {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ job, setJob ] = useState<Job>();
    useEffect(() => {
        const fetchjob = async () => {
            const res = await GetJob(params.slug);
            if(res.error) {
                console.error(res.error);
            }
            if(res.job) {
                console.log(job);
                setJob(res.job as any)
            }
            setLoading(false);
        }
        fetchjob();
    }, [])
    return (
        <Layout>
            <br />
        {
            loading
            ? 
            <>
            Loading Job
            </>
            : 
            <>
            <div className='flex flex-col items-center justify-center'>
            <h1 className='font-bold text-4xl'>{job?.title}</h1>
            <div className='flex flex-row gap-1 mt-4'>
            <Badge className="rounded-sm"><Briefcase className="w-3 h-3 mr-1" />{job?.type}</Badge>
            <Badge className="rounded-sm"><Navigation className="w-3 h-3 mr-1" />{job?.location}</Badge>
            <Badge className="rounded-sm"><DollarSign className="w-3 h-3 mr-1" />{job?.salary as number}</Badge>
            </div>
            <br />
            <Button> Apply to job </Button>
            {/* {JSON.stringify(job)} */}
            </div>
            </>
        }
        </Layout>
    )
}