"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Users, FileText, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Inicio",
    href: "/",
    icon: Home,
  },
  {
    title: "Libros",
    href: "/libros",
    icon: BookOpen,
  },
  {
    title: "Usuarios",
    href: "/usuarios",
    icon: Users,
  },
  {
    title: "Préstamos",
    href: "/prestamos",
    icon: FileText,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
