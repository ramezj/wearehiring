"use client"
import { useSession } from "next-auth/react"
import { NavigationBar } from "../NavigationBar"
import { SiteHeader } from "../Navigation/site-header"
export function Layout(props:any) {
    return (
        <div className="mx-auto max-w-5xl">
            {/* <NavigationBar session={props.session}/> */}
            <SiteHeader session={props.session}/>
            {props.children}
        </div>
    )
}