import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { Button } from "../ui/button"
import { buttonVariants } from "../ui/button"
import { signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader(props:any) {
  return (
    <header className="sticky top-2 z-50 w-full items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 p-3 md:p-0 items-center w-full max-w-5xl">
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
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200 ">
                <Avatar>
              <AvatarImage src={props.session.user.image}/>
              <AvatarFallback></AvatarFallback>
              </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href='/me' className="cursor-pointer">
              <DropdownMenuItem className="cursor-pointer	">
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href='/settings'>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <button className="w-full cursor-pointer" onClick={(() => {signOut()})}>
              <DropdownMenuItem className="cursor-pointer">
                Logout
                </DropdownMenuItem>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
                {/* <Button asChild>
                  <Link href='/dashboard'>
                  Dashboard
                  </Link>
                  </Button> */}
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