"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, Download, Filter, Search, ArrowUpDown } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// Sample transaction data
const transactions = [
  {
    id: "TR-2023-001",
    date: new Date("2023-04-01T10:30:00"),
    type: "deposit",
    amount: 5000,
    status: "completed",
    reference: "Bank Transfer - Initial Deposit",
  },
  {
    id: "TR-2023-002",
    date: new Date("2023-04-03T14:45:00"),
    type: "withdrawal",
    amount: 1200,
    status: "completed",
    reference: "ATM Withdrawal",
  },
  {
    id: "TR-2023-003",
    date: new Date("2023-04-05T09:15:00"),
    type: "transfer",
    amount: 2500,
    status: "completed",
    reference: "Payment to John Doe",
  },
  {
    id: "TR-2023-004",
    date: new Date("2023-04-10T16:20:00"),
    type: "deposit",
    amount: 3000,
    status: "completed",
    reference: "Salary Credit",
  },
  {
    id: "TR-2023-005",
    date: new Date("2023-04-15T11:05:00"),
    type: "transfer",
    amount: 1500,
    status: "pending",
    reference: "Rent Payment",
  },
  {
    id: "TR-2023-006",
    date: new Date("2023-04-18T13:40:00"),
    type: "withdrawal",
    amount: 800,
    status: "completed",
    reference: "Online Purchase",
  },
  {
    id: "TR-2023-007",
    date: new Date("2023-04-20T10:00:00"),
    type: "deposit",
    amount: 10000,
    status: "completed",
    reference: "Business Income",
  },
  {
    id: "TR-2023-008",
    date: new Date("2023-04-22T15:30:00"),
    type: "transfer",
    amount: 3500,
    status: "failed",
    reference: "Car Payment",
  },
  {
    id: "TR-2023-009",
    date: new Date("2023-04-25T09:45:00"),
    type: "withdrawal",
    amount: 1200,
    status: "completed",
    reference: "Grocery Shopping",
  },
  {
    id: "TR-2023-010",
    date: new Date("2023-04-28T14:15:00"),
    type: "deposit",
    amount: 4000,
    status: "completed",
    reference: "Freelance Payment",
  },
  {
    id: "TR-2023-011",
    date: new Date("2023-04-30T16:50:00"),
    type: "transfer",
    amount: 2000,
    status: "completed",
    reference: "Utility Bills",
  },
  {
    id: "TR-2023-012",
    date: new Date("2023-05-02T11:20:00"),
    type: "withdrawal",
    amount: 500,
    status: "completed",
    reference: "Restaurant Payment",
  },
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    completed: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
  }

  const statusClass = statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800 border-gray-200"

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// Transaction type badge component
function TypeBadge({ type }: { type: string }) {
  const typeStyles = {
    deposit: "bg-blue-100 text-blue-800 border-blue-200",
    withdrawal: "bg-purple-100 text-purple-800 border-purple-200",
    transfer: "bg-indigo-100 text-indigo-800 border-indigo-200",
  }

  const typeClass = typeStyles[type as keyof typeof typeStyles] || "bg-gray-100 text-gray-800 border-gray-200"

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeClass}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

export default function TransactionsPage() {
  // State for filters
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [amountRange, setAmountRange] = useState([0, 10000])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  const itemsPerPage = 5

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by date
    if (date && format(transaction.date, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")) {
      return false
    }

    // Filter by search query (reference or ID)
    if (
      searchQuery &&
      !transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by transaction type
    if (selectedTypes.length > 0 && !selectedTypes.includes(transaction.type)) {
      return false
    }

    // Filter by status
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(transaction.status)) {
      return false
    }

    // Filter by amount range
    if (transaction.amount < amountRange[0] || transaction.amount > amountRange[1]) {
      return false
    }

    return true
  })

  // Sort transactions
  const sortedTransactions = sortConfig
    ? [...filteredTransactions].sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    : filteredTransactions

  // Paginate transactions
  const paginatedTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)

  // Handle sort
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Reset all filters
  const resetFilters = () => {
    setDate(undefined)
    setSearchQuery("")
    setSelectedTypes([])
    setSelectedStatuses([])
    setAmountRange([0, 10000])
    setSortConfig(null)
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage="transactions" />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
              <p className="text-muted-foreground">View and manage your transaction history</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-[#0F5CA8] hover:bg-[#0D4E8F] text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Transactions
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by ID or reference..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Date filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Transaction type filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Transaction Type</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedTypes.length > 0 ? `${selectedTypes.length} selected` : "Select types"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuCheckboxItem
                        checked={selectedTypes.includes("deposit")}
                        onCheckedChange={(checked) => {
                          setSelectedTypes(
                            checked ? [...selectedTypes, "deposit"] : selectedTypes.filter((t) => t !== "deposit"),
                          )
                        }}
                      >
                        Deposit
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedTypes.includes("withdrawal")}
                        onCheckedChange={(checked) => {
                          setSelectedTypes(
                            checked
                              ? [...selectedTypes, "withdrawal"]
                              : selectedTypes.filter((t) => t !== "withdrawal"),
                          )
                        }}
                      >
                        Withdrawal
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedTypes.includes("transfer")}
                        onCheckedChange={(checked) => {
                          setSelectedTypes(
                            checked ? [...selectedTypes, "transfer"] : selectedTypes.filter((t) => t !== "transfer"),
                          )
                        }}
                      >
                        Transfer
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedStatuses.length > 0 ? `${selectedStatuses.length} selected` : "Select statuses"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuCheckboxItem
                        checked={selectedStatuses.includes("completed")}
                        onCheckedChange={(checked) => {
                          setSelectedStatuses(
                            checked
                              ? [...selectedStatuses, "completed"]
                              : selectedStatuses.filter((s) => s !== "completed"),
                          )
                        }}
                      >
                        Completed
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedStatuses.includes("pending")}
                        onCheckedChange={(checked) => {
                          setSelectedStatuses(
                            checked
                              ? [...selectedStatuses, "pending"]
                              : selectedStatuses.filter((s) => s !== "pending"),
                          )
                        }}
                      >
                        Pending
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedStatuses.includes("failed")}
                        onCheckedChange={(checked) => {
                          setSelectedStatuses(
                            checked ? [...selectedStatuses, "failed"] : selectedStatuses.filter((s) => s !== "failed"),
                          )
                        }}
                      >
                        Failed
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Amount range filter */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Amount Range (₦)</label>
                  <span className="text-sm text-muted-foreground">
                    ₦{amountRange[0]} - ₦{amountRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 10000]}
                  max={10000}
                  step={100}
                  value={amountRange}
                  onValueChange={setAmountRange}
                  className="py-4"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button className="bg-[#0F5CA8] hover:bg-[#0D4E8F] text-white">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </CardFooter>
          </Card>

          {/* Transactions table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transaction History</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
                  </span>
                  <Select
                    defaultValue="5"
                    onValueChange={(value) => {
                      // This would normally update itemsPerPage, but for simplicity we're keeping it static
                    }}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="5" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("id")}>
                          ID
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("date")}>
                          Date & Time
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("amount")}>
                          Amount
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[300px]">Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            {format(transaction.date, "MMM d, yyyy")}
                            <div className="text-xs text-muted-foreground">{format(transaction.date, "h:mm a")}</div>
                          </TableCell>
                          <TableCell>
                            <TypeBadge type={transaction.type} />
                          </TableCell>
                          <TableCell className={transaction.type === "withdrawal" ? "text-red-600" : "text-green-600"}>
                            {transaction.type === "withdrawal" ? "-" : "+"}₦{transaction.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={transaction.status} />
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">{transaction.reference}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No transactions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
