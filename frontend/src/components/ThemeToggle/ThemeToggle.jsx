import { Moon, Sun } from "lucide-react";
import "./ThemeToggle.css";

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <span className="theme-toggle__icon">
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </span>

      <span className="theme-toggle__label">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default ThemeToggle;