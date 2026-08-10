import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <div className="home__eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            <span>AI-Powered Customer Intelligence</span>
          </div>

          <h1 className="home__title">
            Predict Customer Churn
            <span className="home__title-accent">Before It Happens.</span>
          </h1>

          <p className="home__description">
            Turn customer data into actionable churn insights with a machine
            learning powered prediction platform designed for fast, informed
            decisions.
          </p>

          <p className="home__supporting-text">
            Analyze customer behavior, estimate churn risk, and make data-driven
            retention decisions with confidence.
          </p>

          <div className="home__actions">
            <Link to="/prediction" className="home__primary-action">
              Start Prediction
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
