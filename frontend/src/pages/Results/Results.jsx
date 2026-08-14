function Results() {
  const { state } = useLocation();
  const { predictionPayload } = state || {};

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
            Here are the results of your customer churn risk prediction.
          </p>
        </div>
      </section>

      {predictionPayload && (
        <section className="results__content">
          <div className="results__form-card">
            <div className="results__form-header">
              <div className="results__form-icon">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
              <div>
                <h2>Prediction Details</h2>
                <p>Review the predicted churn risk for the customer.</p>
              </div>
            </div>

            <div className="results__fields">
              {/* Display prediction results here */}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Results;