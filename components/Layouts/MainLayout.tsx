"use client"
import { useSession } from "next-auth/react"
import { NavigationBar } from "../NavigationBar"
export function Layout(props:any) {
    return (
        <div>
            <NavigationBar session={props.session}/>
            {props.children}
        </div>
    )
}