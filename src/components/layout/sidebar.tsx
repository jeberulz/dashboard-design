import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Users, Settings, BarChart2, Bell } from "lucide-react"

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Overview
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/analytics">
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </nav>
    </div>
  )
} 