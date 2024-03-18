"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CreateBoardButton } from "@/components/CreateBoardButton";

export default function Home() {
  const session = useSession();
  return (
    <>
    {session && 
    <>
    {JSON.stringify(session.data?.user)}
    <CreateBoardButton />
    </>
    }
    <h1 className="text-4xl ">Simplify hiring, amplify success - the future of recruitment is here.</h1>
    </>
  );
}
