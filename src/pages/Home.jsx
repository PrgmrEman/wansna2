import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import GameCard from "../components/GameCard";
import { games } from "../data/games";
import { motion } from "motion/react";
import { Download, Smartphone, Users } from "lucide-react";

export default function Home() {
  // Get the first 3 games to feature on the homepage
  const featuredGames = games.slice(0, 3);

  return (
    <>
      <SEO
        title="الرئيسية"
        description="ونسنّا موقع ألعاب جماعية من جهاز واحد، مناسب للجمعات العائلية والأصدقاء وبدون تحميل."
      />

      <section className="home-hero">
        <motion.div
          className="hero-logo"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/wansna_logo.png"
            alt="ونسنّا - ألعاب جماعية من جهاز واحد"
            width="230"
          />
        </motion.div>

        <p className="hero-subtitle">ألعاب جماعية من جهاز واحد</p>

        <p className="hero-text">جلسة واحدة... ألعاب كثيرة</p>

        <p className="hero-description">
          ضحك ، تحدي، وذكريات لا تُنسى مع العائلة والأصدقاء.
        </p>

        <Link to="/games" className="primary-btn">
          ابدأ اللعب
        </Link>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <Download size={24} />
          <span>بدون تحميل</span>
        </div>

        <div className="feature-card">
          <Smartphone size={24} />
          <span>يعمل على أي جهاز</span>
        </div>

        <div className="feature-card">
          <Users size={24} />
          <span>مثالي للجمعات</span>
        </div>
      </section>

      <section className="featured-games">
        <div className="section-header">
          <h2>🎮 ألعاب ننصح بها</h2>
          <Link to="/games">عرض الكل</Link>
        </div>

        <div className="games-grid">
          {/* view 3 games from the games array as featured games */}
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </>
  );
}