import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function GameCard({ game }) {
  const Icon = game.icon;

  return (
    <motion.div
      className="game-card-motion"
      whileHover={{
        y: -8, // ارتفاع البطاقة عند مرور الفأرة
      }}
      whileTap={{
        scale: 0.97, // تأثير الضغط بالجوال والكمبيوتر
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Link to={game.path} className="game-card">
        <motion.div
          className="game-icon"
          whileHover={{
            scale: 1.15, // تكبير الأيقونة عند مرور الفأرة
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Icon size={38} />
        </motion.div>

        <h3>{game.title}</h3>

        <p>{game.description}</p>

        <span className="game-link">ابدأ اللعب</span>
      </Link>
    </motion.div>
  );
}