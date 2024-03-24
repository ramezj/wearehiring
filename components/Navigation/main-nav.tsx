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
        <span className="hidden font-bold sm:inline-block text-black text-lg">
          wearehiring
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/demo" className={cn("font-bold text-black transition-colors")} >
          Demo
        </Link>
        <Link href="/features" className={cn("font-bold text-black transition-colors")} >
          Features
        </Link>
        <Link href="/pricing" className={cn("font-bold text-black transition-colors")} >
          Pricing
        </Link>
      </nav>
    </div>
  )
}