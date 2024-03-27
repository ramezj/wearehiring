"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Layout } from "@/components/Layouts/MainLayout";
import { Badge } from "@/components/ui/badge";
import { HologramCard } from "@/components/HologramCard";
import { Zap } from "lucide-react";
import { Job } from "@/components/Job";


export default function Home() {
  const { data: session } = useSession();
  return (
    <>
    <Layout session={session}>
    <div className="text-center w-full">
      <br /><br />
      <Badge className="px-5 py-1 2xl:px-12 2xl:py-2 text-sm gap-2"><Zap className='w-4 h-4' />wearehiring is currently in pre-alpha</Badge>
      <br /><br />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">A Job Board for everyone.</h1>
        <br />
        <div className="w-full flex items-center justify-center">
          <div className="lg:w-[65%] w-[95%]">
            <Job title={"Back-End Engineer"} buttonText={"Apply"} type={"Full-Time"} location={"Los Angeles"}/>
            <br />
            <Job title={"Product Manager"} buttonText={"Apply"} type={"Full-Time"} location={"New York"}/>
          </div>
        </div>
    </div>
    </Layout>
    </>
  );
}
