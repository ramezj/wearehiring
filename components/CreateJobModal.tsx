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
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { CreateJob } from "@/lib/Job"
import { Loader2 } from "lucide-react"

interface Props {
  organizationId: string
}

export function CreateJobModal() {
    const [ jobTitle, setJobTitle ] = useState<string>("");
    const [ location, setLocation ] = useState<string>("");
    const [ salary, setSalary ] = useState<number>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const Createjob = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        const create = await CreateJob(jobTitle, location, Number(salary));
        console.log(create);
        setLoading(false);
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-auto gap-1.5 text-sm" size="sm">Create a Job</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[425px] w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle>Configure your job</DialogTitle>
          <DialogDescription>
           Configure your job, set the salary, the workplace and the location. 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <form id="form" onSubmit={Createjob}>
            <div>
            <Label htmlFor="name" className="text-right">
              Job Title 
            </Label>
            <Input
              required
              id="jobTitle"
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={((e) => {setJobTitle(e.target.value)})}
              className="w-full"
            />
            </div>
            <div className="mt-2">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              required
              id="location"
              placeholder="San Francisco"
              value={location}
              onChange={((e) => {setLocation(e.target.value)})}
              className="w-full"
            />
            </div>
            <div className="mt-2">
            <Label htmlFor="location" className="text-right">
              Salary
            </Label>
            <Input
              required
              type="number"
              id="salary"
              placeholder="$250,000"
              value={salary}
              onChange={((e) => {setSalary(Number(e.target.value))})}
              className="w-full"
            />
            </div>
            </form>
            </div>
        </div>
        <DialogFooter>
            {
                loading
                ?
                <>
                <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Save Changes
                 </Button>
                </>
                :
                <>
                <Button form="form" type="submit" className="w-full">Save changes</Button>
                </>
            }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
