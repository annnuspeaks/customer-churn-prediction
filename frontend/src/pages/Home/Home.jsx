import { ArrowUpRight, Sparkles } from "lucide-react";
import "./Home.css";
import PredictionCard from "../../components/PredictionCard/PredictionCard";

function Home() {
  return (
    <main className="home">
      <section className="home__hero page-container">
        <div className="home__hero-content">
          <div className="home__eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            <span>AI-Powered Customer Intelligence</span>
          </div>

          <h1 className="home__title">
            Predict Customer Churn
            <span className="home__title-accent">
              Before It Happens.
            </span>
          </h1>

          <p className="home__description">
            Turn customer data into actionable churn insights with a
            machine learning powered prediction platform designed for
            fast, informed decisions.
          </p>

          <p className="home__supporting-text">
            Analyze customer behavior, estimate churn risk, and make
            data-driven retention decisions with confidence.
          </p>

          <div className="home__actions">
            <a
              href="#documentation"
              className="home__primary-action"
            >
              View Documentation
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="home__prediction">
          <PredictionCard />
        </div>
      </section>
    </main>
  );
}

export default Home;