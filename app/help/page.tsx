import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { BookOpen, Upload, MessageCircle, Search, Star, Users } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">راهنمای استفاده از دانشجو نت</h1>
            <p className="text-lg text-muted-foreground">همه چیزی که برای استفاده بهینه از پلتفرم نیاز دارید</p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">چگونه جزوه پیدا کنم؟</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>۱. از منوی بالا روی "داشبورد" کلیک کنید</p>
                    <p>۲. از نوار جستجو، نام درس، استاد یا دانشگاه مورد نظر را جستجو کنید</p>
                    <p>۳. می‌توانید با استفاده از فیلترها نتایج را محدود کنید</p>
                    <p>۴. روی جزوه مورد نظر کلیک کنید تا جزئیات کامل را ببینید</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">چگونه جزوه آپلود کنم؟</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>۱. ابتدا وارد حساب کاربری خود شوید</p>
                    <p>۲. از منوی بالا روی "آپلود جزوه" کلیک کنید</p>
                    <p>۳. فرم را با اطلاعات کامل پر کنید (عنوان، دانشگاه، رشته، درس و...)</p>
                    <p>۴. فایل جزوه خود را آپلود کنید (PDF، Word، PowerPoint)</p>
                    <p>۵. روی دکمه "انتشار جزوه" کلیک کنید</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 text-secondary p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">چگونه با دانشجویان دیگر چت کنم؟</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>۱. از منوی بالا روی "چت" کلیک کنید</p>
                    <p>۲. لیست دانشجویان آنلاین را مشاهده کنید</p>
                    <p>۳. روی نام دانشجوی مورد نظر کلیک کنید</p>
                    <p>۴. پیام خود را تایپ کرده و ارسال کنید</p>
                    <p>۵. می‌توانید پیام صوتی نیز ارسال کنید</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <Star className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">چگونه به جزوات امتیاز بدهم؟</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>۱. وارد صفحه جزئیات جزوه شوید</p>
                    <p>۲. در بخش امتیازدهی، ستاره‌های مورد نظر را انتخاب کنید</p>
                    <p>۳. می‌توانید نظر خود را نیز بنویسید</p>
                    <p>۴. روی دکمه "ثبت امتیاز" کلیک کنید</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl">
                  <Search className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">نکات جستجوی بهتر</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• از کلمات کلیدی مشخص استفاده کنید</p>
                    <p>• نام کامل درس یا استاد را وارد کنید</p>
                    <p>• از فیلترهای دانشگاه و رشته استفاده کنید</p>
                    <p>• جزوات را بر اساس امتیاز یا تاریخ مرتب کنید</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 text-secondary p-3 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">مدیریت پروفایل</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>۱. از منوی بالا روی "پروفایل" کلیک کنید</p>
                    <p>۲. اطلاعات خود را ویرایش کنید</p>
                    <p>۳. عکس پروفایل خود را تغییر دهید</p>
                    <p>۴. دانشگاه و رشته تحصیلی خود را به‌روز کنید</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
