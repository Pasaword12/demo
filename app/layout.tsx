import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Biblioteca DGAC",
  description: "Sistema de gestión de biblioteca para la Dirección General de Aeronáutica Civil",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1">
            <aside className="w-64 border-r bg-card">
              <SidebarNav />
            </aside>
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
