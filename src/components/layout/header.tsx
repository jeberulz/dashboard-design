import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header({ currentPage }: { currentPage: string }) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Wallet", href: "/wallet" },
    { name: "Transactions", href: "/transactions" },
    { name: "Schedule", href: "/schedule" },
    { name: "Settings", href: "/settings" },
  ]

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Biyabot Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">Biyabot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  currentPage === item.name.toLowerCase()
                    ? "bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
                    : "text-sm font-medium text-muted-foreground hover:text-foreground"
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
              <Image src="/placeholder.svg?height=32&width=32" alt="User Avatar" width={32} height={32} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Adebimpe Ibrahim</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-12">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={
                      currentPage === item.name.toLowerCase()
                        ? "bg-primary text-primary-foreground px-4 py-3 text-base font-medium"
                        : "text-base font-medium px-4 py-3 text-muted-foreground hover:text-foreground"
                    }
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 