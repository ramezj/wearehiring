"use client"

import { Button } from "./ui/button"
import Link from "next/link"

export function NavigationBar() {
    return (
        <>
        <header className="bg-transparent sticky top-0 z-10">
            <nav className="h-14 mx-auto max-w-full flex items-center justify-between p-6 lg:px-3 border-b border-border/70 bg-white dark:bg-black  backdrop-blur supports-[backdrop-filter]:bg-background/60" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href='/' className="font-bold text-lg">Lou</Link>
                </div>
                <div className="flex gap-4 items-center">
                    <Button asChild>
                        <Link href='/auth'>
                            Sign in
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href='/auth'>
                             Sign in
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
        </>
    )
}