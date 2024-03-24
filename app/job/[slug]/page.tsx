"use client"
import { GetJob } from "@/lib/Job"
import { useEffect, useState } from "react"
import { Layout } from "@/components/Layouts/MainLayout";

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
        {
            loading
            ? 
            <>
            Loading Job
            </>
            : 
            <>
            {JSON.stringify(job)}
            </>
        }
        </Layout>
    )
}