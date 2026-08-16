import {
  ArrowRight,
  CircleHelp,
  LifeBuoy,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import "./Support.css";

function Support() {
  return (
    <div className="support-page">
      {/* ================================
          SUPPORT HERO
          ================================ */}
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

      {/* ================================
          SUPPORT OPTIONS
          ================================ */}
      <section className="support-options" aria-label="Support options">
        <a
          href="#getting-started"
          className="support-card support-card--active"
        >
          <div className="support-card__icon">
            <LifeBuoy size={24} aria-hidden="true" />
          </div>

          <div className="support-card__content">
            <h2>Getting Started</h2>
            <p>Learn how to use the customer churn prediction platform.</p>
          </div>

          <span className="support-card__arrow" aria-hidden="true">
            <ArrowRight size={18} />
          </span>
        </a>

        <a
          href="#prediction-help"
          className="support-card support-card--active"
        >
          <div className="support-card__icon">
            <MessageCircleQuestion size={24} aria-hidden="true" />
          </div>

          <div className="support-card__content">
            <h2>Prediction Help</h2>
            <p>Understand the prediction form, risk score, and results.</p>
          </div>

          <span className="support-card__arrow" aria-hidden="true">
            <ArrowRight size={18} />
          </span>
        </a>

        <a
          href="#troubleshooting"
          className="support-card support-card--active"
        >
          <div className="support-card__icon">
            <CircleHelp size={24} aria-hidden="true" />
          </div>

          <div className="support-card__content">
            <h2>Troubleshooting</h2>
            <p>Find help for common issues while using the platform.</p>
          </div>

          <span className="support-card__arrow" aria-hidden="true">
            <ArrowRight size={18} />
          </span>
        </a>
      </section>

      {/* ================================
          GETTING STARTED
          ================================ */}
      <section
        id="getting-started"
        className="support-content"
        aria-labelledby="getting-started-title"
      >
        <div className="support-content__header">
          <span className="support-content__eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Getting Started
          </span>

          <h2 id="getting-started-title">
            Start with a customer
            <span> churn prediction.</span>
          </h2>

          <p>
            Follow these simple steps to submit customer information and review
            the estimated churn risk.
          </p>
        </div>

        <div className="support-steps">
          <article className="support-step">
            <span className="support-step__number">01</span>

            <div>
              <h3>Open Prediction</h3>
              <p>
                Go to the Prediction section from the main navigation to start
                entering customer information.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">02</span>

            <div>
              <h3>Enter Customer Information</h3>
              <p>
                Provide the required customer profile, service, and billing
                information in the prediction form.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">03</span>

            <div>
              <h3>Submit the Prediction</h3>
              <p>
                Review the entered information and use the prediction action to
                generate the churn risk result.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">04</span>

            <div>
              <h3>Review the Result</h3>
              <p>
                Review the estimated churn probability and the associated risk
                level on the results page.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ================================
    PREDICTION HELP
    ================================ */}
      <section
        id="prediction-help"
        className="support-content"
        aria-labelledby="prediction-help-title"
      >
        <div className="support-content__header">
          <span className="support-content__eyebrow">
            <MessageCircleQuestion size={16} aria-hidden="true" />
            Prediction Help
          </span>

          <h2 id="prediction-help-title">
            Understand your
            <span> prediction result.</span>
          </h2>

          <p>
            Learn what the prediction form collects, how to submit it, and how
            to interpret the churn risk shown on the results page.
          </p>
        </div>

        <div className="support-steps">
          <article className="support-step">
            <span className="support-step__number">01</span>

            <div>
              <h3>Complete the Prediction Form</h3>
              <p>
                Enter the required customer profile, service, contract, and
                billing information shown in the prediction form.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">02</span>

            <div>
              <h3>Review Your Information</h3>
              <p>
                Check the submitted values before generating the prediction to
                make sure the customer information is complete and correct.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">03</span>

            <div>
              <h3>Understand the Risk Score</h3>
              <p>
                The results page presents an estimated churn probability
                together with a corresponding risk level.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">04</span>

            <div>
              <h3>Interpret the Result</h3>
              <p>
                Use the displayed risk level and supporting information to
                understand the customer's estimated likelihood of churn.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ================================
    TROUBLESHOOTING
    ================================ */}
      <section
        id="troubleshooting"
        className="support-content"
        aria-labelledby="troubleshooting-title"
      >
        <div className="support-content__header">
          <span className="support-content__eyebrow">
            <CircleHelp size={16} aria-hidden="true" />
            Troubleshooting
          </span>

          <h2 id="troubleshooting-title">
            Having trouble?
            <span> Start here.</span>
          </h2>

          <p>
            Check these common issues before contacting support while using the
            customer churn prediction platform.
          </p>
        </div>

        <div className="support-steps">
          <article className="support-step">
            <span className="support-step__number">01</span>

            <div>
              <h3>Prediction Form Not Submitting</h3>
              <p>
                Make sure all required fields have been completed and that the
                entered values are valid before submitting.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">02</span>

            <div>
              <h3>Unexpected or Missing Result</h3>
              <p>
                Check that the customer information was submitted correctly and
                try generating the prediction again.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">03</span>

            <div>
              <h3>Page or Content Not Loading</h3>
              <p>
                Refresh the page and check your connection if part of the
                prediction or results interface does not load correctly.
              </p>
            </div>
          </article>

          <article className="support-step">
            <span className="support-step__number">04</span>

            <div>
              <h3>Still Need Assistance?</h3>
              <p>
                If the issue continues, use the assistance section below to get
                further help.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ================================
          CONTACT / ASSISTANCE
          ================================ */}
      <section
        id="support-contact"
        className="support-assistance"
        aria-label="Contact assistance"
      >
        <div className="support-assistance__content">
          <span className="support-assistance__eyebrow">Still need help?</span>

          <h2>We're here to help.</h2>

          <p>
            If you cannot find what you are looking for, get in touch for
            additional assistance.
          </p>
        </div>
        <a
          href="#support-contact"
          className="support-assistance__action"
          aria-label="Contact Support"
        >
          <span>Contact Support</span>
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

export default Support;
