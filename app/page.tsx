"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CreateBoardButton } from "@/components/CreateBoardButton";

export default function Home() {
  const session = useSession();
  return (
    <>
    <div className="text-center w-full">
      <br /><br /><br /><br />
        <h1 className="text-4xl ">Simplifying the hiring process.</h1>
        <br />
        <CreateBoardButton />
    </div>
    </>
  );
}
