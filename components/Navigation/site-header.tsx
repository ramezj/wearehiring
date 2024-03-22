import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { Button } from "../ui/button"
import { buttonVariants } from "../ui/button"
// import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">

            </div>
          <nav className="flex items-center gap-2">
           <Button>Sign Up</Button>
           <Button>Sign In</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}