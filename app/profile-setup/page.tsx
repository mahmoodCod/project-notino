"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, Upload, ArrowLeft, GraduationCap, Building2, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    university: "",
    field: "",
    entryYear: "",
    bio: "",
  })
  const [otherUniversity, setOtherUniversity] = useState("")
  const [otherField, setOtherField] = useState("")

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
    setIsLoading(true)

    const finalData = {
      ...formData,
      university: formData.university === "other" ? otherUniversity : formData.university,
      field: formData.field === "other" ? otherField : formData.field,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    localStorage.setItem("userProfileComplete", "true")
    localStorage.setItem("userFullName", finalData.fullName)
    localStorage.setItem("userUniversity", finalData.university)
    localStorage.setItem("userField", finalData.field)
    if (avatarPreview) {
      localStorage.setItem("userProfileImage", avatarPreview)
    }

    setIsLoading(false)
    router.push("/dashboard")
  }

  const currentPersianYear = 1404
  const years = Array.from({ length: 10 }, (_, i) => currentPersianYear - i)

  const isFormValid = () => {
    if (!formData.fullName || !formData.entryYear) return false
    if (formData.university === "other" && !otherUniversity.trim()) return false
    if (!formData.university) return false
    if (formData.field === "other" && !otherField.trim()) return false
    if (!formData.field) return false
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
              دانشجو نت
            </span>
          </Link>
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="gap-2">
            <span>رد کردن</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-l from-primary/10 via-secondary/10 to-accent/10 text-primary px-6 py-3 rounded-full mb-6 border border-primary/20">
            <User className="w-5 h-5" />
            <span className="font-semibold">تکمیل پروفایل</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
            بیایید شما را بهتر بشناسیم
          </h1>
          <p className="text-muted-foreground text-lg">اطلاعات زیر به شما کمک می‌کند تا بهترین تجربه را داشته باشید</p>
        </div>

        <Card className="border-2 shadow-2xl bg-card/50 backdrop-blur">
          <CardHeader className="space-y-3 pb-8">
            <CardTitle className="text-2xl font-bold">اطلاعات شخصی</CardTitle>
            <CardDescription className="text-base">این اطلاعات در پروفایل عمومی شما نمایش داده می‌شود</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-6 pb-6 border-b">
                <Avatar className="w-36 h-36 border-4 border-primary/20 shadow-lg">
                  <AvatarImage src={avatarPreview || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-3xl">
                    <User className="w-20 h-20" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <div className="flex items-center gap-3 bg-gradient-to-l from-secondary/10 to-accent/10 text-secondary hover:from-secondary/20 hover:to-accent/20 px-6 py-3 rounded-xl transition-all duration-200 border border-secondary/20 hover:border-secondary/40 shadow-sm hover:shadow-md">
                      <Upload className="w-5 h-5" />
                      <span className="font-semibold">انتخاب تصویر پروفایل</span>
                    </div>
                    <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </Label>
                  <p className="text-sm text-muted-foreground text-center mt-2">JPG, PNG یا GIF (حداکثر 5MB)</p>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-base font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  نام و نام خانوادگی *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="مثال: علی احمدی"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* University */}
              <div className="space-y-3">
                <Label htmlFor="university" className="text-base font-semibold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  دانشگاه *
                </Label>
                <Select
                  onValueChange={(value) => {
                    setFormData({ ...formData, university: value })
                    if (value !== "other") setOtherUniversity("")
                  }}
                  required
                >
                  <SelectTrigger className="h-12 text-base border-2 focus:border-primary transition-colors">
                    <SelectValue placeholder="دانشگاه خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tehran">دانشگاه تهران</SelectItem>
                    <SelectItem value="sharif">دانشگاه صنعتی شریف</SelectItem>
                    <SelectItem value="amirkabir">دانشگاه صنعتی امیرکبیر</SelectItem>
                    <SelectItem value="shahid-beheshti">دانشگاه شهید بهشتی</SelectItem>
                    <SelectItem value="isfahan">دانشگاه اصفهان</SelectItem>
                    <SelectItem value="tabriz">دانشگاه تبریز</SelectItem>
                    <SelectItem value="shiraz">دانشگاه شیراز</SelectItem>
                    <SelectItem value="mashhad">دانشگاه فردوسی مشهد</SelectItem>
                    <SelectItem value="tehran-polytechnic">دانشگاه صنعتی خواجه نصیرالدین طوسی</SelectItem>
                    <SelectItem value="khaje-nasir">دانشگاه علم و صنعت ایران</SelectItem>
                    <SelectItem value="other">سایر دانشگاه‌ها</SelectItem>
                  </SelectContent>
                </Select>
                {formData.university === "other" && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <Input
                      type="text"
                      placeholder="نام دانشگاه خود را وارد کنید"
                      value={otherUniversity}
                      onChange={(e) => setOtherUniversity(e.target.value)}
                      className="h-12 text-base border-2 border-accent/50 focus:border-accent transition-colors"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Field of Study */}
              <div className="space-y-3">
                <Label htmlFor="field" className="text-base font-semibold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  رشته تحصیلی *
                </Label>
                <Select
                  onValueChange={(value) => {
                    setFormData({ ...formData, field: value })
                    if (value !== "other") setOtherField("")
                  }}
                  required
                >
                  <SelectTrigger className="h-12 text-base border-2 focus:border-primary transition-colors">
                    <SelectValue placeholder="رشته تحصیلی خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer">مهندسی کامپیوتر</SelectItem>
                    <SelectItem value="electrical">مهندسی برق</SelectItem>
                    <SelectItem value="mechanical">مهندسی مکانیک</SelectItem>
                    <SelectItem value="civil">مهندسی عمران</SelectItem>
                    <SelectItem value="industrial">مهندسی صنایع</SelectItem>
                    <SelectItem value="chemistry">مهندسی شیمی</SelectItem>
                    <SelectItem value="physics">فیزیک</SelectItem>
                    <SelectItem value="mathematics">ریاضیات</SelectItem>
                    <SelectItem value="medicine">پزشکی</SelectItem>
                    <SelectItem value="law">حقوق</SelectItem>
                    <SelectItem value="management">مدیریت</SelectItem>
                    <SelectItem value="accounting">حسابداری</SelectItem>
                    <SelectItem value="architecture">معماری</SelectItem>
                    <SelectItem value="psychology">روانشناسی</SelectItem>
                    <SelectItem value="other">سایر رشته‌ها</SelectItem>
                  </SelectContent>
                </Select>
                {formData.field === "other" && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <Input
                      type="text"
                      placeholder="نام رشته تحصیلی خود را وارد کنید"
                      value={otherField}
                      onChange={(e) => setOtherField(e.target.value)}
                      className="h-12 text-base border-2 border-accent/50 focus:border-accent transition-colors"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Entry Year */}
              <div className="space-y-3">
                <Label htmlFor="entryYear" className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  سال ورود *
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, entryYear: value })} required>
                  <SelectTrigger className="h-12 text-base border-2 focus:border-primary transition-colors">
                    <SelectValue placeholder="سال ورود به دانشگاه" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bio */}
              <div className="space-y-3">
                <Label htmlFor="bio" className="text-base font-semibold">
                  درباره من
                </Label>
                <Textarea
                  id="bio"
                  placeholder="چند خط درباره خودتان، علایق و اهداف تحصیلی‌تان بنویسید..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="min-h-28 resize-none text-base border-2 focus:border-primary transition-colors"
                />
                <p className="text-sm text-muted-foreground">
                  این بخش اختیاری است و به دیگران کمک می‌کند شما را بهتر بشناسند
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-13 text-base border-2 hover:bg-muted/50 transition-all bg-transparent"
                  onClick={() => router.push("/dashboard")}
                >
                  رد کردن
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-13 text-base font-bold bg-gradient-to-l from-primary via-secondary to-accent hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>در حال ذخیره...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>ذخیره و ادامه</span>
                      <ArrowLeft className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
