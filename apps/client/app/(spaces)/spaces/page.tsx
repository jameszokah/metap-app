/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TfDtjbEfwSj
 */
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white dark:bg-[#1A222E] flex flex-col p-4 border-r dark:border-gray-600">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#14E8D8]">Metap Live</h1>
        </div>
        <nav>
          <Link className="flex items-center py-2 px-8 bg-[#14E8D8] text-[#1A222E]" href="#">
            <svg
              className=" w-6 h-6 mr-3 text-[#14E8D8]"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Dashboard
          </Link>
          <Link
            className="flex items-center mt-5 py-2 px-8 text-[#14E8D8] hover:bg-[#14E8D8] hover:text-[#1A222E]"
            href="#"
          >
            <svg
              className=" w-6 h-6 mr-3 text-[#14E8D8]"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Users
          </Link>
          <Link
            className="flex items-center mt-5 py-2 px-8 text-[#14E8D8] hover:bg-[#14E8D8] hover:text-[#1A222E]"
            href="#"
          >
            <svg
              className=" w-6 h-6 mr-3 text-[#14E8D8]"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#1A222E] p-4">
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-[#14E8D8]">Total Meetings</CardTitle>
                <svg
                  className=" w-4 h-4 text-[#14E8D8]"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,257</div>
                <p className="text-xs text-[#14E8D8]">+10% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-[#14E8D8]">Active Users</CardTitle>
                <svg
                  className=" w-4 h-4 text-[#14E8D8]"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <polyline points="16 11 18 13 22 9" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">763</div>
                <p className="text-xs text-[#14E8D8]">+12.5% active users</p>
              </CardContent>
            </Card>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#14E8D8] mb-2">Recent Reports</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>RP01</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>Nov 1, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button className="text-[#14E8D8] border-[#14E8D8]" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RP02</TableCell>
                  <TableCell>In Progress</TableCell>
                  <TableCell>Nov 2, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button className="text-[#14E8D8] border-[#14E8D8]" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#14E8D8] mb-2">Manage Rooms</h2>
            <Button className="mb-4 bg-[#14E8D8] text-[#1A222E]" variant="secondary">
              Create Room
            </Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>R001</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Nov 1, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button className="text-[#14E8D8] border-[#14E8D8]" variant="outline">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>R002</TableCell>
                  <TableCell>Inactive</TableCell>
                  <TableCell>Nov 2, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button className="text-[#14E8D8] border-[#14E8D8]" variant="outline">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}
