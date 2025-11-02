"use client"

import type React from "react"
import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, CheckCircle2, Home, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const [step, setStep] = useState<"upload" | "details" | "success">("upload")
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [university, setUniversity] = useState<string>("")
  const [customUniversity, setCustomUniversity] = useState<string>("")
  const [faculty, setFaculty] = useState<string>("")
  const [customFaculty, setCustomFaculty] = useState<string>("")
  const [semester, setSemester] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [customCategory, setCustomCategory] = useState<string>("")

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setStep("success")
    }, 2000)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {step !== "success" && (
          <Card className="border-2 shadow-xl">
            <CardHeader className="pb-6">
              <div className="mx-auto bg-gradient-to-br from-primary to-accent text-primary-foreground w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Upload className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl text-center mb-2">آپلود جزوه جدید</CardTitle>
              <CardDescription className="text-sm text-center">
                جزوه خود را با دانشجویان سراسر کشور به اشتراک بگذارید
              </CardDescription>
            </CardHeader>
            <CardContent>
              {file ? (
                <div className="mb-8 p-5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-center justify-between border border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-xl shadow-md">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} مگابایت</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFile(null)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 mb-6 ${
                    dragActive
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-3">فایل خود را اینجا بکشید یا انتخاب کنید</p>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button asChild size="sm" className="shadow-md h-9 px-4 text-sm mb-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 ml-2" />
                      انتخاب فایل
                    </label>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, PPT, PPTX (حداکثر ۵۰ مگابایت)
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-sm font-semibold">
                    نوع جزوه *
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category" className="h-12">
                      <SelectValue placeholder="نوع جزوه را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lecture">جزوه درس</SelectItem>
                      <SelectItem value="exam">نمونه سوال امتحانی</SelectItem>
                      <SelectItem value="summary">خلاصه درس</SelectItem>
                      <SelectItem value="assignment">تمرین و تکلیف</SelectItem>
                      <SelectItem value="project">پروژه</SelectItem>
                      <SelectItem value="presentation">ارائه و اسلاید</SelectItem>
                      <SelectItem value="other">سایر</SelectItem>
                    </SelectContent>
                  </Select>
                  {category === "other" && (
                    <Input
                      id="custom-category"
                      placeholder="نوع جزوه خود را وارد کنید"
                      value={customCategory || ""}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      required
                      className="h-12 text-sm mt-3"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="title" className="text-sm font-semibold">
                    عنوان جزوه *
                  </Label>
                  <Input
                    id="title"
                    placeholder="مثال: جزوه کامل ریاضیات ۱ - فصل مشتق"
                    required
                    className="h-12 text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    توضیحات کامل *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="توضیحات کاملی درباره محتوای جزوه، فصل‌های پوشش داده شده، و نکات مهم بنویسید..."
                    required
                    className="min-h-[140px] resize-none text-sm"
                  />
                  <p className="text-sm text-muted-foreground">حداقل ۵۰ کاراکتر</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="university" className="text-sm font-semibold">
                      دانشگاه *
                    </Label>
                    <Select value={university} onValueChange={setUniversity} required>
                      <SelectTrigger id="university" className="h-12">
                        <SelectValue placeholder="دانشگاه خود را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tehran">دانشگاه تهران</SelectItem>
                        <SelectItem value="sharif">دانشگاه صنعتی شریف</SelectItem>
                        <SelectItem value="amirkabir">دانشگاه صنعتی امیرکبیر</SelectItem>
                        <SelectItem value="shahid-beheshti">دانشگاه شهید بهشتی</SelectItem>
                        <SelectItem value="isfahan">دانشگاه اصفهان</SelectItem>
                        <SelectItem value="shiraz">دانشگاه شیراز</SelectItem>
                        <SelectItem value="tabriz">دانشگاه تبریز</SelectItem>
                        <SelectItem value="mashhad">دانشگاه فردوسی مشهد</SelectItem>
                        <SelectItem value="khaje-nasir">دانشگاه خواجه نصیرالدین طوسی</SelectItem>
                        <SelectItem value="elm-sanat">دانشگاه علم و صنعت</SelectItem>
                        <SelectItem value="allameh">دانشگاه علامه طباطبایی</SelectItem>
                        <SelectItem value="azad-tehran">دانشگاه آزاد اسلامی تهران</SelectItem>
                        <SelectItem value="other">سایر دانشگاه‌ها</SelectItem>
                      </SelectContent>
                    </Select>
                    {university === "other" && (
                      <Input
                        id="custom-university"
                        placeholder="نام دانشگاه خود را وارد کنید"
                        value={customUniversity || ""}
                        onChange={(e) => setCustomUniversity(e.target.value)}
                        required
                        className="h-12 text-sm mt-3"
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="faculty" className="text-sm font-semibold">
                      دانشکده / رشته تحصیلی *
                    </Label>
                    <Select value={faculty} onValueChange={setFaculty} required>
                      <SelectTrigger id="faculty" className="h-12">
                        <SelectValue placeholder="دانشکده یا رشته را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer">مهندسی کامپیوتر</SelectItem>
                        <SelectItem value="electrical">مهندسی برق</SelectItem>
                        <SelectItem value="mechanical">مهندسی مکانیک</SelectItem>
                        <SelectItem value="civil">مهندسی عمران</SelectItem>
                        <SelectItem value="industrial">مهندسی صنایع</SelectItem>
                        <SelectItem value="chemical">مهندسی شیمی</SelectItem>
                        <SelectItem value="math">ریاضیات</SelectItem>
                        <SelectItem value="physics">فیزیک</SelectItem>
                        <SelectItem value="chemistry">شیمی</SelectItem>
                        <SelectItem value="biology">زیست‌شناسی</SelectItem>
                        <SelectItem value="management">مدیریت</SelectItem>
                        <SelectItem value="accounting">حسابداری</SelectItem>
                        <SelectItem value="economics">اقتصاد</SelectItem>
                        <SelectItem value="law">حقوق</SelectItem>
                        <SelectItem value="literature">ادبیات</SelectItem>
                        <SelectItem value="other">سایر</SelectItem>
                      </SelectContent>
                    </Select>
                    {faculty === "other" && (
                      <Input
                        id="custom-faculty"
                        placeholder="نام دانشکده یا رشته خود را وارد کنید"
                        value={customFaculty || ""}
                        onChange={(e) => setCustomFaculty(e.target.value)}
                        required
                        className="h-12 text-sm mt-3"
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="course" className="text-sm font-semibold">
                      نام درس *
                    </Label>
                    <Input id="course" placeholder="مثال: ریاضیات ۱" required className="h-12 text-sm" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="professor" className="text-sm font-semibold">
                      نام استاد *
                    </Label>
                    <Input id="professor" placeholder="مثال: دکتر احمدی" required className="h-12 text-sm" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="year" className="text-sm font-semibold">
                      سال تحصیلی *
                    </Label>
                    <Select required>
                      <SelectTrigger id="year" className="h-12">
                        <SelectValue placeholder="سال تحصیلی را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">سال اول</SelectItem>
                        <SelectItem value="2">سال دوم</SelectItem>
                        <SelectItem value="3">سال سوم</SelectItem>
                        <SelectItem value="4">سال چهارم</SelectItem>
                        <SelectItem value="5">سال پنجم و بالاتر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="semester" className="text-sm font-semibold">
                      ترم تحصیلی
                    </Label>
                    <Input
                      id="semester"
                      placeholder="مثال: ترم 1 تا 8"
                      value={semester || ""}
                      onChange={(e) => setSemester(e.target.value)}
                      className="h-12 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tags" className="text-sm font-semibold">
                    برچسب‌ها (اختیاری)
                  </Label>
                  <Input id="tags" placeholder="برچسب‌ها را با کاما جدا کنید" className="h-12 text-sm" />
                  <p className="text-sm text-muted-foreground">مثال: ریاضیات، کامل، امتحانی، مشتق، انتگرال</p>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setFile(null)
                      setUniversity("")
                      setCustomUniversity("")
                      setFaculty("")
                      setCustomFaculty("")
                      setSemester("")
                      setCategory("")
                      setCustomCategory("")
                    }}
                    className="flex-1 h-12 text-sm"
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                    پاک کردن
                  </Button>
                  <Button type="submit" size="lg" className="flex-1 h-12 text-base shadow-lg" disabled={!file}>
                    <Upload className="w-5 h-5 ml-2" />
                    آپلود جزوه
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card className="border-2 shadow-xl">
            <CardContent className="py-16 text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-accent to-accent/50 text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <CheckCircle2 className="w-14 h-14" />
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  جزوه با موفقیت آپلود شد!
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  جزوه شما پس از بررسی توسط تیم ما منتشر خواهد شد و برای دانشجویان قابل دسترسی می‌شود
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-md mx-auto">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setFile(null)
                    setUniversity("")
                    setCustomUniversity("")
                    setFaculty("")
                    setCustomFaculty("")
                    setSemester("")
                    setCategory("")
                    setCustomCategory("")
                    setStep("upload")
                  }}
                  className="h-12 text-base"
                >
                  <Upload className="w-5 h-5 ml-2" />
                  آپلود جزوه جدید
                </Button>
                <Button size="lg" onClick={() => (window.location.href = "/dashboard")} className="h-12 text-base">
                  <Home className="w-5 h-5 ml-2" />
                  بازگشت به داشبورد
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <SiteFooter />
    </div>
    </AuthGuard>
  )
}
