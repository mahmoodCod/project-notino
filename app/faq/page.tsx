import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">سوالات متداول</h1>
            <p className="text-lg text-muted-foreground">پاسخ سوالات رایج درباره دانشجو نت</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">دانشجو نت چیست؟</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                دانشجو نت یک پلتفرم ملی برای اشتراک‌گذاری جزوات دانشگاهی است که دانشجویان می‌توانند جزوات خود را با یکدیگر
                به اشتراک بگذارند، با هم چت کنند و از تجربیات یکدیگر بهره‌مند شوند.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                آیا استفاده از دانشجو نت رایگان است؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                بله، تمام امکانات دانشجو نت کاملاً رایگان است و هیچ هزینه‌ای برای ثبت‌نام، آپلود جزوه یا دانلود جزوات
                دریافت نمی‌شود.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                چه کسانی می‌توانند در دانشجو نت ثبت‌نام کنند؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                تمام دانشجویان دانشگاه‌های ایران می‌توانند با شماره موبایل خود در دانشجو نت ثبت‌نام کنند و از امکانات آن
                استفاده کنند.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                چه نوع فایل‌هایی را می‌توانم آپلود کنم؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                شما می‌توانید فایل‌های PDF، Word (DOC, DOCX)، PowerPoint (PPT, PPTX) و تصاویر (JPG, PNG) را آپلود کنید.
                حداکثر حجم هر فایل ۵۰ مگابایت است.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">آیا جزوات من بررسی می‌شوند؟</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                بله، تمام جزوات آپلود شده توسط تیم ما بررسی می‌شوند تا از کیفیت و مناسب بودن محتوا اطمینان حاصل شود. این
                فرآیند معمولاً ۲۴ ساعت طول می‌کشد.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                چگونه می‌توانم با دانشجویان دیگر ارتباط برقرار کنم؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                از طریق بخش چت می‌توانید با دانشجویان آنلاین ارتباط برقرار کنید، پیام متنی و صوتی ارسال کنید و گروه‌های
                درسی تشکیل دهید.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                آیا می‌توانم جزوات خود را ویرایش کنم؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                بله، شما می‌توانید جزوات آپلود شده خود را ویرایش یا حذف کنید. برای این کار به پروفایل خود بروید و جزوات
                خود را مدیریت کنید.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                چگونه می‌توانم جزوه‌ای را گزارش کنم؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                در صفحه جزئیات هر جزوه، دکمه "گزارش مشکل" وجود دارد. می‌توانید از طریق آن جزوه نامناسب را گزارش دهید. تیم
                ما در اسرع وقت بررسی خواهد کرد.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">آیا اطلاعات من محفوظ است؟</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                بله، ما از بالاترین استانداردهای امنیتی برای حفاظت از اطلاعات شما استفاده می‌کنیم. اطلاعات شخصی شما هرگز
                با شخص ثالث به اشتراک گذاشته نمی‌شود.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                چگونه می‌توانم با پشتیبانی تماس بگیرم؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                می‌توانید از طریق صفحه "تماس با ما" با تیم پشتیبانی ما در ارتباط باشید. همچنین می‌توانید از طریق ایمیل
                support@daneshjoonet.ir با ما تماس بگیرید.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
