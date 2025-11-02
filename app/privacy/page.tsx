import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-primary/10 text-primary w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">سیاست حریم خصوصی</h1>
            <p className="text-lg text-muted-foreground">حفاظت از اطلاعات شخصی شما برای ما اولویت است</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">۱. جمع‌آوری اطلاعات</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p className="font-semibold text-foreground">اطلاعاتی که جمع‌آوری می‌کنیم:</p>
                <p>• اطلاعات شخصی: نام، شماره موبایل، ایمیل، دانشگاه و رشته تحصیلی</p>
                <p>• اطلاعات استفاده: جزواتی که مشاهده، دانلود یا آپلود می‌کنید</p>
                <p>• اطلاعات فنی: آدرس IP، نوع مرورگر، سیستم عامل</p>
                <p>• اطلاعات ارتباطی: پیام‌ها و نظراتی که ارسال می‌کنید</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۲. استفاده از اطلاعات</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>ما از اطلاعات شما برای موارد زیر استفاده می‌کنیم:</p>
                <p>• ارائه و بهبود خدمات پلتفرم</p>
                <p>• شخصی‌سازی تجربه کاربری</p>
                <p>• ارسال اعلان‌ها و به‌روزرسانی‌های مهم</p>
                <p>• پاسخگویی به درخواست‌ها و پشتیبانی</p>
                <p>• تحلیل و بهبود عملکرد سایت</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۳. اشتراک‌گذاری اطلاعات</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>ما اطلاعات شخصی شما را با اشخاص ثالث به اشتراک نمی‌گذاریم، مگر در موارد زیر:</p>
                <p>• با رضایت صریح شما</p>
                <p>• برای رعایت قوانین و مقررات</p>
                <p>• برای محافظت از حقوق و امنیت کاربران</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۴. امنیت اطلاعات</h2>
              <p className="text-muted-foreground leading-relaxed">
                ما از روش‌های امنیتی پیشرفته برای محافظت از اطلاعات شما استفاده می‌کنیم، از جمله رمزنگاری داده‌ها، احراز
                هویت دو مرحله‌ای و نظارت مستمر بر سیستم‌ها.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۵. کوکی‌ها</h2>
              <p className="text-muted-foreground leading-relaxed">
                ما از کوکی‌ها برای بهبود تجربه کاربری استفاده می‌کنیم. شما می‌توانید کوکی‌ها را در تنظیمات مرورگر خود
                غیرفعال کنید، اما این ممکن است بر عملکرد برخی قسمت‌های سایت تأثیر بگذارد.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۶. حقوق کاربران</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>شما حق دارید:</p>
                <p>• به اطلاعات شخصی خود دسترسی داشته باشید</p>
                <p>• اطلاعات نادرست را تصحیح کنید</p>
                <p>• درخواست حذف اطلاعات خود را بدهید</p>
                <p>• از دریافت ایمیل‌های تبلیغاتی انصراف دهید</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۷. تغییرات در سیاست حریم خصوصی</h2>
              <p className="text-muted-foreground leading-relaxed">
                ما ممکن است این سیاست را به‌روزرسانی کنیم. تغییرات مهم از طریق ایمیل یا اعلان در سایت به اطلاع شما خواهد
                رسید.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۸. تماس با ما</h2>
              <p className="text-muted-foreground leading-relaxed">
                برای هرگونه سوال درباره حریم خصوصی، می‌توانید از طریق ایمیل privacy@daneshjoonet.ir با ما تماس بگیرید.
              </p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
