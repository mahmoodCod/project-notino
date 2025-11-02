"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GraduationCap, ArrowLeft, LayoutDashboard, MessageCircle, Upload, User, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
    setMobileMenuOpen(false)
  }

  const handleProtectedLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isAuthenticated) {
      e.preventDefault()
      router.push("/auth")
    }
  }

  const handleMobileLinkClick = (href: string) => {
    if (!isAuthenticated) {
      router.push("/auth")
    } else {
      router.push(href)
    }
    setMobileMenuOpen(false)
  }

  const getInitials = () => {
    if (!user?.name) return "دانشجو"
    const names = user.name.split(" ")
    if (names.length >= 2) {
      return names[0][0] + names[1][0]
    }
    return user.name[0]
  }

  return (
    <header className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
              دانشجو نت
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/dashboard" 
              onClick={(e) => handleProtectedLink(e, "/dashboard")}
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              داشبورد
            </Link>
            <Link 
              href="/chat" 
              onClick={(e) => handleProtectedLink(e, "/chat")}
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              چت
            </Link>
            <Link 
              href="/upload" 
              onClick={(e) => handleProtectedLink(e, "/upload")}
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              آپلود جزوه
            </Link>
            <Link 
              href="/notes" 
              onClick={(e) => handleProtectedLink(e, "/notes")}
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              جزوات
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>

          {/* Desktop Profile & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-9 px-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.profileImage || ""} alt={user?.name || "کاربر"} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block text-sm font-medium">{user?.name || "کاربر"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      پروفایل من
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    خروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="font-medium shadow-md h-9 px-5">
                <Link href="/auth">
                  ورود / ثبت‌نام
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="md:hidden w-72 sm:w-80 p-0 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <SheetTitle className="sr-only">منو</SheetTitle>
          
          <div className="p-6 pb-4 space-y-2">
            {isAuthenticated && (
              <>
                <div className="mb-6">
                  <div className="border-t border-border/50" />
                </div>
                <button
                  onClick={() => {
                    router.push("/profile")
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all duration-200 text-right group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">پروفایل</span>
                </button>
              </>
            )}
            
            <button
              onClick={() => handleMobileLinkClick("/dashboard")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all duration-200 text-right group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <LayoutDashboard className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-sm">داشبورد</span>
            </button>
            <button
              onClick={() => handleMobileLinkClick("/chat")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-accent/50 hover:bg-accent/5 hover:shadow-md transition-all duration-200 text-right group"
            >
              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium text-sm">چت</span>
            </button>
            <button
              onClick={() => handleMobileLinkClick("/upload")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all duration-200 text-right group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-sm">آپلود جزوه</span>
            </button>
            <button
              onClick={() => handleMobileLinkClick("/notes")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 hover:shadow-md transition-all duration-200 text-right group"
            >
              <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <GraduationCap className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-medium text-sm">جزوات</span>
            </button>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-border/50 my-4" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-destructive/20 hover:border-destructive/50 hover:bg-destructive/10 hover:shadow-md transition-all duration-200 text-right group"
                >
                  <div className="p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                    <LogOut className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="font-medium text-sm text-destructive">خروج</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-border/50 my-4" />
                <button
                  onClick={() => {
                    router.push("/auth")
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-l from-primary to-accent text-primary-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium text-sm"
                >
                  ورود / ثبت‌نام
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
