import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark">◆</span>

          <span className="navbar__brand-text">
            Customer Churn Prediction
          </span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary navigation">
          <Link to="/" className="navbar__link">
            Home
          </Link>

          <Link to="/prediction" className="navbar__link">
            Prediction
          </Link>

          <Link to="/support" className="navbar__link">
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;