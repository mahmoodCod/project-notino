"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Send,
  Mic,
  ImageIcon,
  Smile,
  Search,
  MoreVertical,
  Phone,
  Video,
  GraduationCap,
  ArrowRight,
  MessageSquare,
  UserX,
  Flag,
  Trash2,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

type Message = {
  id: string
  sender: "me" | "other"
  text: string
  time: string
  type: "text" | "voice"
}

type ChatMessages = {
  [chatId: string]: Message[]
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileChatListOpen, setMobileChatListOpen] = useState(false)
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const previousMessageCountRef = useRef<number>(0)
  const pathname = usePathname()


  const [chatMessages, setChatMessages] = useState<ChatMessages>({
    "1": [
      {
        id: "1",
        sender: "other",
        text: "سلام، حالت چطوره؟",
        time: "۱۰:۱۵",
        type: "text",
      },
      {
        id: "2",
        sender: "me",
        text: "سلام، ممنون خوبم. تو چطوری؟",
        time: "۱۰:۱۶",
        type: "text",
      },
      {
        id: "3",
        sender: "other",
        text: "منم خوبم. راستی جزوه ریاضی رو دیدی؟",
        time: "۱۰:۱۷",
        type: "text",
      },
      {
        id: "4",
        sender: "me",
        text: "آره دیدم، خیلی کامل بود",
        time: "۱۰:۱۸",
        type: "text",
      },
      {
        id: "5",
        sender: "other",
        text: "🎤 پیام صوتی (۰:۱۵)",
        time: "۱۰:۲۰",
        type: "voice",
      },
      {
        id: "6",
        sender: "me",
        text: "باشه حتماً نگاه می‌کنم",
        time: "۱۰:۲۵",
        type: "text",
      },
    ],
    "2": [
      {
        id: "1",
        sender: "other",
        text: "سلام، چطوری؟",
        time: "۰۹:۳۰",
        type: "text",
      },
      {
        id: "2",
        sender: "me",
        text: "سلام، خوبم ممنون",
        time: "۰۹:۳۱",
        type: "text",
      },
    ],
    "3": [
      {
        id: "1",
        sender: "other",
        text: "فردا امتحان داریم، آماده‌ای؟",
        time: "۱۴:۰۰",
        type: "text",
      },
      {
        id: "2",
        sender: "me",
        text: "بله، دارم مطالعه می‌کنم",
        time: "۱۴:۰۵",
        type: "text",
      },
    ],
    "4": [
      {
        id: "1",
        sender: "other",
        text: "جزوه فیزیک رو فرستادم",
        time: "۱۱:۰۰",
        type: "text",
      },
      {
        id: "2",
        sender: "me",
        text: "ممنون، الان نگاه می‌کنم",
        time: "۱۱:۰۵",
        type: "text",
      },
    ],
  })

  const chats = [
    {
      id: "1",
      name: "محمد رضایی",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "سلام، جزوه ریاضی رو دیدی؟",
      time: "۱۰:۳۰",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "سارا محمدی",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "ممنون از کمکت",
      time: "دیروز",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "علی حسینی",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "فردا امتحان داریم",
      time: "دیروز",
      unread: 0,
      online: false,
    },
    {
      id: "4",
      name: "فاطمه کریمی",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "جزوه فیزیک رو فرستادم",
      time: "۲ روز پیش",
      unread: 1,
      online: true,
    },
  ]

  // بررسی اگر از صفحه جزوه یا داشبورد آمده‌ایم، چت با نویسنده را باز کن
  useEffect(() => {
    const checkAndOpenChat = () => {
      const openChatWith = localStorage.getItem("openChatWith")
      if (openChatWith) {
        // پیدا کردن چت با آن نویسنده
        const existingChat = chats.find((chat) => chat.id === openChatWith)
        if (existingChat) {
          setSelectedChat(existingChat.id)
          setMobileChatListOpen(false) // بستن لیست چت در موبایل
          localStorage.removeItem("openChatWith")
          return true
        } else if (chats.length > 0) {
          // اگر چت پیدا نشد، اولین چت را باز می‌کنیم
          setSelectedChat(chats[0].id)
          setMobileChatListOpen(false) // بستن لیست چت در موبایل
          localStorage.removeItem("openChatWith")
          return true
        }
      }
      return false
    }

    // چک کردن بلافاصله
    const found = checkAndOpenChat()

    // اگر چتی پیدا نشد و در موبایل هستیم، Sheet را باز کن
    if (!found && typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileChatListOpen(true)
    }

    // چک کردن مداوم برای تغییرات (مثلاً وقتی کاربر در همین صفحه چت است و روی کاربر دیگری کلیک می‌کند)
    const interval = setInterval(() => {
      if (localStorage.getItem("openChatWith")) {
        checkAndOpenChat()
      }
    }, 100)

    // بعد از 2 ثانیه interval را متوقف می‌کنیم (برای بهینه‌سازی)
    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])


  // اگر چت انتخاب شده پیامی ندارد، لیست خالی برگردان
  const currentMessages = selectedChat && chatMessages[selectedChat] ? chatMessages[selectedChat] : []
  const currentChat = chats.find((chat) => chat.id === selectedChat)

  // فیلتر کردن چت‌ها بر اساس search query
  const filteredChats = chats.filter((chat) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      chat.name.toLowerCase().includes(query) ||
      chat.lastMessage.toLowerCase().includes(query)
    )
  })

  // container چت را پیدا کن و به پایین scroll کن
  const scrollToBottom = () => {
    const messagesContainer = messagesEndRef.current?.closest('.overflow-y-auto')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  // فقط وقتی پیام جدیدی اضافه می‌شود (تعداد پیام‌ها افزایش می‌یابد) scroll کن
  useEffect(() => {
    if (selectedChat && currentMessages.length > previousMessageCountRef.current) {
      previousMessageCountRef.current = currentMessages.length
      setTimeout(() => {
        scrollToBottom()
      }, 150)
    } else if (selectedChat && currentMessages.length !== previousMessageCountRef.current) {
      // وقتی چت جدید انتخاب می‌شود، فقط ref را به‌روزرسانی کن
      previousMessageCountRef.current = currentMessages.length
    }
  }, [currentMessages.length, selectedChat])

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const now = new Date()
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "me",
        text: message.trim(),
        time: timeString,
        type: "text",
      }

      setChatMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }))

      setMessage("")
      console.log("[v0] Message sent:", newMessage)
    }
  }

  const handleVoiceRecord = () => {
    if (!isRecording && selectedChat) {
      setIsRecording(true)
      console.log("[v0] Voice recording started")

      // شبیه‌سازی ضبط صدا - بعد از 2 ثانیه پیام صوتی اضافه می‌شود
      setTimeout(() => {
        const now = new Date()
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

        const voiceMessage: Message = {
          id: Date.now().toString(),
          sender: "me",
          text: "🎤 پیام صوتی (۰:۰۲)",
          time: timeString,
          type: "voice",
        }

        setChatMessages((prev) => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), voiceMessage],
        }))

        setIsRecording(false)
        console.log("[v0] Voice message sent:", voiceMessage)
      }, 2000)
    } else if (isRecording) {
      setIsRecording(false)
      console.log("[v0] Voice recording cancelled")
    }
  }

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId)
    // بستن لیست چت در موبایل بعد از انتخاب
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileChatListOpen(false)
    }
    console.log("[v0] Chat selected:", chatId)
  }

  const handleBackToList = () => {
    setSelectedChat(null)
    // باز کردن لیست چت در موبایل
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileChatListOpen(true)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Card className="h-[calc(100vh-140px)] flex flex-row overflow-hidden border-2 shadow-lg">
          {/* Mobile Chat List Sheet */}
          <Sheet 
            open={mobileChatListOpen} 
            onOpenChange={(open) => {
              // فقط در موبایل کنترل کن
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                // اگر چتی انتخاب نشده، اجازه بستن نده
                if (!open && !selectedChat) {
                  // جلوگیری از بسته شدن Sheet اگر چتی انتخاب نشده
                  return
                }
              }
              // در غیر این صورت، وضعیت را تغییر بده
              setMobileChatListOpen(open)
            }}
          >
            <SheetContent 
              side="right" 
              className="md:hidden w-80 p-0 bg-gradient-to-br from-background via-primary/5 to-accent/5 overflow-hidden [&>button]:hidden"
              onInteractOutside={(e) => {
                // جلوگیری از بسته شدن Sheet با کلیک روی overlay اگر چتی انتخاب نشده
                if (!selectedChat) {
                  e.preventDefault()
                }
              }}
            >
              <SheetTitle className="sr-only">لیست چت‌ها</SheetTitle>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border bg-card/50 backdrop-blur">
                  <div className="flex items-center gap-3 mb-4">
                    {/* دکمه X در سمت چپ - همیشه نمایش داده می‌شود */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        // اول Sheet را ببند
                        setMobileChatListOpen(false)
                        // سپس به صفحه اصلی منتقل شو
                        setTimeout(() => {
                          router.push("/")
                        }, 100)
                      }}
                      className="hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <h2 className="text-lg font-bold flex-1">چت‌ها</h2>
                  </div>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="جستجوی مکالمات..." 
                      className="pr-10" 
                      value={searchQuery || ""}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleSelectChat(chat.id)}
                        className={`p-4 border-b border-border cursor-pointer transition-all duration-200 hover:bg-primary/5 active:bg-primary/10 ${
                          selectedChat === chat.id ? "bg-primary/10 border-r-4 border-r-primary" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12 border-2 border-primary/20">
                              <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {chat.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            {chat.online && (
                              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-accent border-2 border-card rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold truncate text-foreground">{chat.name}</p>
                              <span className="text-xs text-muted-foreground">{chat.time}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                              {chat.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center p-0 text-xs rounded-full animate-pulse">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      <p>مکالمه‌ای یافت نشد</p>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Chat List */}
          <div
            className={`hidden md:flex w-80 border-l border-border flex-col bg-card shrink-0`}
          >
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="جستجوی مکالمات..." 
                  className="pr-10" 
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`p-4 border-b border-border cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
                    selectedChat === chat.id ? "bg-primary/10 border-r-4 border-r-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {chat.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-accent border-2 border-card rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold truncate text-foreground">{chat.name}</p>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center p-0 text-xs rounded-full">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  <p>مکالمه‌ای یافت نشد</p>
                </div>
              )}
            </div>
          </div>

          <div className={`${selectedChat ? "flex" : "hidden md:flex"} flex-1 flex-col min-w-0 relative`}>
            {selectedChat && currentChat ? (
              <>
                <div className="p-4 border-b border-border bg-card/50 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Mobile Menu Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileChatListOpen(true)}
                        className="md:hidden hover:bg-primary/10 transition-all duration-200 animate-in fade-in slide-in-from-left-4"
                      >
                        <Menu className="w-5 h-5" />
                      </Button>
                      <div className="relative">
                        <Avatar className="w-11 h-11 border-2 border-primary/30">
                          <AvatarImage src={currentChat?.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {currentChat?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        {currentChat?.online && (
                          <div className="absolute bottom-0 left-0 w-3 h-3 bg-accent border-2 border-card rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{currentChat?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {currentChat?.online ? "آنلاین" : "آفلاین"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <Video className="w-5 h-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 shadow-md">
                          <DropdownMenuItem 
                            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary/5 transition-colors duration-150" 
                            onClick={() => console.log("حذف کاربر")}
                          >
                            <UserX className="w-4 h-4 text-muted-foreground" />
                            <span>حذف کاربر</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors duration-150" 
                            onClick={() => console.log("گزارش کاربر")}
                          >
                            <Flag className="w-4 h-4" />
                            <span>گزارش کاربر</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pt-6 pb-3 space-y-4 bg-gradient-to-b from-muted/20 to-muted/5">
                  {currentMessages.length > 0 ? (
                    currentMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] md:max-w-[60%] ${
                          msg.sender === "me"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-card border border-border text-foreground rounded-tl-sm"
                        } rounded-2xl px-4 py-3 shadow-md transition-all duration-200 hover:shadow-lg`}
                      >
                        {msg.type === "voice" ? (
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                                msg.sender === "me" ? "bg-primary-foreground/20" : "bg-primary/10"
                              }`}
                            >
                              <Mic className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-[120px]">
                              <div
                                className={`h-1.5 rounded-full ${
                                  msg.sender === "me" ? "bg-primary-foreground/30" : "bg-primary/20"
                                }`}
                              >
                                <div
                                  className={`h-1.5 rounded-full w-1/3 ${
                                    msg.sender === "me" ? "bg-primary-foreground" : "bg-primary"
                                  }`}
                                />
                              </div>
                            </div>
                            <span
                              className={`text-xs ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                            >
                              ۰:۱۵
                            </span>
                          </div>
                        ) : (
                          <p className="leading-relaxed text-[15px]">{msg.text}</p>
                        )}
                        <p
                          className={`text-xs mt-1.5 ${msg.sender === "me" ? "text-primary-foreground/60 text-left" : "text-muted-foreground text-right"}`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">هنوز پیامی رد و بدل نشده است</p>
                        <p className="text-xs text-muted-foreground">پیام خود را بنویسید تا گفتگو شروع شود</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-border bg-card/80 backdrop-blur">
                  <div className="flex items-stretch gap-2">
                    <div className="flex gap-1 items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center justify-center"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center justify-center"
                      >
                        <Smile className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex-1 relative flex items-center">
                      <Input
                        placeholder="پیام خود را بنویسید..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="pr-4 pl-12 h-11 border-2 focus:border-primary transition-all duration-200"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleVoiceRecord}
                        className={`absolute left-1 top-1/2 -translate-y-1/2 h-9 w-9 transition-all duration-200 flex items-center justify-center ${
                          isRecording ? "text-destructive hover:text-destructive" : "hover:text-primary"
                        }`}
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "animate-pulse" : ""}`} />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() && !isRecording}
                      className="shrink-0 h-11 px-5 transition-all duration-200 hover:scale-105 flex items-center justify-center"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  {isRecording && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                      <span className="font-medium">در حال ضبط صدا...</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // صفحه سفید را حذف کن - در موبایل فقط Sheet نمایش داده می‌شود
              null
            )}
          </div>
        </Card>
      </main>
      <SiteFooter />
    </div>
    </AuthGuard>
  )
}
