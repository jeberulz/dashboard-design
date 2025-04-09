import { CheckCircle, Clock, CalendarDays, X } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage="dashboard" />
      <main className="flex-1">
        <div className="w-full px-0 py-6 md:container md:px-6 md:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome Adebimpe</h1>
              <p className="text-muted-foreground">Create a wallet to get started</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-[#F47B4F] hover:bg-[#E06A3E] text-white">Recharge</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-1 bg-[#0F5CA8] text-white">
              <CardHeader>
                <CardTitle>Create Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  No wallet has been created, create a wallet so you can start making transactions
                </p>
                <Button className="bg-[#F47B4F] hover:bg-[#E06A3E] text-white border-0">Create Wallet</Button>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <CheckCircle className="h-5 w-5 text-[#0F5CA8]" />
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">0</div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
                <Clock className="h-5 w-5 text-[#F5A623]" />
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">0</div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Transactions</CardTitle>
                <CalendarDays className="h-5 w-5 text-[#0F5CA8]" />
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Transactions</h2>
              </div>
              <Tabs defaultValue="single" className="mb-4">
                <TabsList>
                  <TabsTrigger value="single" className="bg-[#0F5CA8] text-white data-[state=active]:bg-[#0F5CA8]">
                    Single Recharge(20)
                  </TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Recharges (30)</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Mock transaction data */}
                    <TableRow>
                      <TableCell className="w-[50px]">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">TR-2023-001</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200">
                          Deposit
                        </span>
                      </TableCell>
                      <TableCell className="text-green-600">₦5,000</TableCell>
                      <TableCell>Apr 1, 2023</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                          Completed
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[50px]">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">TR-2023-002</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
                          Withdrawal
                        </span>
                      </TableCell>
                      <TableCell className="text-red-600">₦1,200</TableCell>
                      <TableCell>Apr 3, 2023</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                          Completed
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[50px]">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">TR-2023-003</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-indigo-100 text-indigo-800 border-indigo-200">
                          Transfer
                        </span>
                      </TableCell>
                      <TableCell className="text-red-600">₦2,500</TableCell>
                      <TableCell>Apr 5, 2023</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                          Completed
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[50px]">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">TR-2023-004</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200">
                          Deposit
                        </span>
                      </TableCell>
                      <TableCell className="text-green-600">₦3,000</TableCell>
                      <TableCell>Apr 10, 2023</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                          Completed
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[50px]">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">TR-2023-005</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-indigo-100 text-indigo-800 border-indigo-200">
                          Transfer
                        </span>
                      </TableCell>
                      <TableCell className="text-red-600">₦1,500</TableCell>
                      <TableCell>Apr 15, 2023</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-800 border-yellow-200">
                          Pending
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="col-span-1">
              <div className="space-y-6">
                <Card className="bg-[#F5F9FF]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl font-bold">Analytics</CardTitle>
                    <Select defaultValue="lastYear">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lastYear">Last Year</SelectItem>
                        <SelectItem value="lastMonth">Last Month</SelectItem>
                        <SelectItem value="lastWeek">Last Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0F5CA8]">
                        <X className="h-6 w-6 text-white" />
                      </div>
                      <p className="mb-4 text-sm text-muted-foreground">Nothing to see for now check back later</p>
                      <Button className="bg-[#0F5CA8] hover:bg-[#0D4E8F] text-white">Refresh</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0F5CA8] text-white">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Everyday Payments, Simplified</h3>
                      <p className="text-sm">
                        Get 50% off on your next transaction on your bulk recharges that have more than 50 recharges.
                      </p>
                      <Button className="bg-white text-[#0F5CA8] hover:bg-gray-100">Upgrade to Pro</Button>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Image
                        src="/placeholder.svg?height=120&width=120"
                        alt="Payments illustration"
                        width={120}
                        height={120}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
