import { BrainCircuit, CircleHelp, House } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark">◆</span>

          <span className="navbar__brand-text">Customer Churn Prediction</span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary navigation">
          <Link to="/" className="navbar__link">
            <House size={17} aria-hidden="true" />
            <span>Home</span>
          </Link>

          <Link to="/prediction" className="navbar__link">
            <BrainCircuit size={17} aria-hidden="true" />
            <span>Prediction</span>
          </Link>

          <Link to="/support" className="navbar__link">
            <CircleHelp size={17} aria-hidden="true" />
            <span>Support</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
