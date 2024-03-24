"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { MapPin, Navigation } from "lucide-react"

export function Job(props:any) {
    return (
      <div className="w-full flex bg-white border border-black/20 rounded-lg items-center duration-300">
      <div className="m-5 flex flex-col items-start text-left">
      <p className='sm:text-lg text-md font-bold text-left text-black dark:text-white'>
       {props.title}     
      </p>
      <div className="mt-3 -mb-2 flex gap-1">
      <Badge className="rounded-sm"><Navigation className="w-3 h-3 mr-1" />{props.location}</Badge>
      <Badge className="rounded-sm">Remote</Badge>
      </div>
      </div>
      <div className="m-5 ml-auto">
      <Button asChild className="gap-1">
        <button>
        <Link href={`/job/${props.id}`}>
          View
        </Link>
        <ArrowUpRight className="h-4 w-4"/>
        </button>
      </Button>
      </div>
      </div>
    )
}