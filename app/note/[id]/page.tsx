"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Star,
  Share2,
  Flag,
  BookOpen,
  Calendar,
  User,
  MessageCircle,
  Send,
  ArrowRight,
  GraduationCap,
} from "lucide-react"

export default function NoteDetailPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [comment, setComment] = useState("")
  const [liked, setLiked] = useState(false)
  const [rating, setRating] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Mock data
  const note = {
    id: "1",
    title: "جزوه کامل ریاضیات ۱",
    description:
      "این جزوه شامل تمام فصول درس ریاضیات ۱ با مثال‌های حل شده، نکات مهم امتحانی و تمرین‌های تکمیلی می‌باشد. مناسب برای آماده‌سازی امتحانات میان‌ترم و پایان‌ترم.",
    author: {
      id: "author-1",
      name: "محمد رضایی",
      avatar: "/placeholder.svg?height=80&width=80",
      university: "دانشگاه تهران",
      major: "مهندسی کامپیوتر",
      notesCount: 24,
    },
    course: "ریاضیات ۱",
    professor: "دکتر احمدی",
    rating: 4.8,
    ratingsCount: 156,
    downloads: 1234,
    views: 5678,
    likes: 892,
    uploadDate: "۱۴۰۲/۱۲/۱۵",
    pages: 87,
    fileSize: "۴.۵ مگابایت",
    tags: ["ریاضیات", "کامل", "امتحانی", "مثال حل شده"],
  }

  // بررسی mount شدن component در client
  useEffect(() => {
    setMounted(true)
  }, [])

  // بررسی اینکه آیا این جزوه ذخیره شده است یا نه
  useEffect(() => {
    if (mounted && typeof window !== "undefined" && user?.phone) {
      const savedNotes = JSON.parse(localStorage.getItem(`savedNotes_${user.phone}`) || "[]")
      setIsSaved(savedNotes.some((savedNote: { id: string }) => savedNote.id === note.id))
    } else {
      setIsSaved(false)
    }
  }, [mounted, user?.phone, note.id])

  // بررسی اینکه آیا این نویسنده را دنبال کرده‌ایم یا نه
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (mounted && typeof window !== "undefined" && user?.phone) {
      const followedUsers = JSON.parse(localStorage.getItem(`followedUsers_${user.phone}`) || "[]")
      setIsFollowing(followedUsers.some((user: { id: string }) => user.id === note.author.id))
    }
  }, [mounted, note.author.id, user?.phone])

  const comments = [
    {
      id: "1",
      author: {
        name: "سارا محمدی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه شریف",
      },
      text: "جزوه فوق‌العاده‌ای بود! خیلی کامل و مفید. ممنون از زحماتتون",
      date: "۲ روز پیش",
      likes: 12,
    },
    {
      id: "2",
      author: {
        name: "علی حسینی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه امیرکبیر",
      },
      text: "مثال‌های حل شده خیلی خوب بودن. فقط فصل ۴ کمی ناقص بود",
      date: "۵ روز پیش",
      likes: 8,
    },
    {
      id: "3",
      author: {
        name: "فاطمه کریمی",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "دانشگاه صنعتی شریف",
      },
      text: "با این جزوه تونستم نمره خوبی بگیرم. واقعاً عالی بود",
      date: "۱ هفته پیش",
      likes: 15,
    },
  ]

  const relatedNotes = [
    {
      id: "2",
      title: "نمونه سوالات ریاضیات ۱",
      author: "احمد موسوی",
      rating: 4.7,
      downloads: 890,
    },
    {
      id: "3",
      title: "فرمول‌های مهم ریاضیات ۱",
      author: "زهرا احمدی",
      rating: 4.9,
      downloads: 1567,
    },
  ]

  const handleSubmitComment = () => {
    if (comment.trim()) {
      console.log("Submitting comment:", comment)
      setComment("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Note Header */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-balance">{note.title}</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{note.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      if (!isAuthenticated || !user?.phone) {
                        router.push("/auth")
                        return
                      }
                      
                      const savedNotes: Array<{
                        id: string
                        title: string
                        description: string
                        author: { id: string; name: string; avatar: string }
                        course: string
                        professor: string
                        rating: number
                        downloads: number
                        views: number
                        uploadDate: string
                      }> = JSON.parse(localStorage.getItem(`savedNotes_${user.phone}`) || "[]")
                      
                      if (isSaved) {
                        // حذف از لیست ذخیره شده‌ها
                        const updated = savedNotes.filter((savedNote) => savedNote.id !== note.id)
                        localStorage.setItem(`savedNotes_${user.phone}`, JSON.stringify(updated))
                        setIsSaved(false)
                      } else {
                        // اضافه کردن به لیست ذخیره شده‌ها
                        const noteToSave = {
                          id: note.id,
                          title: note.title,
                          description: note.description,
                          author: {
                            id: note.author.id,
                            name: note.author.name,
                            avatar: note.author.avatar,
                          },
                          course: note.course,
                          professor: note.professor,
                          rating: note.rating,
                          downloads: note.downloads,
                          views: note.views,
                          uploadDate: note.uploadDate,
                        }
                        savedNotes.push(noteToSave)
                        localStorage.setItem(`savedNotes_${user.phone}`, JSON.stringify(savedNotes))
                        setIsSaved(true)
                      }
                      
                      // ارسال event برای به‌روزرسانی داشبورد
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("savedNotesUpdated"))
                      }
                    }}
                    className={isSaved ? "text-primary hover:text-primary" : ""}
                  >
                    <Flag className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                  </Button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{note.views.toLocaleString("fa-IR")} بازدید</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>{note.downloads.toLocaleString("fa-IR")} دانلود</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{note.likes.toLocaleString("fa-IR")} پسند</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-bold text-foreground">{note.rating}</span>
                    <span>({note.ratingsCount.toLocaleString("fa-IR")} نظر)</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="flex-1 min-w-[200px] gap-2 shadow-lg">
                    <Download className="w-5 h-5" />
                    دانلود جزوه
                  </Button>
                  <Button
                    size="lg"
                    variant={liked ? "default" : "outline"}
                    onClick={() => setLiked(!liked)}
                    className={`gap-2 ${liked ? "text-primary-foreground" : "bg-transparent hover:bg-primary/10"}`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                    <span className="text-foreground">{liked ? "پسندیدید" : "پسندیدن"}</span>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    <Share2 className="w-5 h-5" />
                    اشتراک‌گذاری
                  </Button>
                </div>

                {/* Rating */}
                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                  <p className="font-medium mb-3">امتیاز شما به این جزوه:</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                        aria-label={`امتیاز ${star} ستاره`}
                        title={`امتیاز ${star} ستاره`}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating ? "fill-secondary text-secondary" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Note Details */}
            <Card>
              <CardHeader>
                <CardTitle>جزئیات جزوه</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">درس</p>
                      <p className="font-medium">{note.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <User className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">استاد</p>
                      <p className="font-medium">{note.professor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">تاریخ آپلود</p>
                      <p className="font-medium">{note.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <Download className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">حجم فایل</p>
                      <p className="font-medium">{note.fileSize}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  نظرات ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="نظر خود را بنویسید..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitComment} disabled={!comment.trim()} className="gap-2">
                      <Send className="w-4 h-4" />
                      ارسال نظر
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-muted/30 rounded-xl space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10 border-2 border-primary/20">
                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {comment.author.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{comment.author.name}</p>
                            <p className="text-sm text-muted-foreground">{comment.author.university}</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-1 h-8">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 h-8">
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card>
              <CardHeader>
                <CardTitle>نویسنده</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 border-4 border-primary/20 mb-3">
                    <AvatarImage src={note.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {note.author.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{note.author.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{note.author.university}</p>
                  <p className="text-sm text-muted-foreground">{note.author.major}</p>
                </div>

                <div className="p-3 bg-muted/50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-primary">{note.author.notesCount}</p>
                  <p className="text-sm text-muted-foreground">جزوه منتشر شده</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => {
                      // ذخیره ID نویسنده برای باز کردن چت در صفحه چت
                      localStorage.setItem("openChatWith", note.author.id)
                      router.push("/chat")
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    ارسال پیام
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`flex-1 transition-colors duration-200 ${
                      isFollowing 
                        ? "bg-primary/10 border-primary text-primary hover:bg-primary/20" 
                        : "bg-transparent hover:bg-primary/10 hover:border-primary/50 hover:text-foreground"
                    }`}
                    onClick={() => {
                      if (user?.phone) {
                        const followedUsers: Array<{ id: string; name: string; avatar: string; university: string; major: string }> = JSON.parse(localStorage.getItem(`followedUsers_${user.phone}`) || "[]")
                        if (isFollowing) {
                          // حذف از لیست دنبال شده‌ها
                          const updated = followedUsers.filter((user) => user.id !== note.author.id)
                          localStorage.setItem(`followedUsers_${user.phone}`, JSON.stringify(updated))
                          // ارسال event برای به‌روزرسانی پروفایل
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("followedUsersUpdated", { detail: { userPhone: user.phone } }))
                          }
                          setIsFollowing(false)
                        } else {
                          // بررسی اینکه آیا قبلاً این کاربر را دنبال کرده‌ایم یا نه
                          const alreadyFollowing = followedUsers.some((user) => user.id === note.author.id)
                          if (!alreadyFollowing) {
                            // اضافه کردن به لیست دنبال شده‌ها
                            const userToFollow = {
                              id: note.author.id,
                              name: note.author.name,
                              avatar: note.author.avatar || "/placeholder.svg?height=80&width=80",
                              university: note.author.university || "",
                              major: note.author.major || "",
                            }
                            followedUsers.push(userToFollow)
                            localStorage.setItem(`followedUsers_${user.phone}`, JSON.stringify(followedUsers))
                            // ارسال event برای به‌روزرسانی پروفایل
                            if (typeof window !== "undefined") {
                              window.dispatchEvent(new CustomEvent("followedUsersUpdated", { detail: { userPhone: user.phone } }))
                            }
                            setIsFollowing(true)
                          }
                        }
                      }
                    }}
                  >
                    <span className="text-foreground">{isFollowing ? "دنبال شده" : "دنبال کردن"}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Notes */}
            <Card>
              <CardHeader>
                <CardTitle>جزوات مرتبط</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedNotes.map((relatedNote) => (
                  <Link key={relatedNote.id} href={`/note/${relatedNote.id}`}>
                    <div className="p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                      <h4 className="font-medium mb-2 leading-tight">{relatedNote.title}</h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{relatedNote.author}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            <span>{relatedNote.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            <span>{relatedNote.downloads}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
