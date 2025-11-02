"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">تماس با ما</h1>
            <p className="text-lg text-muted-foreground">ما همیشه آماده پاسخگویی به سوالات و پیشنهادات شما هستیم</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="font-semibold mb-2">ایمیل</h3>
              <p className="text-sm text-muted-foreground" dir="ltr">
                support@daneshjoonet.ir
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-accent/10 text-accent w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-semibold mb-2">تلفن</h3>
              <p className="text-sm text-muted-foreground" dir="ltr">
                021-12345678
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-secondary/10 text-secondary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-semibold mb-2">آدرس</h3>
              <p className="text-sm text-muted-foreground">تهران، خیابان انقلاب</p>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">فرم تماس</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="نام خود را وارد کنید"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">موضوع</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="موضوع پیام خود را وارد کنید"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">پیام</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="پیام خود را اینجا بنویسید..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                ارسال پیام
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
