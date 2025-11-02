import { RegisterForm } from "@/components/register-form"
import { GraduationCap, Users, BookOpen, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
                دانشجو نت
              </h1>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowRight className="w-4 h-4 ml-2" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Side - Features */}
          <div className="w-full lg:w-1/2 max-w-lg space-y-6">
            <div className="text-center lg:text-right space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
                به جامعه دانشجویی
                <span className="block bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                  ایران بپیوند
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                جزوات خود را به اشتراک بگذار، از تجربیات دیگران بهره‌مند شو و با هزاران دانشجو در سراسر کشور ارتباط
                برقرار کن
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">جزوات متنوع</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  دسترسی به هزاران جزوه از تمام دانشگاه‌های کشور
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-accent/10 text-accent w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">چت آنلاین</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  گفتگوی لحظه‌ای با دانشجویان و ارسال پیام صوتی
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-secondary/10 text-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">جامعه فعال</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">ارتباط با دانشجویان از سراسر ایران</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">رتبه‌بندی اساتید</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">نظرات و امتیازات واقعی از دانشجویان</p>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <RegisterForm />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            با عضویت در دانشجو نت، شما{" "}
            <button className="text-primary hover:underline font-medium">قوانین و مقررات</button> را می‌پذیرید
          </p>
        </footer>
      </div>
    </div>
  )
}
