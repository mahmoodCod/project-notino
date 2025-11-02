"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NoteCard } from "@/components/note-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X, GraduationCap, TrendingUp, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react"

// Mock data - در پروژه واقعی از API دریافت می‌شود
const mockNotes = Array.from({ length: 24 }, (_, i) => ({
  id: `note-${i + 1}`,
  title: `جزوه ${i + 1} - ${["ریاضیات", "فیزیک", "شیمی", "برنامه‌نویسی", "مهندسی نرم‌افزار"][i % 5]}`,
  description: "توضیحات کامل و جامع درباره این جزوه که شامل تمام مباحث مهم و کلیدی درس می‌باشد",
  author: {
    name: ["علی احمدی", "سارا محمدی", "رضا کریمی", "فاطمه رضایی", "محمد حسینی"][i % 5],
    avatar: `/placeholder.svg?height=40&width=40&query=avatar${i}`,
    university: ["دانشگاه تهران", "دانشگاه شریف", "دانشگاه امیرکبیر", "دانشگاه صنعتی اصفهان"][i % 4],
  },
  course: ["ریاضیات ۱", "فیزیک ۲", "شیمی عمومی", "برنامه‌نویسی پیشرفته", "مهندسی نرم‌افزار"][i % 5],
  professor: ["دکتر احمدی", "دکتر محمدی", "دکتر کریمی", "دکتر رضایی"][i % 4],
  rating: (4 + Math.random()).toFixed(1),
  downloads: Math.floor(Math.random() * 1000) + 100,
  views: Math.floor(Math.random() * 5000) + 500,
  likes: Math.floor(Math.random() * 500) + 50,
  uploadDate: "۱۴۰۳/۰۸/۱۵",
  tags: [
    ["ریاضی", "جبر"],
    ["فیزیک", "مکانیک"],
    ["شیمی", "آلی"],
    ["پایتون", "جاوا"],
    ["طراحی", "تست"],
  ][i % 5],
}))

const universities = [
  "همه دانشگاه‌ها",
  "دانشگاه تهران",
  "دانشگاه شریف",
  "دانشگاه امیرکبیر",
  "دانشگاه صنعتی اصفهان",
  "دانشگاه فردوسی مشهد",
]

const subjects = ["همه رشته‌ها", "مهندسی کامپیوتر", "مهندسی برق", "مهندسی مکانیک", "ریاضیات", "فیزیک", "شیمی"]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("همه دانشگاه‌ها")
  const [selectedSubject, setSelectedSubject] = useState("همه رشته‌ها")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const notesPerPage = 12

  // Filter and sort logic
  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch =
      searchQuery === "" ||
      note.title.includes(searchQuery) ||
      note.course.includes(searchQuery) ||
      note.professor.includes(searchQuery)
    const matchesUniversity = selectedUniversity === "همه دانشگاه‌ها" || note.author.university === selectedUniversity
    return matchesSearch && matchesUniversity
  })

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "popular") return b.downloads - a.downloads
    if (sortBy === "rating") return Number.parseFloat(b.rating) - Number.parseFloat(a.rating)
    return 0 // newest - default order
  })

  // Pagination
  const totalPages = Math.ceil(sortedNotes.length / notesPerPage)
  const startIndex = (currentPage - 1) * notesPerPage
  const paginatedNotes = sortedNotes.slice(startIndex, startIndex + notesPerPage)

  // Group notes by course for mobile horizontal scrolling
  const groupedNotes = paginatedNotes.reduce((acc, note) => {
    const course = note.course
    if (!acc[course]) {
      acc[course] = []
    }
    acc[course].push(note)
    return acc
  }, {} as Record<string, typeof paginatedNotes>)

  const courseGroups = Object.entries(groupedNotes)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedUniversity("همه دانشگاه‌ها")
    setSelectedSubject("همه رشته‌ها")
    setSortBy("newest")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">کتابخانه جزوات دانشگاهی</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            دسترسی به {sortedNotes.length.toLocaleString("fa-IR")} جزوه از دانشگاه‌های سراسر کشور
          </p>
        </div>

        {/* Search and Filters Bar */}
        <Card className="p-4 mb-6 shadow-md">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="جستجو در عنوان، درس یا استاد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-11"
              />
            </div>

            {/* University Filter */}
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-full lg:w-[200px] h-11">
                <SelectValue placeholder="دانشگاه" />
              </SelectTrigger>
              <SelectContent>
                {universities.map((uni) => (
                  <SelectItem key={uni} value={uni}>
                    {uni}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Subject Filter */}
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full lg:w-[200px] h-11">
                <SelectValue placeholder="رشته تحصیلی" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-[180px] h-11">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    جدیدترین
                  </div>
                </SelectItem>
                <SelectItem value="popular">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    محبوب‌ترین
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    بالاترین امتیاز
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(searchQuery || selectedUniversity !== "همه دانشگاه‌ها" || selectedSubject !== "همه رشته‌ها") && (
              <Button variant="outline" onClick={clearFilters} className="gap-2 h-11 bg-transparent">
                <X className="w-4 h-4" />
                پاک کردن فیلترها
              </Button>
            )}
          </div>
        </Card>

        {/* Active Filters Display */}
        {(searchQuery || selectedUniversity !== "همه دانشگاه‌ها" || selectedSubject !== "همه رشته‌ها") && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <Badge variant="secondary" className="gap-2 py-1.5 px-3">
                جستجو: {searchQuery}
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSearchQuery("")} />
              </Badge>
            )}
            {selectedUniversity !== "همه دانشگاه‌ها" && (
              <Badge variant="secondary" className="gap-2 py-1.5 px-3">
                {selectedUniversity}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => setSelectedUniversity("همه دانشگاه‌ها")}
                />
              </Badge>
            )}
            {selectedSubject !== "همه رشته‌ها" && (
              <Badge variant="secondary" className="gap-2 py-1.5 px-3">
                {selectedSubject}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => setSelectedSubject("همه رشته‌ها")}
                />
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            نمایش {startIndex + 1} تا {Math.min(startIndex + notesPerPage, sortedNotes.length)} از{" "}
            {sortedNotes.length.toLocaleString("fa-IR")} جزوه
          </p>
        </div>

        {/* Notes Grid - Grouped by course with horizontal scroll */}
        {paginatedNotes.length > 0 ? (
          <div className="space-y-6 mb-8">
            {courseGroups.map(([course, notes]) => (
              <div key={course} className="space-y-3">
                <h2 className="text-lg md:text-xl font-bold text-foreground px-2">{course}</h2>
                <div className="relative -mx-4 md:mx-0">
                  <div className="overflow-x-auto scrollbar-hide pb-4 px-4 md:px-0 scroll-smooth">
                    <div className="flex gap-4 min-w-max">
                      {notes.map((note) => (
                        <div key={note.id} className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0 snap-start">
                          <NoteCard note={note} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Fade edge */}
                  <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 z-10">
                    <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">جزوه‌ای یافت نشد</h3>
              <p className="text-muted-foreground">
                متأسفانه با فیلترهای انتخابی شما جزوه‌ای پیدا نشد. لطفاً فیلترهای دیگری را امتحان کنید.
              </p>
              <Button onClick={clearFilters} variant="outline">
                پاک کردن فیلترها
              </Button>
            </div>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className="w-10 h-10"
                    >
                      {page.toLocaleString("fa-IR")}
                    </Button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
    </AuthGuard>
  )
}
