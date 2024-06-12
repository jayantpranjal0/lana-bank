import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"

// eslint-disable-next-line import/no-unassigned-import
import "./globals.css"
import SideBar from "@/components/sidebar"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

const inter = Inter_Tight({ subsets: ["latin"], display: "auto" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col md:flex-row min-h-screen w-full">
          <SideBar />
          <div className="flex-1 p-6">{children}</div>
        </main>
      </body>
    </html>
  )
}
