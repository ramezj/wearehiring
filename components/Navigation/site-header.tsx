import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { Button } from "../ui/button"
import { buttonVariants } from "../ui/button"
import { signIn } from "next-auth/react"

export function SiteHeader(props:any) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center p-3">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">

            </div>
          <nav className="flex items-center gap-2">
            {
              props.session
              ?
              <>
                <Button asChild>
                  <Link href='/me'>
                  Dashboard
                  </Link>
                  </Button>
              </>
              : 
              <>
              <Button onClick={(() => {signIn("google")})}>Sign In</Button>
              <Button variant="outline" onClick={(() => {signIn("google")})}>Sign Up</Button>
              </>
            }
          </nav>
        </div>
      </div>
    </header>
  )
}