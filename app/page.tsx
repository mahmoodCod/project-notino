"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TypingAnimation } from "@/components/typing-animation"
import { useAuth } from "@/contexts/auth-context"
import {
  Users,
  BookOpen,
  MessageCircle,
  Upload,
  Star,
  Search,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  
  const typingTexts = [
    "به بزرگترین جامعه دانشجویی ایران بپیوندید",
    "به پلتفرم شماره یک جزوات دانشگاهی بپیوندید",
    "به جامعه فعال دانشجویان ایران بپیوندید",
    "به خانواده بزرگ دانشجویان بپیوندید",
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <SiteHeader />

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] flex items-center justify-center">
              <TypingAnimation 
                texts={typingTexts}
                speed={80}
                className="bg-gradient-to-l from-primary via-accent to-secondary bg-clip-text text-transparent text-center"
              />
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              جزوات خود را به اشتراک بگذارید، از تجربیات هزاران دانشجو بهره‌مند شوید و با دوستان جدید در سراسر کشور
              ارتباط برقرار کنید
            </p>

            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button size="lg" asChild className="h-11 px-6 font-medium shadow-lg">
                  <Link href="/auth">
                    شروع رایگان
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-11 px-6 font-medium bg-transparent">
                  <Link href="/notes">مشاهده جزوات</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button size="lg" asChild className="h-11 px-6 font-medium shadow-lg">
                  <Link href="/dashboard">
                    ورود به داشبورد
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-11 px-6 font-medium bg-transparent">
                  <Link href="/notes">مشاهده جزوات</Link>
                </Button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">۱۲۰+</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">دانشگاه</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">۵۰۰۰+</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">جزوه</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary">۲۵۰۰۰+</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">دانشجو</div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">امکانات ویژه دانشجو نت</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              تمام ابزارهایی که برای موفقیت تحصیلی نیاز دارید در یک پلتفرم
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <Link href="/notes" className="block">
              <Card className="p-4 hover:shadow-lg transition-all border hover:border-primary/50 cursor-pointer h-full">
                <div className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">کتابخانه جامع جزوات</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  دسترسی به هزاران جزوه از تمام دانشگاه‌های کشور در تمام رشته‌های تحصیلی
                </p>
                <div className="text-primary font-medium text-xs flex items-center gap-1">
                  مشاهده جزوات
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </Card>
            </Link>

            <Link href="/chat" className="block">
              <Card className="p-4 hover:shadow-lg transition-all border hover:border-accent/50 cursor-pointer h-full">
                <div className="bg-accent/10 text-accent w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">چت آنلاین</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  گفتگوی لحظه‌ای با دانشجویان، ارسال پیام صوتی و تشکیل گروه‌های درسی
                </p>
                <div className="text-accent font-medium text-xs flex items-center gap-1">
                  شروع چت
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </Card>
            </Link>

            <Link href="/upload" className="block">
              <Card className="p-4 hover:shadow-lg transition-all border hover:border-secondary/50 cursor-pointer h-full">
                <div className="bg-secondary/10 text-secondary w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">اشتراک‌گذاری آسان</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  جزوات خود را با چند کلیک ساده آپلود کنید و با دیگران به اشتراک بگذارید
                </p>
                <div className="text-secondary font-medium text-xs flex items-center gap-1">
                  آپلود جزوه
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </Card>
            </Link>

            <Link href="/dashboard" className="block">
              <Card className="p-4 hover:shadow-lg transition-all border hover:border-primary/50 cursor-pointer h-full">
                <div className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">رتبه‌بندی اساتید</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  نظرات و امتیازات واقعی دانشجویان درباره اساتید و دروس مختلف
                </p>
                <div className="text-primary font-medium text-xs flex items-center gap-1">
                  مشاهده رتبه‌بندی
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </Card>
            </Link>

            <Link href="/chat" className="block">
              <Card className="p-4 hover:shadow-lg transition-all border hover:border-accent/50 cursor-pointer h-full">
                <div className="bg-accent/10 text-accent w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">جامعه فعال</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  ارتباط با هزاران دانشجوی فعال از سراسر ایران و تبادل تجربیات
                </p>
                <div className="text-accent font-medium text-xs flex items-center gap-1">
                  پیوستن به جامعه
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </Card>
            </Link>

            <Link href="/notes" className="block">
              <Card className="p-4 hover:shadow-lg transition-all border hover:border-secondary/50 cursor-pointer h-full">
                <div className="bg-secondary/10 text-secondary w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">جستجوی هوشمند</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  پیدا کردن جزوه مورد نظر با جستجوی پیشرفته بر اساس دانشگاه، رشته و استاد
                </p>
                <div className="text-secondary font-medium text-xs flex items-center gap-1">
                  جستجو کنید
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </Card>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-8 md:p-12 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">سوالات متداول</h2>
              <p className="text-muted-foreground">پاسخ به سوالات رایج درباره دانشجو نت</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">چگونه می‌توانم جزوه آپلود کنم؟</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    با ثبت‌نام در سایت و رفتن به بخش آپلود جزوه، می‌توانید جزوات خود را به راحتی آپلود کنید.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">آیا استفاده از دانشجو نت رایگان است؟</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    بله، تمام امکانات دانشجو نت به صورت کاملاً رایگان در دسترس است.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">چگونه با دیگر دانشجویان ارتباط برقرار کنم؟</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    از طریق بخش چت می‌توانید با دانشجویان دیگر گفتگو کنید و تجربیات خود را به اشتراک بگذارید.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">آیا می‌توانم جزوه خاصی را جستجو کنم؟</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    بله، با استفاده از جستجوی پیشرفته می‌توانید جزوات را بر اساس دانشگاه، رشته و استاد پیدا کنید.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/faq">مشاهده سوالات بیشتر</Link>
              </Button>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
