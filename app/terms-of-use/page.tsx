import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">شرایط استفاده</h1>
            <p className="text-lg text-muted-foreground">راهنمای استفاده صحیح از پلتفرم دانشجو نت</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">۱. استفاده مجاز</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>شما موظف هستید:</p>
                <p>• از پلتفرم فقط برای اهداف آموزشی استفاده کنید</p>
                <p>• اطلاعات صحیح و دقیق ارائه دهید</p>
                <p>• از قوانین و مقررات پیروی کنید</p>
                <p>• به حقوق سایر کاربران احترام بگذارید</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۲. استفاده غیرمجاز</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>موارد زیر ممنوع است:</p>
                <p>• استفاده تجاری از محتوای سایت بدون اجازه</p>
                <p>• آپلود ویروس، بدافزار یا کدهای مخرب</p>
                <p>• تلاش برای دسترسی غیرمجاز به سیستم‌ها</p>
                <p>• جمع‌آوری خودکار اطلاعات (web scraping)</p>
                <p>• ایجاد حساب‌های جعلی یا متعدد</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۳. محتوای آپلودی</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>هنگام آپلود جزوه:</p>
                <p>• مطمئن شوید که حق انتشار آن را دارید</p>
                <p>• محتوای نامناسب، توهین‌آمیز یا غیرقانونی آپلود نکنید</p>
                <p>• اطلاعات دقیق درباره جزوه ارائه دهید</p>
                <p>• کیفیت فایل را بررسی کنید</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۴. حساب کاربری</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>• شما مسئول حفظ امنیت حساب خود هستید</p>
                <p>• رمز عبور خود را با دیگران به اشتراک نگذارید</p>
                <p>• فعالیت‌های انجام شده از حساب شما مسئولیت شماست</p>
                <p>• در صورت سوءاستفاده، فوراً به ما اطلاع دهید</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۵. تعلیق و حذف حساب</h2>
              <p className="text-muted-foreground leading-relaxed">
                دانشجو نت حق دارد در صورت نقض قوانین، حساب کاربری شما را بدون اطلاع قبلی تعلیق یا حذف کند. همچنین شما
                می‌توانید در هر زمان درخواست حذف حساب خود را بدهید.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۶. مسئولیت محتوا</h2>
              <p className="text-muted-foreground leading-relaxed">
                دانشجو نت صرفاً یک پلتفرم اشتراک‌گذاری است و مسئولیتی در قبال صحت، کامل بودن یا کیفیت محتوای آپلود شده
                توسط کاربران ندارد.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۷. قطع خدمات</h2>
              <p className="text-muted-foreground leading-relaxed">
                ما تلاش می‌کنیم خدمات را به صورت مداوم ارائه دهیم، اما ممکن است گاهی برای نگهداری یا به دلایل فنی، خدمات
                موقتاً قطع شود.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۸. تغییرات در شرایط</h2>
              <p className="text-muted-foreground leading-relaxed">
                ما حق تغییر این شرایط را داریم. تغییرات از طریق سایت اعلام می‌شود و ادامه استفاده از سایت به معنای پذیرش
                شرایط جدید است.
              </p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
