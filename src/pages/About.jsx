import { useState } from "react";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import { sendFeedback } from "../services/email";

export default function About() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    try {
      setSending(true);
      await sendFeedback(name, message);
      setStatus("success");
      setName("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <SEO
        title="عن ونسنا"
        description="تعرف على ونسنا وقصة المشروع وطريقة التواصل معنا."
      />

      <section className="about-page">
        <div className="about-hero">
          <motion.div
            className="about-logo"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img src="/wansna_logo.png" alt="شعار ونسنا" width="230" />
          </motion.div>

          <h1 className="about-title">عن ونسنا</h1>

          <p className="about-intro">
            ونسنّا منصة ألعاب جماعية عربية صُممت لتضيف المتعة والتفاعل إلى
            الجلسات العائلية وجلسات الأصدقاء من جهاز واحد وبدون الحاجة إلى تحميل
            أي تطبيق.
          </p>
        </div>

        <div className="about-card">
          <h2>من أنا؟</h2>

          <div className="developer-card">
            <div className="info-row">
              <span className="value">إيمان الحجي👩‍💻</span>
              <span className="label"> المطور</span>
            </div>

            <div className="info-row">
              <span className="value">
                البرمجة، خلق لحظات ممتعة💜
              </span>
              <span className="label"> الاهتمامات</span>
            </div>
          </div>
        </div>

        <div className="about-card">
          <h2>قصة ونسنا ✨</h2>

          <p>
            بدأت فكرة ونسنّا من جمعاتنا العائلية ، حيث كنّا نبحث عن ألعاب تزيد بهجة اللقاء.
          </p>
        
          <p>
          ففكرت ان انشئ موقع بسيط تُجمع فيه ألعاب الجمعات التي كنّا نلعبها
          
          </p>
          
          <p>ويشارك فيها جميع الجالسين بدلاَ من ان ينظم احدهم اللعب ولا يشاركنا</p>
        </div>

        <div className="feedback-card">
          <h2>✨ شاركنا رأيك</h2>

          <p>كل فكرة أو ملاحظة تساعدنا على تطوير ونسنا وإضافة ألعاب جديدة.</p>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              placeholder="اكتب رأيك أو اقتراحك"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button className="feedback-btn" type="submit" disabled={sending}>
              {sending
                ? "جاري الإرسال..."
                : status === "success"
                  ? "تم الإرسال ✅"
                  : "إرسال ✨"}
            </button>

            {status === "error" && (
              <p className="error-message">حدث خطأ أثناء الإرسال</p>
            )}
          </form>
        </div>

        <p className="about-footer">لأن أجمل اللحظات تُصنع مع من نحب💜</p>
      </section>
    </>
  );
}
