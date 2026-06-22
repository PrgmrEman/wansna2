// تذييل الصفحة
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        لأن أجمل اللحظات تُصنع مع من نحب
      </p>

      <p className="footer-text">
        <span>صُمم ونسنّا ليضيف المزيد من المتعة إلى جمعاتكم</span>
        <Heart size={14} className="footer-heart" />
      </p>

      <small className="footer-copy">
        ©  ونسنّا {new Date().getFullYear()} | جميع الحقوق محفوظة.
      </small>
    </footer>
  );
}