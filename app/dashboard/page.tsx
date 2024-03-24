"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  Briefcase
} from "lucide-react"
import { SquareArrowOutUpRight } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Layout } from "@/components/Layouts/MainLayout"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Job } from "@/components/Job"
import { Button } from "@/components/ui/button"
import { CreateJobModal } from "@/components/CreateJobModal"
import { GetUserJobs } from "@/lib/Job"

export default function Dashboard() {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ boardId, setBoardId ] = useState<string>("");
  const [ boardViews, setBoardViews ] = useState<number>(0);
  const [ applicants, setApplicants ] = useState([]);
  const [ jobs, setJobs ] = useState<any>([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await GetUserJobs();
      if(user?.error) {
        setLoading(false);
        console.error(user?.error);
      }
      if(user?.jobs){
        setBoardId(user?.jobs.boardId);
        setJobs(user?.jobs.jobs);
        setBoardViews(user?.jobs.boardViews);
        setLoading(false);
        console.log(user.jobs)
      }
    }
    fetchUserData();
  },[])
  const router = useRouter();
  const { data: session } = useSession({required: true, onUnauthenticated() {
    router.push('/')
  }})
  return (
    <Layout session={session}>
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="font-bold text-3xl">Hello {session?.user.name}, Welcome back.</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <CreateJobModal />
      <Button asChild><Link target="_blank" href={`/${boardId}`}>Preview Board<ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
      <Button>Manage Board</Button>
        <Button asChild>
        <Link href='/settings'>
        Account Settings
        </Link>
        </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="border border-black/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Board Views
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  loading 
                  ? <>0</>
                  : <>{boardViews}</>
                }
              </div>
            </CardContent>
          </Card>
          <Card className="border border-black/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applicants
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  loading
                  ? <>0</>
                  : <>{applicants.length}</>
                }
              </div>
            </CardContent>
          </Card>
          <Card className="border border-black/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Job Posts
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  loading 
                  ? <>0</>
                  : <>{jobs.length}</>
                }
              </div>
            </CardContent>
          </Card>
          <Card className="border border-black/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applicants</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent> 
              <div className="text-2xl font-bold">
                {
                  loading 
                  ? <>0</>
                  : <>{applicants.length}</>
                }
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2 border border-black/20">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Applicants</CardTitle>
                <CardDescription>
                  Recent applicants that have applied to your positions
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Refund
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">Software Engineer</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="border border-black/20">
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {
                loading 
                ? 
                <>
                loading..
                </>
                : 
                <>
                {
                  jobs.map((job:any) => {
                    return (
                      <>
                      <div className="flex items-center gap-4">
                      <div className="grid gap-1">
                          <p className="text-md font-medium leading-none">
                          {job.title}
                          </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Button>Edit Position</Button>
                      </div>
                    </div>
                    </>
                    )
                  })
                }      
                </>
              }
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </Layout>
  )
}