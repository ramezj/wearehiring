"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CreateBoardButton } from "@/components/CreateBoardButton";
import { Layout } from "@/components/Layouts/MainLayout";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
    <Layout session={session}>
    <div className="text-center w-full">
      <br /><br /><br /><br />
        <h1 className="text-4xl ">Simplifying the hiring process.</h1>
        <br />
        <CreateBoardButton />
    </div>
    </Layout>
    </>
  );
}
