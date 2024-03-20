"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CreateBoardButton } from "@/components/CreateBoardButton";
import { Layout } from "@/components/Layouts/MainLayout";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
    <Layout session={session}>
    <div className="text-center w-full">
      <br /><br />
      <Badge className="px-5 py-1 2xl:px-12 2xl:py-2 text-md">wearehiring is currently in pre-alpha.</Badge>
      <br /><br />
        <h1 className="text-6xl font-bold ">Simplifying the hiring process.</h1>
        <br />
        <CreateBoardButton />
    </div>
    </Layout>
    </>
  );
}
