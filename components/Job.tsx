"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export function Job() {
    return (
        <>
        <Card className="w-full md:w-1/2 lg:w-1/3">
  <CardHeader className="text-left">
    <CardTitle className="ml-4">Junior Back-End Developer</CardTitle>
  </CardHeader>
  <CardContent className="items-start flex ml-4 gap-2">
   <Badge className="rounded-sm">Remote</Badge>
   <Badge className="rounded-sm">Full Time</Badge>
  </CardContent>
</Card>

        </>
    )
}