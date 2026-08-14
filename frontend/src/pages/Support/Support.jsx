import { CircleHelp, LifeBuoy, MessageCircleQuestion } from "lucide-react";
import "./Support.css";

function Support() {
  return (
    <main className="support-page">
      <section className="support-hero">
        <span className="support-eyebrow">
          <CircleHelp size={16} aria-hidden="true" />
          Customer Support
        </span>

        <h1>
          Need Help With
          <span> Churn Prediction?</span>
        </h1>

        <p>
          Find guidance for using the prediction platform, understanding
          results, and getting the most out of your customer insights.
        </p>
      </section>

      <section className="support-options" aria-label="Support options">
        <article className="support-card">
          <div className="support-card__icon">
            <LifeBuoy size={24} aria-hidden="true" />
          </div>

          <div>
            <h2>Getting Started</h2>
            <p>Learn how to use the customer churn prediction platform.</p>
          </div>
        </article>

        <article className="support-card">
          <div className="support-card__icon">
            <MessageCircleQuestion size={24} aria-hidden="true" />
          </div>

          <div>
            <h2>Prediction Help</h2>
            <p>Understand the prediction form, risk score, and results.</p>
          </div>
        </article>

        <article className="support-card">
          <div className="support-card__icon">
            <CircleHelp size={24} aria-hidden="true" />
          </div>

          <div>
            <h2>Troubleshooting</h2>
            <p>Find help for common issues while using the platform.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Support;
