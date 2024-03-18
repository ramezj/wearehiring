"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <>
    {session && 
    <>
    {JSON.stringify(session.data?.user)}
    </>
    }
    <h1 className="text-4xl ">Simplify hiring, amplify success - the future of recruitment is here.</h1>
    </>
  );
}
