import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreateJob } from "@/lib/Job"
import { Loader2 } from "lucide-react"

export default function CreateJModal() {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
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
    <>
    <Button className='w-full bg-black' onClick={openModal}>Create New Job</Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Configure your job
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    Configure your job, choose a title, set the location, and the salary.
                    </p>
                  </div>
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
              className="w-full border border-black/20"
            />
            </div>
            <div className="mt-2">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input required id="location" placeholder="San Francisco" value={location} onChange={((e) => {setLocation(e.target.value)})} className="w-full border border-black/20"/>
            </div>
            <div className="mt-2">
            <Label htmlFor="location" className="text-right">Salary</Label>
            <Input required type="number" id="salary" placeholder="$250,000" value={salary} onChange={((e) => {setSalary(Number(e.target.value))})} className="w-full border border-black/20"/>
            </div>
            <br />
                {
                    loading
                    ?
                    <>
                    <Button disabled className="w-full ">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Save Changes
                    </Button>
                    </>
                    :
                    <>
                    <Button form="form" type="submit" className="w-full bg-black">Save changes</Button>
                    </>
                }
            </form>
            </div>
            </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
