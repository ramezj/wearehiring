"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Badge } from "../ui/badge"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          wearehiring
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/demo" className={cn("font-bold transition-colors hover:text-foreground/90", pathname === "/docs" ? "text-foreground" : "text-foreground/60")} >
          Demo
        </Link>
        <Link href="/features" className={cn("font-bold transition-colors hover:text-foreground/90", pathname === "/docs" ? "text-foreground" : "text-foreground/60")} >
          Features
        </Link>
        <Link href="/pricing" className={cn("font-bold transition-colors hover:text-foreground/90", pathname === "/docs" ? "text-foreground" : "text-foreground/60")} >
          Pricing
        </Link>
        {/* <Link href="/demo" className={cn("transition-colors hover:text-foreground/80", pathname === "/docs" ? "text-foreground" : "text-foreground/60")} >
          Blog
        </Link> */}
      </nav>
    </div>
  )
}