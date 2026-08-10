import {
  BrainCircuit,
  CircleHelp,
  House,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ theme, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isDark = theme === "dark";

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-mark">◆</span>

          <span className="navbar__brand-text">Customer Churn Prediction</span>
        </Link>

        <button
          type="button"
          className="navbar__menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          <Link to="/" className="navbar__link" onClick={closeMenu}>
            <House size={17} aria-hidden="true" />
            <span>Home</span>
          </Link>

          <Link to="/prediction" className="navbar__link" onClick={closeMenu}>
            <BrainCircuit size={17} aria-hidden="true" />
            <span>Prediction</span>
          </Link>

          <Link to="/support" className="navbar__link" onClick={closeMenu}>
            <CircleHelp size={17} aria-hidden="true" />
            <span>Support</span>
          </Link>

          <div className="navbar__mobile-divider" />

          <button
            type="button"
            className="navbar__theme-toggle"
            onClick={onToggle}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            <span className="navbar__theme-toggle-icon">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </span>

            <span className="navbar__theme-toggle-content">
              <span className="navbar__theme-toggle-label">
                {isDark ? "Dark" : "Light"}
              </span>

              <span className="navbar__theme-toggle-description">
                Switch to {isDark ? "Light" : "Dark"} theme
              </span>
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
