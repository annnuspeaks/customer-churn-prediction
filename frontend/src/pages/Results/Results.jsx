import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import "./Results.css";

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { predictionPayload } = state || {};

  // Mock result for UI development.
  // Actual ML/API result will replace this in Phase 10.5.
  const predictionResult = {
    riskPercentage: 68,
    riskLevel: "High Risk",
    summary:
      "This customer shows a relatively high likelihood of churning based on the submitted profile and service information.",
  };

  return (
    <main className="results">
      <section className="results__hero">
        <div className="results__heading">
          <div className="results__eyebrow">
            <BrainCircuit size={16} aria-hidden="true" />
            <span>AI Churn Risk Prediction</span>
          </div>

          <h1 className="results__title">
            Your
            <span className="results__title-accent">Prediction Results.</span>
          </h1>

          <p className="results__description">
            Review the estimated churn risk based on the customer information
            submitted for prediction.
          </p>
        </div>
      </section>

      <section className="results__content" aria-labelledby="results-card-title">
        <article className="results__risk-card">
          <div className="results__risk-header">
            <div className="results__risk-icon" aria-hidden="true">
              <ShieldCheck size={24} />
            </div>

            <div>
              <span className="results__risk-kicker">
                <TrendingUp size={14} aria-hidden="true" />
                ML Risk Analysis
              </span>
              <h2 id="results-card-title">Customer Churn Risk</h2>
              <p>Estimated likelihood that this customer may churn.</p>
            </div>
          </div>

          <div className="results__risk-main">
            <div
              className="results__risk-ring"
              style={{ "--risk-progress": `${predictionResult.riskPercentage}%` }}
              aria-label={`${predictionResult.riskPercentage}% churn risk`}
            >
              <div className="results__risk-ring-inner">
                <strong>{predictionResult.riskPercentage}%</strong>
                <span>Risk</span>
              </div>
            </div>

            <div className="results__risk-copy">
              <span className="results__risk-label">Predicted Risk Level</span>
              <div className="results__risk-level">
                <span className="results__risk-dot" />
                {predictionResult.riskLevel}
              </div>
              <p>{predictionResult.summary}</p>
            </div>
          </div>

          <div className="results__risk-footer">
            <div className="results__status">
              <CheckCircle2 size={16} aria-hidden="true" />
              Prediction generated successfully
            </div>

            <button
              type="button"
              className="results__action"
              onClick={() => navigate("/prediction")}
            >
              New Prediction
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </article>

        {predictionPayload && (
          <p className="results__note">
            Result generated from the customer information submitted in the
            prediction form.
          </p>
        )}
      </section>
    </main>
  );
}

export default Results;
