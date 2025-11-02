import Link from "next/link"
import { GraduationCap } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 backdrop-blur-md bg-background/80 mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="space-y-3 text-center md:text-right">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold">دانشجو نت</span>
            </Link>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-3 text-sm">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  داشبورد
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-muted-foreground hover:text-primary transition-colors">
                  آپلود جزوه
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  چت
                </Link>
              </li>
              <li>
                <Link href="/profile-setup" className="text-muted-foreground hover:text-primary transition-colors">
                  پروفایل
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-3 text-sm">پشتیبانی</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  راهنما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-muted-foreground hover:text-primary transition-colors">
                  گزارش مشکل
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-3 text-sm">قوانین</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-muted-foreground hover:text-primary transition-colors">
                  شرایط استفاده
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© ۱۴۰۳ دانشجو نت. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}
