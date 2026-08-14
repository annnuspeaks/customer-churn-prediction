import { Link } from "react-router-dom";
import "./Footer.css";

const otherProducts = [
  { name: "Fraud Detection System" },
  { name: "Enterprise RAG AI Assistant" },
  { name: "Recommendation System" },
  { name: "Time-Series Forecasting Platform" },
  { name: "MLOps Automated Pipeline" },
  {
    name: "Enterprise AI Decision Intelligence Program",
    badge: "College Project",
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* ================================
            BRAND
            ================================ */}
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            Customer Churn Prediction
          </Link>

          <p>
            An AI-powered platform for predicting customer churn, identifying
            at-risk customers, and generating actionable retention insights.
          </p>
        </div>

        <div className="site-footer__divider" />

        {/* ================================
            OTHER PRODUCTS
            ================================ */}
        <section
          className="site-footer__products"
          aria-labelledby="footer-products-title"
        >
          <h2 id="footer-products-title">Our Other Products</h2>

          <div className="site-footer__product-grid">
            {otherProducts.map((product) => (
              <div
                key={product.name}
                className={`site-footer__product-card ${
                  product.badge ? "site-footer__product-card--college" : ""
                }`}
              >
                <span>{product.name}</span>

                {product.badge && (
                  <span className="site-footer__product-badge">
                    <span className="site-footer__product-badge-dot" />
                    {product.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* ================================
    PROJECT LINKS
    ================================ */}
        <div className="site-footer__links">
          <a
            href="https://github.com/annnuspeaks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/annuspeaks/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn
          </a>

          <a href="mailto:annu.speaks@outlook.com" aria-label="Send an email">
            Email
          </a>
        </div>
      </div>
      {/* ================================
    FOOTER METADATA
    ================================ */}
      <div className="site-footer__bottom">
        <span className="site-footer__copyright">
          © {new Date().getFullYear()} Customer Churn Prediction
        </span>

        <span className="site-footer__credit">
          Built with React • Machine Learning
        </span>
      </div>
    </footer>
  );
}

export default Footer;
