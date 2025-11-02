"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  Camera, 
  Save,
  ArrowLeft,
  Edit2,
  Mail,
  Calendar,
  Award,
  Upload,
  Download,
  Heart,
  Eye,
  Star,
  TrendingUp,
  Shield,
  Users,
  Flag
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    university: "",
    field: "",
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [followedUsers, setFollowedUsers] = useState<Array<{ id: string; name: string; avatar: string; university: string; major: string }>>([])
  const [savedNotes, setSavedNotes] = useState<Array<{
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
  }>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadFollowedUsers = () => {
    if (typeof window !== "undefined" && user?.phone) {
      try {
        const stored = JSON.parse(localStorage.getItem(`followedUsers_${user.phone}`) || "[]")
        if (Array.isArray(stored)) {
          const validUsers = stored.filter((user) => 
            user && 
            typeof user === "object" && 
            user.id && 
            user.name && 
            typeof user.name === "string"
          )
          setFollowedUsers(validUsers)
        } else {
          setFollowedUsers([])
        }
      } catch (error) {
        console.error("Error loading followed users:", error)
        setFollowedUsers([])
      }
    } else {
      setFollowedUsers([])
    }
  }

  const loadSavedNotes = () => {
    if (typeof window !== "undefined" && user?.phone) {
      try {
        const stored = JSON.parse(localStorage.getItem(`savedNotes_${user.phone}`) || "[]")
        if (Array.isArray(stored)) {
          setSavedNotes(stored)
        } else {
          setSavedNotes([])
        }
      } catch (error) {
        console.error("Error loading saved notes:", error)
        setSavedNotes([])
      }
    }
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        university: user.university || "",
        field: user.field || "",
      })
      setAvatarPreview(user.profileImage || null)
    }
  }, [user])

  useEffect(() => {
    if (mounted) {
      loadFollowedUsers()
      loadSavedNotes()
    }
  }, [mounted, user?.phone])

  useEffect(() => {
    if (!mounted) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `followedUsers_${user?.phone}`) {
        loadFollowedUsers()
      } else if (e.key?.startsWith("savedNotes_")) {
        loadSavedNotes()
      }
    }

    const handleFollowedUsersUpdated = (e: Event) => {
      // اگر CustomEvent است، چک کن که برای همین کاربر است
      if (e instanceof CustomEvent) {
        if (e.detail?.userPhone === user?.phone || !e.detail) {
          loadFollowedUsers()
        }
      } else {
        // اگر Event معمولی است (برای backward compatibility)
        loadFollowedUsers()
      }
    }


    const handleSavedNotesUpdated = () => {
      loadSavedNotes()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("followedUsersUpdated", handleFollowedUsersUpdated)
    window.addEventListener("savedNotesUpdated", handleSavedNotesUpdated)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("followedUsersUpdated", handleFollowedUsersUpdated)
      window.removeEventListener("savedNotesUpdated", handleSavedNotesUpdated)
    }
  }, [mounted, user?.phone])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({
      name: formData.name,
      phone: formData.phone,
      university: formData.university,
      field: formData.field,
      profileImage: avatarPreview,
    })
    setIsEditing(false)
  }

  const getInitials = () => {
    if (!formData.name) return "دانشجو"
    const names = formData.name.split(" ")
    if (names.length >= 2) {
      return names[0][0] + names[1][0]
    }
    return formData.name[0]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Mock statistics - در پروژه واقعی از API دریافت می‌شود
  const stats = {
    uploadedNotes: 12,
    downloadedNotes: 45,
    likes: 234,
    views: 1234,
    rating: 4.8,
    joinedDate: "۱۴۰۳/۰۵/۱۵"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <SiteHeader />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          بازگشت
        </Button>

        {/* Profile Header Card */}
        <Card className="p-0 md:p-0 shadow-xl border-0 overflow-hidden mb-6">
          <div className="bg-gradient-to-l from-primary via-accent to-primary p-8 md:p-12 text-primary-foreground relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 md:w-40 md:h-40 border-4 border-primary-foreground/20 shadow-2xl">
                  <AvatarImage src={avatarPreview || ""} alt={formData.name || "کاربر"} />
                  <AvatarFallback className="text-2xl md:text-4xl bg-primary-foreground/10 text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 left-0 bg-background text-foreground p-3 rounded-full cursor-pointer hover:bg-background/90 transition-colors shadow-lg border-2 border-primary-foreground/20">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      aria-label="تغییر تصویر پروفایل"
                      title="تغییر تصویر پروفایل"
                    />
                  </label>
                )}
              </div>
              <div className="flex-1 text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end gap-3 mb-2">
                  <h1 className="text-xl md:text-5xl font-bold">
                    {formData.name || "کاربر"}
                  </h1>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 text-xs md:text-sm">
                    <Shield className="w-3 h-3 ml-1" />
                    تأیید شده
                  </Badge>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-4 text-primary-foreground/90 mb-3">
                  {formData.university && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                      <p className="text-sm md:text-lg font-medium">{formData.university}</p>
                    </div>
                  )}
                  {formData.field && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                      <p className="text-sm md:text-lg font-medium">{formData.field}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <div className="flex items-center gap-1 bg-primary-foreground/20 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm">
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                    <span className="font-bold">{stats.rating}</span>
                  </div>
                  <p className="text-primary-foreground/80 text-xs md:text-sm">عضو از {stats.joinedDate}</p>
                </div>
              </div>
              {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
                  size="lg"
                >
                  <Edit2 className="w-4 h-4 ml-2" />
                  ویرایش پروفایل
                </Button>
              )}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 bg-background">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm md:text-base font-medium">
                      <User className="w-4 h-4 text-primary" />
                      نام و نام خانوادگی
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="نام خود را وارد کنید"
                      className="h-10 md:h-12 text-sm md:text-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm md:text-base font-medium">
                      <Phone className="w-4 h-4 text-primary" />
                      شماره موبایل
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      dir="ltr"
                      className="h-10 md:h-12 text-sm md:text-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university" className="flex items-center gap-2 text-sm md:text-base font-medium">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      دانشگاه
                    </Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      placeholder="نام دانشگاه را وارد کنید"
                      className="h-10 md:h-12 text-sm md:text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="field" className="flex items-center gap-2 text-sm md:text-base font-medium">
                      <BookOpen className="w-4 h-4 text-primary" />
                      رشته تحصیلی
                    </Label>
                    <Input
                      id="field"
                      value={formData.field}
                      onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                      placeholder="رشته تحصیلی را وارد کنید"
                      className="h-10 md:h-12 text-sm md:text-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 h-10 md:h-12 text-sm md:text-lg font-medium" size="lg">
                    <Save className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                    ذخیره تغییرات
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    className="h-10 md:h-12 text-sm md:text-lg font-medium"
                    onClick={() => {
                      setIsEditing(false)
                      if (user) {
                        setFormData({
                          name: user.name || "",
                          phone: user.phone || "",
                          university: user.university || "",
                          field: user.field || "",
                        })
                        setAvatarPreview(user.profileImage || null)
                      }
                    }}
                  >
                    انصراف
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <Card className="p-4 md:p-5 border-2 hover:border-primary/50 transition-colors">
                  <Label className="flex items-center gap-2 text-muted-foreground mb-3 text-sm md:text-base">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    شماره موبایل
                  </Label>
                  <p className="text-base md:text-xl font-bold">{formData.phone || "ثبت نشده"}</p>
                </Card>

                <Card className="p-4 md:p-5 border-2 hover:border-accent/50 transition-colors">
                  <Label className="flex items-center gap-2 text-muted-foreground mb-3 text-sm md:text-base">
                    <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                    دانشگاه
                  </Label>
                  <p className="text-base md:text-xl font-bold">{formData.university || "ثبت نشده"}</p>
                </Card>

                <Card className="p-4 md:p-5 border-2 hover:border-secondary/50 transition-colors">
                  <Label className="flex items-center gap-2 text-muted-foreground mb-3 text-sm md:text-base">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                    رشته تحصیلی
                  </Label>
                  <p className="text-base md:text-xl font-bold">{formData.field || "ثبت نشده"}</p>
                </Card>

                <Card className="p-4 md:p-5 border-2 hover:border-primary/50 transition-colors">
                  <Label className="flex items-center gap-2 text-muted-foreground mb-3 text-sm md:text-base">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    تاریخ عضویت
                  </Label>
                  <p className="text-base md:text-xl font-bold">{stats.joinedDate}</p>
                </Card>
              </div>
            )}
          </div>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <Upload className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-primary/60" />
            </div>
            <p className="text-xl md:text-3xl font-bold mb-1">{stats.uploadedNotes}</p>
            <p className="text-xs md:text-sm text-muted-foreground">جزوه آپلود شده</p>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <Download className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-accent/60" />
            </div>
            <p className="text-xl md:text-3xl font-bold mb-1">{stats.downloadedNotes}</p>
            <p className="text-xs md:text-sm text-muted-foreground">جزوه دانلود شده</p>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-secondary/60" />
            </div>
            <p className="text-xl md:text-3xl font-bold mb-1">{stats.likes}</p>
            <p className="text-xs md:text-sm text-muted-foreground">لایک دریافت شده</p>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-primary/60" />
            </div>
            <p className="text-xl md:text-3xl font-bold mb-1">{stats.views.toLocaleString()}</p>
            <p className="text-xs md:text-sm text-muted-foreground">بازدید کل</p>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="p-4 md:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary p-2 md:p-3 rounded-xl">
              <Award className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold">دستاوردها</h2>
              <p className="text-muted-foreground text-xs md:text-base">دستاوردهای شما در دانشجو نت</p>
            </div>
          </div>
          <div className="relative -mx-4 md:mx-0">
            <div className="overflow-x-auto scrollbar-hide pb-4 px-4 scroll-smooth md:overflow-visible md:pb-0 md:px-0">
              <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-3 md:gap-4">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-4 md:p-5 text-center min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start hover:shadow-lg transition-all">
                  <Star className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3 fill-primary" />
                  <p className="font-bold text-base md:text-lg mb-1">جزوه برتر</p>
                  <p className="text-xs md:text-sm text-muted-foreground">۳ جزوه شما جزو پربازدیدترین‌هاست</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 rounded-xl p-4 md:p-5 text-center min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start hover:shadow-lg transition-all">
                  <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-accent mx-auto mb-3" />
                  <p className="font-bold text-base md:text-lg mb-1">نویسنده فعال</p>
                  <p className="text-xs md:text-sm text-muted-foreground">۱۰+ جزوه در ماه گذشته</p>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-4 md:p-5 text-center min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start hover:shadow-lg transition-all">
                  <Heart className="w-8 h-8 md:w-10 md:h-10 text-secondary mx-auto mb-3" />
                  <p className="font-bold text-base md:text-lg mb-1">محبوب کاربران</p>
                  <p className="text-xs md:text-sm text-muted-foreground">امتیاز ۴.۸ از ۵</p>
                </div>
              </div>
            </div>
            {/* Fade edge for mobile */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 md:hidden z-10">
              <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
            </div>
          </div>
        </Card>

        {/* Saved Notes Section */}
        <Card className="p-4 md:p-8 shadow-xl mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary p-2 md:p-3 rounded-xl">
              <Flag className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold">جزوات ذخیره شده</h2>
              <p className="text-muted-foreground text-xs md:text-base">جزواتی که شما ذخیره کرده‌اید</p>
            </div>
          </div>
          {savedNotes.length > 0 ? (
            <div className="space-y-4">
              {savedNotes.map((savedNote) => (
                <Link key={savedNote.id} href={`/note/${savedNote.id}`}>
                  <div className="bg-card border-2 border-border rounded-xl p-4 md:p-5 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                    <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2">{savedNote.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{savedNote.description}</p>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span>{savedNote.course}</span>
                        <span>{savedNote.professor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-secondary text-secondary" />
                        <span className="font-medium">{savedNote.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Flag className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-sm md:text-lg">هنوز جزوه‌ای ذخیره نکرده‌اید</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">برای ذخیره کردن جزوه، روی پرچم در صفحه جزوه کلیک کنید</p>
            </div>
          )}
        </Card>

        {/* Followed Users Section */}
        <Card className="p-4 md:p-8 shadow-xl mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary p-2 md:p-3 rounded-xl">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold">نویسندگان دنبال شده</h2>
              <p className="text-muted-foreground text-xs md:text-base">نویسندگانی که شما دنبال می‌کنید</p>
            </div>
          </div>
          {followedUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followedUsers
                .filter((followedUser) => followedUser && followedUser.name && followedUser.id)
                .map((followedUser) => (
                  <Link key={followedUser.id} href={`/note/1`}>
                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 hover:shadow-md transition-all cursor-pointer border-2 border-border hover:border-primary/50">
                      <Avatar className="w-12 h-12 md:w-16 md:h-16 border-2 border-primary/20">
                        <AvatarImage src={followedUser.avatar || "/placeholder.svg?height=64&width=64"} />
                        <AvatarFallback className="bg-primary/10 text-primary text-base md:text-xl">
                          {followedUser.name && followedUser.name.length > 0 ? followedUser.name[0] : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm md:text-lg truncate">{followedUser.name || "نامشخص"}</p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">{followedUser.university || ""}</p>
                        {followedUser.major && (
                          <p className="text-xs text-muted-foreground truncate">{followedUser.major}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-sm md:text-lg">هنوز کسی را دنبال نکرده‌اید</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">برای دنبال کردن نویسنده، روی دکمه "دنبال کردن" در صفحه جزوه کلیک کنید</p>
            </div>
          )}
        </Card>
      </div>
      <SiteFooter />
    </div>
  )
}

