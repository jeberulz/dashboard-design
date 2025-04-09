"use client"

import Image from "next/image"
import Link from "next/link"
import { Copy, Wallet, Search, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Transaction data
const allTransactions = [
  {
    id: "WL-2023-001",
    type: "Deposit",
    amount: 10000,
    date: "May 15, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-002",
    type: "Withdrawal",
    amount: -2500,
    date: "May 18, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-003",
    type: "Deposit",
    amount: 5000,
    date: "May 22, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-004",
    type: "Transfer",
    amount: -3000,
    date: "May 25, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-005",
    type: "Deposit",
    amount: 7500,
    date: "May 30, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-006",
    type: "Deposit",
    amount: 15000,
    date: "Jun 5, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-007",
    type: "Withdrawal",
    amount: -8000,
    date: "Jun 10, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-008",
    type: "Transfer",
    amount: -1200,
    date: "Jun 15, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-009",
    type: "Deposit",
    amount: 3000,
    date: "Jun 22, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-010",
    type: "Withdrawal",
    amount: -5000,
    date: "Jun 28, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-011",
    type: "Deposit",
    amount: 12000,
    date: "Jul 3, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-012",
    type: "Transfer",
    amount: -2000,
    date: "Jul 8, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-013",
    type: "Deposit",
    amount: 4500,
    date: "Jul 15, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-014",
    type: "Withdrawal",
    amount: -3500,
    date: "Jul 22, 2023",
    status: "Completed"
  },
  {
    id: "WL-2023-015",
    type: "Transfer",
    amount: -1800,
    date: "Jul 29, 2023",
    status: "Completed"
  }
]

export default function WalletPage() {
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})
  const [selectAll, setSelectAll] = useState(false)

  // Filter transactions based on search term
  const filteredTransactions = allTransactions.filter(
    transaction => 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + pageSize)
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Handle checkbox selection
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    
    const newSelectedRows = { ...selectedRows }
    
    paginatedTransactions.forEach(transaction => {
      newSelectedRows[transaction.id] = newSelectAll
    })
    
    setSelectedRows(newSelectedRows)
  }

  const toggleRowSelection = (id: string) => {
    const newSelectedRows = { 
      ...selectedRows, 
      [id]: !selectedRows[id] 
    }
    
    setSelectedRows(newSelectedRows)
    
    // Check if all visible rows are selected
    const allSelected = paginatedTransactions.every(transaction => 
      newSelectedRows[transaction.id]
    )
    
    setSelectAll(allSelected)
  }

  const copyBankDetails = () => {
    const details = `Account Name: Adebimpe Ibrahim\nAccount Number: 8216824207\nBank Name: Wema Bank`
    navigator.clipboard
      .writeText(details)
      .then(() => {
        toast.success("Copied to clipboard", {
          description: "Bank details have been copied to clipboard",
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast.error("Failed to copy", {
          description: "Please try again",
        })
      })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage="wallet" />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              {/* Wallet Balance Card */}
              <Card className="bg-[#0F5CA8] text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-medium">Wallet Balance</CardTitle>
                  <Wallet className="h-6 w-6 text-white" />
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold mb-6">₦17,000</div>
                  <Button
                    className="bg-[#F47B4F] hover:bg-[#E06A3E] text-white border-0"
                    onClick={() => setShowTopUpModal(true)}
                  >
                    <span>Top up</span>
                    <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Wallet Details Card */}
              <Card className="bg-[#F5F9FF]">
                <CardHeader>
                  <CardTitle className="text-xl font-medium">Wallet Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Account Name</div>
                    <div className="text-sm font-medium">Adebimpe Ibrahim</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Account Number</div>
                    <div className="text-sm font-medium flex items-center">
                      8216824207
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy account number</span>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Bank Name</div>
                    <div className="text-sm font-medium">Wema Bank</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {/* Wallet Transactions */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl font-bold">Wallet Transactions</h2>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Search..." 
                        className="w-full sm:w-[200px] pl-8" 
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCurrentPage(1) // Reset to first page on search
                        }}
                      />
                    </div>
                    <Button className="bg-[#0F5CA8] hover:bg-[#0D4E8F] text-white whitespace-nowrap">
                      Export Data
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox 
                            checked={selectAll} 
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="w-[50px]">
                            <Checkbox 
                              checked={!!selectedRows[transaction.id]} 
                              onCheckedChange={() => toggleRowSelection(transaction.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                transaction.type === "Deposit" 
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : transaction.type === "Withdrawal"
                                  ? "bg-purple-100 text-purple-800 border-purple-200"
                                  : "bg-indigo-100 text-indigo-800 border-indigo-200"
                              }`}
                            >
                              {transaction.type}
                            </span>
                          </TableCell>
                          <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                            {transaction.amount > 0 ? `₦${transaction.amount.toLocaleString()}` : `-₦${Math.abs(transaction.amount).toLocaleString()}`}
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      Showing {startIndex + 1}-{Math.min(startIndex + pageSize, filteredTransactions.length)} of {filteredTransactions.length}
                    </p>
                    <Select
                      value={pageSize.toString()}
                      onValueChange={(value) => {
                        setPageSize(Number(value))
                        setCurrentPage(1) // Reset to first page when changing page size
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={pageSize} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Top Up Modal */}
      <Dialog open={showTopUpModal} onOpenChange={setShowTopUpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Top Up with Bank Transfer</DialogTitle>
            <DialogDescription className="text-sm pt-2">
              Money transfers sent to this bank account number will automatically top up your Biya wallet. Receive funds
              from any bank account locally, directly to your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Account Name</div>
              <div className="text-sm font-medium">Adebimpe Ibrahim</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Account Number</div>
              <div className="text-sm font-medium">8216824207</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Bank Name</div>
              <div className="text-sm font-medium">Wema Bank</div>
            </div>
            <div className="flex justify-center pt-2">
              <Button className="bg-[#0F5CA8] hover:bg-[#0D4E8F] text-white" onClick={copyBankDetails}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Bank Details
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
