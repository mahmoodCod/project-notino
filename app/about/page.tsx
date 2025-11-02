import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Target, Users, Heart, Zap, Shield, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">درباره دانشجو نت</h1>
            <p className="text-lg text-muted-foreground">پلتفرمی برای دانشجویان، توسط دانشجویان</p>
          </div>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">داستان ما</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                دانشجو نت در سال ۱۴۰۲ با هدف ایجاد یک جامعه دانشجویی فعال و پویا در ایران راه‌اندازی شد. ما باور داریم که
                دانش باید در دسترس همه باشد و دانشجویان باید بتوانند به راحتی با یکدیگر ارتباط برقرار کنند و از تجربیات
                هم بهره‌مند شوند.
              </p>
              <p>
                آنچه به عنوان یک پروژه کوچک دانشجویی شروع شد، امروز به بزرگترین پلتفرم اشتراک‌گذاری جزوات دانشگاهی در
                ایران تبدیل شده است. ما افتخار می‌کنیم که بیش از ۲۵,۰۰۰ دانشجو از بیش از ۱۲۰ دانشگاه کشور عضو جامعه ما
                هستند.
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">ماموریت ما</h3>
              <p className="text-muted-foreground leading-relaxed">
                ایجاد بستری امن و کارآمد برای اشتراک‌گذاری دانش و تجربیات دانشجویی، تسهیل دسترسی به منابع آموزشی و ایجاد
                ارتباط بین دانشجویان سراسر کشور.
              </p>
            </Card>

            <Card className="p-6">
              <div className="bg-accent/10 text-accent w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">چشم‌انداز ما</h3>
              <p className="text-muted-foreground leading-relaxed">
                تبدیل شدن به بزرگترین و جامع‌ترین پلتفرم دانشجویی ایران که نه تنها محلی برای اشتراک‌گذاری جزوات، بلکه یک
                اکوسیستم کامل برای موفقیت تحصیلی باشد.
              </p>
            </Card>
          </div>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">ارزش‌های ما</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 text-primary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-semibold mb-2">جامعه‌محوری</h3>
                <p className="text-sm text-muted-foreground">ما به قدرت جامعه دانشجویی باور داریم</p>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 text-accent w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-semibold mb-2">صداقت</h3>
                <p className="text-sm text-muted-foreground">شفافیت و صداقت در تمام کارهای ما</p>
              </div>

              <div className="text-center">
                <div className="bg-secondary/10 text-secondary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="font-semibold mb-2">نوآوری</h3>
                <p className="text-sm text-muted-foreground">همیشه در حال بهبود و نوآوری هستیم</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">چرا دانشجو نت؟</h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                ما بیش از یک پلتفرم اشتراک‌گذاری هستیم، یک جامعه دانشجویی واقعی
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="bg-primary text-primary-foreground w-14 h-14 rounded-xl flex items-center justify-center mx-auto shadow-md">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold">امن و قابل اعتماد</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  تمام محتوا توسط تیم ما بررسی می‌شود و امنیت اطلاعات شما اولویت ماست
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="bg-accent text-accent-foreground w-14 h-14 rounded-xl flex items-center justify-center mx-auto shadow-md">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold">به‌روز و پویا</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  هر روز جزوات جدید اضافه می‌شود و محتوای قدیمی به‌روزرسانی می‌گردد
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="bg-secondary text-secondary-foreground w-14 h-14 rounded-xl flex items-center justify-center mx-auto shadow-md">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold">ساخته شده با عشق</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  توسط دانشجویان برای دانشجویان ساخته شده تا تجربه تحصیلی بهتری داشته باشید
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">تیم ما</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              تیم دانشجو نت متشکل از دانشجویان و فارغ‌التحصیلان با انگیزه و علاقه‌مند به آموزش است. ما همگی تجربه دانشجویی
              را داشته‌ایم و می‌دانیم که چه چالش‌هایی در مسیر تحصیل وجود دارد.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              هدف ما ساختن ابزاری است که خودمان دوست داشتیم در دوران دانشجویی داشته باشیم. اگر شما هم علاقه‌مند به همکاری
              با ما هستید، از طریق صفحه تماس با ما در ارتباط باشید.
            </p>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
