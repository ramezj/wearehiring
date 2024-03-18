"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { CreateBoard } from "@/lib/Board"
import { useRouter } from "next/navigation"

export function CreateBoardButton() {
    const router = useRouter();
    const [ name, setName ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const create = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        const response = await CreateBoard(name);
        if(response.board) {
            setLoading(false)
            router.push(`/${response.board.id}`)
        } else {
            console.error(response.error);
        }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Board</Button>
      </DialogTrigger>
      <DialogContent className='w-auto'>
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <form id="form" onSubmit={create}>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
                required
                id="name"
                value={name}
                onChange={((e) => { setName(e.target.value)})}
                className="col-span-3 !w-full"
            />
            </form>
          </div>
         </div>
        <DialogFooter>
          { loading === false && 
          <>
          <Button form="form" type="submit">Deploy</Button>
          </>
          } 
          { loading === true && 
          <>
          <Button form="form" type="submit" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deploy</Button>
          </>
          } 
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
