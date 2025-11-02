"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Send } from "lucide-react"
import { useState } from "react"

export default function ReportPage() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    url: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Report submitted:", formData)
    alert("گزارش شما با موفقیت ثبت شد. تیم ما در اسرع وقت بررسی خواهد کرد.")
    setFormData({ type: "", title: "", description: "", url: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-destructive/10 text-destructive w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">گزارش مشکل</h1>
            <p className="text-lg text-muted-foreground">هر گونه مشکل، محتوای نامناسب یا تخلف را به ما گزارش دهید</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">نوع گزارش</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="نوع مشکل را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inappropriate">محتوای نامناسب</SelectItem>
                    <SelectItem value="spam">اسپم</SelectItem>
                    <SelectItem value="copyright">نقض حق نشر</SelectItem>
                    <SelectItem value="bug">مشکل فنی</SelectItem>
                    <SelectItem value="harassment">آزار و اذیت</SelectItem>
                    <SelectItem value="other">سایر موارد</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">عنوان</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="عنوان مشکل را وارد کنید"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">لینک مربوطه (اختیاری)</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="لطفاً مشکل را با جزئیات توضیح دهید..."
                  rows={6}
                  required
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>توجه:</strong> گزارش‌های شما به صورت محرمانه بررسی می‌شوند. لطفاً اطلاعات دقیق و کامل ارائه دهید
                  تا بتوانیم سریع‌تر رسیدگی کنیم.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                ارسال گزارش
                <Send className="w-4 h-4 mr-2" />
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
