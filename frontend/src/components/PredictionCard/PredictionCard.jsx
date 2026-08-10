import {
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./PredictionCard.css";

function PredictionCard() {
  return (
    <article className="prediction-card">
      <div className="prediction-card__glow" />

      <div className="prediction-card__visual">
        <div className="prediction-card__brain">
          <BrainCircuit size={30} aria-hidden="true" />
        </div>

        <div className="prediction-card__people" aria-hidden="true">
          <span className="prediction-card__person prediction-card__person--one">
            <UserRound size={20} />
          </span>

          <span className="prediction-card__person prediction-card__person--two">
            <UserRound size={18} />
          </span>

          <span className="prediction-card__person prediction-card__person--three">
            <UserRound size={22} />
          </span>

          <span className="prediction-card__person prediction-card__person--four">
            <UserRound size={17} />
          </span>
        </div>
      </div>

      <div className="prediction-card__content">
        <span className="prediction-card__eyebrow">
          <ShieldCheck size={14} aria-hidden="true" />
          ML Risk Analysis
        </span>

        <h2 className="prediction-card__title">
          Predict Churn Risk
        </h2>

        <p className="prediction-card__description">
          Analyze customer information and identify customers who
          may be at risk of leaving.
        </p>
      </div>

      <Link
        to="/prediction"
        className="prediction-card__action"
      >
        <span>Start Prediction</span>
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}

export default PredictionCard;