import { Gamepad2, Home, Info, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router-dom";
import { shareWebsite } from "../services/share";

export default function Navbar() {
  const location = useLocation();

  const hideLogo = location.pathname === "/" || location.pathname === "/about";

  return (
    <header className="navbar">
      {!hideLogo && (
        <NavLink to="/" className="logo">
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ display: "inline-block" }}
          >
            🎮
          </motion.span>

          <span>ونسنّا</span>
        </NavLink>
      )}

      <nav className="nav-links">
        <NavLink to="/">
          <Home size={18} />
          الرئيسية
        </NavLink>

        <NavLink to="/games">
          <Gamepad2 size={18} />
          الألعاب
        </NavLink>

        <NavLink to="/about">
          <Info size={18} />
          عن ونسنّا
        </NavLink>

        <button
          type="button"
          onClick={shareWebsite}
          className="share-btn"
          title="مشاركة ونسنّا"
        >
          <Share2 size={30} />
        </button>
      </nav>
    </header>
  );
}