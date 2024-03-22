"use client"
import { GetBoard } from "@/lib/Board"
import { Board } from "@prisma/client"
import { useEffect, useState } from "react"
import { Layout } from "@/components/Layouts/MainLayout"
import { useSession } from "next-auth/react"
import { Job } from "@/components/Job"
import { Button } from "@/components/ui/button"

export default function Page({ params }: { params: { slug: string }}) {
    const { data: session } = useSession();
    const [ board, setBoard ] = useState<Board>(); 
    const [ loading, setLoading ] = useState<boolean>(true);
    useEffect(() => {
        const fetchBoard = async () => {
            const res = await GetBoard(params.slug);
            setLoading(false);
            if(res.error) {
                // handle error here.
            } else {
                setBoard(res.board);
            }
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
                <div className='lg:w-9/12 w-11/12 flex flex-col justify-between'>
                    <Job/>  
                </div>
            </div>
        </center>
        </Layout>
    )
}