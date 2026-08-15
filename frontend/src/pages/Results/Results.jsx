import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Lightbulb,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserRound,
} from "lucide-react";
import "./Results.css";

function formatLabel(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function getDisplayEntries(payload) {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  return Object.entries(payload).filter(
    ([, value]) =>
      value === null || value === undefined || typeof value !== "object",
  );
}

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const predictionPayload = state?.predictionPayload;
  const resultStatus = state?.resultStatus;
  const resultError = state?.resultError;

  /*
   * Result state priority:
   * 1. Explicit error state
   * 2. Explicit success state
   * 3. Missing payload = empty state
   * 4. Payload available = success
   *
   * Actual API response will replace this state flow later.
   */
  const status = resultStatus
    ? resultStatus
    : resultError
      ? "error"
      : predictionPayload
        ? "success"
        : "empty";

  const predictionResult = {
    riskPercentage: 68,
    riskLevel: "High Risk",
    summary:
      "This customer shows a relatively high likelihood of churning based on the submitted profile and service information.",
    interpretation:
      "The estimated risk is above the high-risk threshold, indicating that this customer may require closer retention attention.",
    decisionSignal:
      "Consider reviewing the customer profile and service experience before taking a retention action.",
  };

  const customerDetails = getDisplayEntries(predictionPayload);

  const handleNewPrediction = () => {
    navigate("/prediction");
  };

  const handleRetry = () => {
    navigate("/prediction");
  };

  if (status === "empty") {
    return (
      <main className="results results--state">
        <section className="results__state-card" aria-labelledby="empty-title">
          <div className="results__state-icon" aria-hidden="true">
            <ClipboardList size={28} />
          </div>

          <span className="results__state-kicker">No Prediction Available</span>

          <h1 id="empty-title">Your Results Are Waiting.</h1>

          <p>
            No prediction data is currently available. Submit customer
            information first to generate a churn risk prediction.
          </p>

          <button
            type="button"
            className="results__state-action"
            onClick={handleNewPrediction}
          >
            <span>Start Prediction</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </section>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="results results--state">
        <section className="results__state-card results__state-card--error">
          <div className="results__state-icon" aria-hidden="true">
            <ShieldAlert size={28} />
          </div>

          <span className="results__state-kicker">Prediction Error</span>

          <h1>We Couldn't Generate Your Result.</h1>

          <p>
            {resultError ||
              "Something went wrong while generating the churn prediction. Please try again."}
          </p>

          <button
            type="button"
            className="results__state-action"
            onClick={handleRetry}
          >
            <RefreshCw size={17} aria-hidden="true" />
            <span>Try Again</span>
          </button>
        </section>
      </main>
    );
  }

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

      <section
        className="results__content"
        aria-labelledby="results-card-title"
      >
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
              style={{
                "--risk-progress": `${predictionResult.riskPercentage}%`,
              }}
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
            <div className="results__status" role="status">
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>Prediction generated successfully</span>
            </div>

            <button
              type="button"
              className="results__action"
              onClick={handleNewPrediction}
              aria-label="Start a new churn prediction"
            >
              <span>New Prediction</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </article>

        <section
          className="results__insights"
          aria-labelledby="risk-details-title"
        >
          <div className="results__insights-heading">
            <div className="results__insights-icon" aria-hidden="true">
              <Gauge size={21} />
            </div>

            <div>
              <span className="results__insights-kicker">
                <TrendingUp size={14} aria-hidden="true" />
                Risk Details &amp; Insights
              </span>

              <h2 id="risk-details-title">What This Result Means</h2>

              <p>
                A concise interpretation of the estimated churn risk for this
                customer.
              </p>
            </div>
          </div>

          <div className="results__insights-grid">
            <article className="results__insight-card">
              <div className="results__insight-card-icon" aria-hidden="true">
                <Gauge size={18} />
              </div>

              <span className="results__insight-label">Risk Score</span>

              <strong>{predictionResult.riskPercentage}%</strong>

              <p>
                The model estimates a {predictionResult.riskPercentage}%
                likelihood of customer churn.
              </p>
            </article>

            <article className="results__insight-card">
              <div className="results__insight-card-icon" aria-hidden="true">
                <ShieldCheck size={18} />
              </div>

              <span className="results__insight-label">Risk Category</span>

              <strong>{predictionResult.riskLevel}</strong>

              <p>{predictionResult.interpretation}</p>
            </article>

            <article className="results__insight-card">
              <div className="results__insight-card-icon" aria-hidden="true">
                <Lightbulb size={18} />
              </div>

              <span className="results__insight-label">Recommended Signal</span>

              <strong>Retention Attention</strong>

              <p>{predictionResult.decisionSignal}</p>
            </article>
          </div>
        </section>

        <section
          className="results__details"
          aria-labelledby="customer-summary-title"
        >
          <div className="results__details-heading">
            <div className="results__details-icon" aria-hidden="true">
              <UserRound size={21} />
            </div>

            <div>
              <span className="results__details-kicker">
                <ClipboardList size={14} aria-hidden="true" />
                Customer Summary
              </span>

              <h2 id="customer-summary-title">Submitted Information</h2>

              <p>
                A quick view of the customer details used for this prediction.
              </p>
            </div>
          </div>

          {customerDetails.length > 0 ? (
            <div className="results__details-grid">
              {customerDetails.map(([key, value]) => (
                <div className="results__detail-item" key={key}>
                  <span>{formatLabel(key)}</span>
                  <strong>{formatValue(value)}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="results__details-empty">
              <ClipboardList size={18} aria-hidden="true" />
              <span>Customer submission details will appear here.</span>
            </div>
          )}
        </section>

        <div className="results__bottom-actions">
          <p className="results__note">
            Result generated from the customer information submitted in the
            prediction form.
          </p>

          <button
            type="button"
            className="results__secondary-action"
            onClick={handleNewPrediction}
          >
            Run Another Prediction
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Results;
