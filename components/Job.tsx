"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export function Job(props:any) {
    return (
      <div className="w-full flex bg-white border border-black/10 rounded-lg items-center duration-300">
      <div className="m-8 flex flex-col items-start text-left">
      <p className='text-lg font-bold text-left text-black dark:text-white'>
        Back End Software Engineer     
      </p>
      <div className="mt-3 -mb-2 flex gap-1">
      <Badge className="rounded-sm">Full Stack</Badge>
      <Badge className="rounded-sm">Remote</Badge>
      </div>
      </div>
      <div className="m-8 ml-auto">
      <Button>
      Apply
      </Button>
      </div>
      </div>
    )
}