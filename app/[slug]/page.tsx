"use client"
import { GetBoard } from "@/lib/Board"
import { Board } from "@prisma/client"
import { useEffect, useState } from "react"
import { Layout } from "@/components/Layouts/MainLayout"
import { getSession, useSession } from "next-auth/react"

export default function Page({ params }: { params: { slug: string }}) {
    const session = getSession();
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
            {JSON.stringify(board)}
            </>
            }
        </div>
        </Layout>
    )
}