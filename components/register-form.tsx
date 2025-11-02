"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, ArrowLeft, CheckCircle2 } from "lucide-react"

export function RegisterForm() {
  const [step, setStep] = useState<"phone" | "verify" | "complete">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setStep("verify")
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setStep("complete")
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
          <Smartphone className="w-8 h-8" />
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold">
          {step === "phone" && "ثبت‌نام در دانشجو نت"}
          {step === "verify" && "تأیید شماره موبایل"}
          {step === "complete" && "خوش آمدید! 🎉"}
        </CardTitle>
        <CardDescription className="text-base">
          {step === "phone" && "برای شروع، شماره موبایل خود را وارد کنید"}
          {step === "verify" && `کد تأیید به شماره ${phoneNumber} ارسال شد`}
          {step === "complete" && "حساب کاربری شما با موفقیت ایجاد شد"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-base font-medium">
                شماره موبایل
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-14 text-lg text-center tracking-wider"
                  maxLength={11}
                  required
                  dir="ltr"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">کد تأیید به این شماره پیامک خواهد شد</p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              disabled={isLoading || phoneNumber.length !== 11}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>در حال ارسال...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>دریافت کد تأیید</span>
                  <ArrowLeft className="w-5 h-5" />
                </div>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-4 text-muted-foreground">یا ورود با</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full h-12 font-medium bg-transparent" disabled>
              ورود با حساب دانشگاهی
              <span className="mr-2 text-xs text-muted-foreground">(به زودی)</span>
            </Button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium text-center block">کد ۶ رقمی را وارد کنید</Label>
              <div className="flex gap-2 justify-center" dir="ltr">
                {verificationCode.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-bold"
                    required
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              disabled={isLoading || verificationCode.some((d) => !d)}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>در حال تأیید...</span>
                </div>
              ) : (
                "تأیید و ادامه"
              )}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setStep("phone")}
              >
                تغییر شماره موبایل
              </button>
              <p className="text-sm text-muted-foreground">
                کد را دریافت نکردید؟ <button className="text-primary hover:underline font-medium">ارسال مجدد</button>
              </p>
            </div>
          </form>
        )}

        {step === "complete" && (
          <div className="space-y-6 text-center py-4">
            <div className="mx-auto w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">حساب کاربری شما با شماره</p>
              <p className="text-2xl font-bold text-primary" dir="ltr">
                {phoneNumber}
              </p>
              <p className="text-lg text-muted-foreground">با موفقیت ایجاد شد</p>
            </div>

            <Button
              className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                // Navigate to profile setup or dashboard
                console.log("Navigate to next step")
              }}
            >
              <div className="flex items-center gap-2">
                <span>شروع استفاده از دانشجو نت</span>
                <ArrowLeft className="w-5 h-5" />
              </div>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
