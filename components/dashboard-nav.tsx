"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  GraduationCap,
  Bell,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Menu,
  Heart,
  MessageSquare,
  UserPlus,
} from "lucide-react"

export function DashboardNav() {
  const router = useRouter()
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [unreadMessages, setUnreadMessages] = useState(5)
  const [userName, setUserName] = useState("کاربر")
  const [userProfileImage, setUserProfileImage] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const profileImage = localStorage.getItem("userProfileImage")

    if (name) setUserName(name)
    if (profileImage) setUserProfileImage(profileImage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userName")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userProfileImage")
    router.push("/")
  }

  const notifications = [
    {
      id: 1,
      type: "comment",
      icon: MessageSquare,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      title: "نظر جدید روی جزوه شما",
      description: "محمد رضایی نظری ثبت کرد",
      time: "۲ ساعت پیش",
    },
    {
      id: 2,
      type: "like",
      icon: Heart,
      iconColor: "text-secondary",
      iconBg: "bg-secondary/10",
      title: "جزوه شما لایک شد",
      description: "۱۵ نفر جزوه شما را پسندیدند",
      time: "۵ ساعت پیش",
    },
    {
      id: 3,
      type: "follow",
      icon: UserPlus,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      title: "دنبال‌کننده جدید",
      description: "سارا محمدی شما را دنبال کرد",
      time: "۱ روز پیش",
    },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
            <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground p-2 rounded-xl shadow-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
              دانشجو نت
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-secondary border-0 shadow-lg animate-pulse">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 p-0" sideOffset={8}>
                <DropdownMenuLabel className="p-4 pb-3 border-b bg-gradient-to-l from-primary/5 to-accent/5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold">اعلان‌ها</span>
                    {unreadNotifications > 0 && (
                      <Badge variant="secondary" className="text-xs shadow-sm">
                        {unreadNotifications} خوانده نشده
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="p-4 cursor-pointer hover:bg-gradient-to-l hover:from-primary/5 hover:to-accent/5 transition-all duration-200 border-b last:border-b-0 focus:bg-gradient-to-l focus:from-primary/5 focus:to-accent/5"
                    >
                      <div className="flex gap-3 w-full">
                        <div
                          className={`${notification.iconBg} ${notification.iconColor} p-2 rounded-xl h-fit transition-transform hover:scale-110`}
                        >
                          <notification.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm mb-1 text-foreground">{notification.title}</p>
                          <p className="text-sm text-muted-foreground mb-1 line-clamp-1">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="p-3 border-t bg-muted/30">
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    مشاهده همه اعلان‌ها
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent/10 hover:text-accent transition-all duration-200 hover:scale-110 active:scale-95"
              onClick={() => router.push("/chat")}
            >
              <MessageCircle className="w-5 h-5" />
              {unreadMessages > 0 && (
                <Badge className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-accent border-0 shadow-lg animate-pulse">
                  {unreadMessages}
                </Badge>
              )}
            </Button>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 pr-2 hover:bg-gradient-to-l hover:from-primary/10 hover:to-accent/10 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Avatar className="w-9 h-9 border-2 border-primary/20 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md">
                    {userProfileImage ? (
                      <AvatarImage src={userProfileImage || "/placeholder.svg"} alt={userName} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold">
                        {userName.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="hidden lg:inline font-medium">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
                <DropdownMenuLabel className="pb-2 bg-gradient-to-l from-primary/5 to-accent/5">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{userName}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {localStorage.getItem("userPhone")}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-200 focus:bg-primary/10 focus:text-primary"
                  onClick={() => router.push("/profile")}
                >
                  <User className="ml-2 w-4 h-4" />
                  پروفایل من
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-accent/10 hover:text-accent transition-all duration-200 focus:bg-accent/10 focus:text-accent"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="ml-2 w-4 h-4" />
                  تنظیمات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive cursor-pointer hover:bg-destructive/10 transition-all duration-200 focus:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="ml-2 w-4 h-4" />
                  خروج از حساب
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10 transition-all duration-200">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
