"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Phone, ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function AuthForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [step, setStep] = useState<"phone" | "code" | "profile">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // شبیه‌سازی ارسال کد تایید
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setStep("code")
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // بررسی کد تایید - کد ثابت 123456
    if (verificationCode !== "123456") {
      alert("کد تایید اشتباه است. لطفاً کد 123456 را وارد کنید.")
      return
    }

    setIsLoading(true)

    // شبیه‌سازی تایید کد
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)

    // بررسی اینکه کاربر جدید است یا قبلا ثبت‌نام کرده
    // در اینجا فرض می‌کنیم کاربر جدید است
    const isNewUser = true

    if (isNewUser) {
      setStep("profile")
    } else {
      // اگر کاربر قبلا ثبت‌نام کرده
      login({
        name: localStorage.getItem("userName") || localStorage.getItem("userFullName"),
        phone: phoneNumber,
        profileImage: localStorage.getItem("userProfileImage"),
        university: localStorage.getItem("userUniversity"),
        field: localStorage.getItem("userField"),
      })
      router.push("/dashboard")
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // شبیه‌سازی ثبت اطلاعات
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // استفاده از login function از context
    login({
      name,
      phone: phoneNumber,
      profileImage: null,
      university: null,
      field: null,
    })

    setIsLoading(false)

    // هدایت به داشبورد
    router.push("/dashboard")
  }

  return (
    <Card className="p-4 md:p-8 shadow-2xl border-2 border-primary/10">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-3xl font-bold">
            {step === "phone" && "ورود / ثبت‌نام"}
            {step === "code" && "تایید شماره موبایل"}
            {step === "profile" && "اطلاعات اولیه"}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {step === "phone" && "شماره موبایل خود را وارد کنید"}
            {step === "code" && "کد ارسال شده به شماره موبایل را وارد کنید"}
            {step === "profile" && "لطفا نام خود را وارد کنید"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-1 md:gap-2">
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors ${
              step === "phone" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
            }`}
          >
            {step !== "phone" ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : "۱"}
          </div>
          <div className={`h-1 w-8 md:w-12 ${step !== "phone" ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors ${
              step === "code"
                ? "bg-primary text-primary-foreground"
                : step === "profile"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {step === "profile" ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : "۲"}
          </div>
          <div className={`h-1 w-8 md:w-12 ${step === "profile" ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors ${
              step === "profile" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            ۳
          </div>
        </div>

        {/* Phone Step */}
        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm md:text-base font-medium">
                شماره موبایل
              </Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-10 md:h-12 pr-10 md:pr-11 text-sm md:text-lg"
                  dir="ltr"
                  required
                />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">کد تایید به این شماره ارسال خواهد شد</p>
            </div>

            <Button type="submit" className="w-full h-10 md:h-12 text-sm md:text-lg font-bold" disabled={isLoading}>
              {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
              {!isLoading && <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />}
            </Button>
          </form>
        )}

        {/* Code Step */}
        {step === "code" && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm md:text-base font-medium">
                کد تایید
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="- - - - - -"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="h-10 md:h-12 text-center text-xl md:text-2xl tracking-widest"
                dir="ltr"
                maxLength={6}
                required
              />
              <p className="text-xs md:text-sm text-muted-foreground text-center">کد تایید به شماره {phoneNumber} ارسال شد</p>
              <p className="text-xs md:text-sm text-primary font-medium text-center mt-1">
                💡 کد تایید تست: <span className="font-bold">123456</span>
              </p>
            </div>

            <Button type="submit" className="w-full h-10 md:h-12 text-sm md:text-lg font-bold" disabled={isLoading}>
              {isLoading ? "در حال تایید..." : "تایید و ادامه"}
              {!isLoading && <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />}
            </Button>

            <Button type="button" variant="ghost" className="w-full text-xs md:text-base" onClick={() => setStep("phone")}>
              تغییر شماره موبایل
            </Button>
          </form>
        )}

        {/* Profile Step */}
        {step === "profile" && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm md:text-base font-medium">
                نام و نام خانوادگی
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="نام خود را وارد کنید"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 md:h-12 text-sm md:text-lg"
                required
              />
            </div>

            <Button type="submit" className="w-full h-10 md:h-12 text-sm md:text-lg font-bold" disabled={isLoading}>
              {isLoading ? "در حال ثبت..." : "ادامه"}
              {!isLoading && <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />}
            </Button>
          </form>
        )}
      </div>
    </Card>
  )
}
