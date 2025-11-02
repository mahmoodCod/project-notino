import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">قوانین و مقررات</h1>
            <p className="text-lg text-muted-foreground">آخرین بروزرسانی: آذر ۱۴۰۳</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">۱. پذیرش قوانین</h2>
              <p className="text-muted-foreground leading-relaxed">
                با استفاده از پلتفرم دانشجو نت، شما تمام قوانین و مقررات این سایت را می‌پذیرید. اگر با هر یک از این
                قوانین موافق نیستید، لطفاً از سایت استفاده نکنید.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۲. شرایط عضویت</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>• کاربران باید دانشجوی یکی از دانشگاه‌های ایران باشند</p>
                <p>• ثبت‌نام با شماره موبایل معتبر الزامی است</p>
                <p>• ارائه اطلاعات نادرست ممنوع است</p>
                <p>• هر فرد فقط مجاز به ایجاد یک حساب کاربری است</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۳. محتوای کاربران</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>• کاربران مسئول محتوایی هستند که آپلود می‌کنند</p>
                <p>• آپلود محتوای نامناسب، توهین‌آمیز یا غیرقانونی ممنوع است</p>
                <p>• نقض حق نشر دیگران ممنوع است</p>
                <p>• دانشجو نت حق حذف هر محتوای نامناسب را دارد</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۴. رفتار کاربران</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>• احترام به سایر کاربران الزامی است</p>
                <p>• آزار و اذیت، تهدید یا تبعیض ممنوع است</p>
                <p>• ارسال اسپم یا تبلیغات غیرمجاز ممنوع است</p>
                <p>• سوءاستفاده از امکانات سایت منجر به مسدود شدن حساب می‌شود</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۵. مالکیت معنوی</h2>
              <p className="text-muted-foreground leading-relaxed">
                تمام حقوق مالکیت معنوی پلتفرم دانشجو نت متعلق به این سایت است. کاربران مجاز به کپی، توزیع یا استفاده
                تجاری از محتوای سایت بدون اجازه نیستند.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۶. محدودیت مسئولیت</h2>
              <p className="text-muted-foreground leading-relaxed">
                دانشجو نت مسئولیتی در قبال صحت، کیفیت یا قانونی بودن محتوای آپلود شده توسط کاربران ندارد. استفاده از
                محتوای سایت به عهده خود کاربران است.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۷. تغییرات در قوانین</h2>
              <p className="text-muted-foreground leading-relaxed">
                دانشجو نت حق تغییر این قوانین را در هر زمان دارد. ادامه استفاده از سایت پس از تغییرات به معنای پذیرش
                قوانین جدید است.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">۸. تماس با ما</h2>
              <p className="text-muted-foreground leading-relaxed">
                برای هرگونه سوال یا ابهام در مورد قوانین، می‌توانید از طریق صفحه تماس با ما با تیم پشتیبانی ارتباط برقرار
                کنید.
              </p>
            </section>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
