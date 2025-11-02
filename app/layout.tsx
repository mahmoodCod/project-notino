import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "دانشجو نت | پلتفرم اشتراک جزوات دانشگاهی",
  description: "پلتفرم ملی اشتراک‌گذاری جزوات و همکاری دانشجویان ایرانی",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
