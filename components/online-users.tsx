"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users } from "lucide-react"

export function OnlineUsers() {
  const router = useRouter()
  const onlineUsers = [
    { id: "1", name: "محمد رضایی", avatar: "/placeholder.svg?height=40&width=40", status: "آنلاین" },
    { id: "2", name: "سارا محمدی", avatar: "/placeholder.svg?height=40&width=40", status: "آنلاین" },
    { id: "3", name: "علی حسینی", avatar: "/placeholder.svg?height=40&width=40", status: "آنلاین" },
    { id: "4", name: "فاطمه کریمی", avatar: "/placeholder.svg?height=40&width=40", status: "آنلاین" },
  ]

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold">کاربران آنلاین</h3>
        </div>
        <Badge variant="secondary" className="gap-1">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {onlineUsers.length}
        </Badge>
      </div>

      <div className="space-y-2">
        {onlineUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.setItem("openChatWith", user.id)
                router.push("/chat")
              }
            }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10 border-2 border-accent/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-accent/10 text-accent">{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-accent border-2 border-card rounded-full" />
              </div>
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.status}</p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="opacity-0 group-hover:opacity-100 transition-opacity" 
              onClick={(e) => {
                e.stopPropagation()
                if (typeof window !== "undefined") {
                  localStorage.setItem("openChatWith", user.id)
                  router.push("/chat")
                }
              }}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" asChild className="w-full mt-4 bg-transparent">
        <Link href="/chat">مشاهده همه</Link>
      </Button>
    </div>
  )
}
