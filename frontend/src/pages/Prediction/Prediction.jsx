import {
  BrainCircuit,
  CircleDollarSign,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import "./Prediction.css";

function Prediction() {
  return (
    <main className="prediction">
      <section className="prediction__hero">
        <div className="prediction__heading">
          <div className="prediction__eyebrow">
            <BrainCircuit size={16} aria-hidden="true" />
            <span>AI Churn Risk Prediction</span>
          </div>

          <h1 className="prediction__title">
            Predict Customer
            <span className="prediction__title-accent">Churn Risk.</span>
          </h1>

          <p className="prediction__description">
            Enter customer information to estimate their churn risk using the
            machine learning prediction platform.
          </p>
        </div>

        <div className="prediction__form-card">
          <div className="prediction__form-header">
            <div className="prediction__form-icon">
              <ShieldCheck size={24} aria-hidden="true" />
            </div>

            <div>
              <h2>Customer Information</h2>
              <p>Provide the required customer details below.</p>
            </div>
          </div>

          <form className="prediction__form">
            <section className="prediction__form-section">
              <h3>Customer Profile</h3>

              <div className="prediction__fields">
                <label className="prediction__field">
                  <span>Gender</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>

                <label className="prediction__field">
                  <span>Senior Citizen</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select option
                    </option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </label>

                <label className="prediction__field">
                  <span>Partner</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="prediction__field">
                  <span>Dependents</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="prediction__form-section">
              <h3>Account Information</h3>

              <div className="prediction__fields">
                <label className="prediction__field">
                  <span>
                    <Clock3 size={14} aria-hidden="true" />
                    Tenure
                  </span>

                  <input type="number" placeholder="Enter tenure" />
                </label>

                <label className="prediction__field">
                  <span>Contract</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select contract
                    </option>
                    <option value="Month-to-month">Month-to-month</option>
                    <option value="One year">One year</option>
                    <option value="Two year">Two year</option>
                  </select>
                </label>

                <label className="prediction__field">
                  <span>
                    <CircleDollarSign size={14} aria-hidden="true" />
                    Monthly Charges
                  </span>

                  <input type="number" placeholder="Enter monthly charges" />
                </label>

                <label className="prediction__field">
                  <span>Total Charges</span>

                  <input type="number" placeholder="Enter total charges" />
                </label>
              </div>
            </section>

            <button type="button" className="prediction__submit">
              <BrainCircuit size={18} aria-hidden="true" />
              Predict Churn Risk
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Prediction;
