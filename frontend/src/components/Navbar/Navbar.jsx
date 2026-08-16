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
import { Link, NavLink } from "react-router-dom";
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
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            onClick={closeMenu}
            end
          >
            <House size={17} aria-hidden="true" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/prediction"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            onClick={closeMenu}
          >
            <BrainCircuit size={17} aria-hidden="true" />
            <span>Prediction</span>
          </NavLink>

          <NavLink
            to="/support"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            onClick={closeMenu}
          >
            <CircleHelp size={17} aria-hidden="true" />
            <span>Support</span>
          </NavLink>

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
