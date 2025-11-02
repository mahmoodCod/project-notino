"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MessageCircle,
  Upload,
  TrendingUp,
  Star,
  Filter,
  GraduationCap,
  BookOpen,
  Users,
  Clock,
} from "lucide-react"
import { NoteCard } from "@/components/note-card"
import { OnlineUsers } from "@/components/online-users"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AuthGuard } from "@/components/auth-guard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSort, setSelectedSort] = useState("popular")
  const selectTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateSelectHeight = () => {
      if (selectTriggerRef.current && window.innerWidth >= 768) {
        selectTriggerRef.current.style.height = '3.5rem'
        selectTriggerRef.current.style.minHeight = '3.5rem'
      } else if (selectTriggerRef.current) {
        selectTriggerRef.current.style.height = '2.5rem'
        selectTriggerRef.current.style.minHeight = '2.5rem'
      }
    }
    
    updateSelectHeight()
    window.addEventListener('resize', updateSelectHeight)
    return () => window.removeEventListener('resize', updateSelectHeight)
  }, [])

  // Mock data for notes
  const allNotes = [
    {
      id: "1",
      title: "جزوه کامل ریاضیات ۱",
      description: "شامل تمام فصول با مثال‌های حل شده و نکات مهم امتحانی",
      author: {
        name: "محمد رضایی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه تهران",
      },
      course: "ریاضیات ۱",
      professor: "دکتر احمدی",
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      likes: 892,
      uploadDate: "۲ روز پیش",
      tags: ["ریاضیات", "کامل", "امتحانی"],
    },
    {
      id: "2",
      title: "خلاصه فیزیک ۲ - فصل الکتریسیته",
      description: "خلاصه کامل فصل الکتریسیته با فرمول‌های مهم",
      author: {
        name: "سارا محمدی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه شریف",
      },
      course: "فیزیک ۲",
      professor: "دکتر کریمی",
      rating: 4.9,
      downloads: 987,
      views: 3456,
      likes: 654,
      uploadDate: "۱ هفته پیش",
      tags: ["فیزیک", "الکتریسیته", "خلاصه"],
    },
    {
      id: "3",
      title: "نمونه سوالات برنامه‌نویسی پیشرفته",
      description: "مجموعه سوالات امتحانی ترم‌های گذشته با پاسخ تشریحی",
      author: {
        name: "علی حسینی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه امیرکبیر",
      },
      course: "برنامه‌نویسی پیشرفته",
      professor: "دکتر موسوی",
      rating: 4.7,
      downloads: 2341,
      views: 8901,
      likes: 1234,
      uploadDate: "۳ روز پیش",
      tags: ["برنامه‌نویسی", "نمونه سوال", "امتحان"],
    },
    {
      id: "4",
      title: "جزوه شیمی عمومی",
      description: "جزوه کامل شیمی عمومی با مثال‌های کاربردی",
      author: {
        name: "فاطمه رضایی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه تهران",
      },
      course: "شیمی عمومی",
      professor: "دکتر رضایی",
      rating: 4.6,
      downloads: 856,
      views: 2341,
      likes: 543,
      uploadDate: "۵ روز پیش",
      tags: ["شیمی", "عمومی"],
    },
    {
      id: "5",
      title: "جزوه ریاضیات ۲",
      description: "جزوه جامع ریاضیات ۲ با تمرین‌های حل شده",
      author: {
        name: "رضا کریمی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه شریف",
      },
      course: "ریاضیات ۲",
      professor: "دکتر احمدی",
      rating: 4.5,
      downloads: 1123,
      views: 4567,
      likes: 678,
      uploadDate: "۱ هفته پیش",
      tags: ["ریاضیات", "جبر"],
    },
  ]

  // Filter notes based on search query
  const filteredNotes = allNotes.filter((note) => {
    if (!searchQuery.trim()) return true
    
    const query = searchQuery.toLowerCase()
    return (
      note.title.toLowerCase().includes(query) ||
      note.course.toLowerCase().includes(query) ||
      note.professor.toLowerCase().includes(query) ||
      note.description.toLowerCase().includes(query) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (selectedSort === "popular") return b.downloads - a.downloads
    if (selectedSort === "rating") {
      const ratingA = typeof a.rating === "string" ? Number.parseFloat(a.rating) : a.rating
      const ratingB = typeof b.rating === "string" ? Number.parseFloat(b.rating) : b.rating
      return ratingB - ratingA
    }
    if (selectedSort === "newest") return 0 // For now, keep original order
    return 0
  })

  // Display notes (limit to 3 for trending section)
  const trendingNotes = sortedNotes.slice(0, 3)

  const stats = [
    { label: "جزوات موجود", value: "۱۲,۳۴۵", icon: BookOpen, color: "text-primary" },
    { label: "دانشجویان فعال", value: "۸,۹۰۱", icon: Users, color: "text-accent" },
    { label: "دانشگاه‌ها", value: "۱۵۰+", icon: GraduationCap, color: "text-secondary" },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <SiteHeader />

        {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-6 md:mb-8">
          <div className="bg-gradient-to-l from-primary via-accent to-primary p-5 md:p-8 rounded-2xl md:rounded-3xl text-primary-foreground shadow-2xl mb-4 md:mb-6">
            <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-3 text-balance">به دانشجو نت خوش آمدید</h1>
            <p className="text-sm md:text-lg opacity-90 mb-4 md:mb-6 text-pretty">
              به هزاران جزوه دانشگاهی دسترسی داشته باشید و تجربیات خود را با دیگران به اشتراک بگذارید
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 md:gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="جستجوی جزوه، درس یا استاد..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 md:h-14 pr-10 md:pr-12 bg-background text-foreground border-0 shadow-lg text-sm md:text-base"
                />
              </div>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger ref={selectTriggerRef} size="default" className="w-[120px] md:w-[140px] bg-background text-foreground border-0 shadow-lg px-2 md:px-3 text-xs md:text-sm" style={{ height: '2.5rem', minHeight: '2.5rem' }}>
                  <SelectValue placeholder="دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">محبوب‌ترین</SelectItem>
                  <SelectItem value="rating">بالاترین امتیاز</SelectItem>
                  <SelectItem value="newest">جدیدترین</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats */}
          <div className="relative -mx-4 md:mx-0">
            <div className="overflow-x-auto scrollbar-hide pb-4 px-4 scroll-smooth md:overflow-visible md:pb-0 md:px-0">
              <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-3 md:gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} bg-current/10 p-3 rounded-xl`}>
                        <stat.icon className="w-7 h-7 md:w-8 md:h-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Fade edge for mobile */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 md:hidden z-10">
              <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm">
              <h2 className="text-sm md:text-xl font-bold mb-2 md:mb-4">دسترسی سریع</h2>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="h-auto py-2 md:py-4 flex-col gap-1 md:gap-2 bg-transparent hover:bg-primary/10 hover:border-primary/50 hover:shadow-md hover:text-foreground transition-all duration-200 group"
                >
                  <Link href="/upload">
                    <Upload className="w-4 h-4 md:w-6 md:h-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium text-foreground text-xs md:text-base">آپلود جزوه</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="h-auto py-2 md:py-4 flex-col gap-1 md:gap-2 bg-transparent hover:bg-accent/10 hover:border-accent/50 hover:shadow-md hover:text-foreground transition-all duration-200 group"
                >
                  <Link href="/chat">
                    <MessageCircle className="w-4 h-4 md:w-6 md:h-6 text-accent group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium text-foreground text-xs md:text-base">چت با دانشجویان</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Trending Notes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">جزوات پرطرفدار</h2>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary">
                  مشاهده همه
                </Button>
              </div>

              <div className="relative -mx-4 md:mx-0">
                <div className="overflow-x-auto scrollbar-hide pb-4 px-4 scroll-smooth md:overflow-visible md:pb-0 md:px-0">
                  <div className="flex gap-4 min-w-max md:min-w-0 md:flex-col md:space-y-4 md:space-x-0 md:gap-0">
                    {trendingNotes.length > 0 ? (
                      trendingNotes.map((note) => (
                        <div key={note.id} className="min-w-[320px] md:min-w-0 flex-shrink-0 md:flex-shrink">
                          <NoteCard note={note} />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 min-w-full">
                        <p className="text-muted-foreground text-lg">نتیجه‌ای یافت نشد</p>
                        <p className="text-sm text-muted-foreground mt-2">لطفا عبارت جستجوی خود را تغییر دهید</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Fade edge for mobile */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 md:hidden z-10">
                  <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Users */}
            <OnlineUsers />

            {/* Top Professors */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-bold">اساتید برتر</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "دکتر احمدی", rating: 4.9, reviews: 234 },
                  { name: "دکتر کریمی", rating: 4.8, reviews: 189 },
                  { name: "دکتر موسوی", rating: 4.7, reviews: 156 },
                ].map((prof, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-secondary/20">
                        <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                        <AvatarFallback className="bg-secondary/10 text-secondary">
                          {prof.name.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{prof.name}</p>
                        <p className="text-sm text-muted-foreground">{prof.reviews} نظر</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">{prof.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-bold">فعالیت‌های اخیر</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">محمد رضایی</span> جزوه جدیدی آپلود کرد
                    </p>
                    <p className="text-xs text-muted-foreground">۲ ساعت پیش</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <div>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">سارا محمدی</span> نظری ثبت کرد
                    </p>
                    <p className="text-xs text-muted-foreground">۵ ساعت پیش</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                  <div>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">علی حسینی</span> به شما پیام داد
                    </p>
                    <p className="text-xs text-muted-foreground">۱ روز پیش</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
    </AuthGuard>
  )
}
