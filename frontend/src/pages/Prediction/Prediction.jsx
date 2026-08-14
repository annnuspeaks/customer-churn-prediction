import {
  BrainCircuit,
  CircleDollarSign,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import "./Prediction.css";

const yesNoOptions = ["Yes", "No"];

const serviceOptions = ["Yes", "No", "No internet service"];

function SelectField({ label, options, placeholder = "Select option" }) {
  return (
    <label className="prediction__field">
      <span>{label}</span>

      <select defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

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
            {/* Customer Profile */}
            <section className="prediction__form-section">
              <div className="prediction__section-header">
                <div>
                  <h3>Customer Profile</h3>
                  <p>Basic information about the customer.</p>
                </div>
              </div>

              <div className="prediction__fields">
                <SelectField
                  label="Gender"
                  options={["Male", "Female"]}
                  placeholder="Select gender"
                />

                <SelectField label="Senior Citizen" options={["0", "1"]} />

                <SelectField label="Partner" options={yesNoOptions} />

                <SelectField label="Dependents" options={yesNoOptions} />

                <label className="prediction__field">
                  <span>
                    <Clock3 size={14} aria-hidden="true" />
                    Tenure
                  </span>

                  <input type="number" placeholder="e.g. 24 months" />
                </label>
              </div>
            </section>

            {/* Phone & Internet */}
            <section className="prediction__form-section">
              <div className="prediction__section-header">
                <div>
                  <h3>Phone & Internet Services</h3>
                  <p>Customer connectivity and internet service details.</p>
                </div>
              </div>

              <div className="prediction__fields">
                <SelectField label="Phone Service" options={yesNoOptions} />

                <SelectField
                  label="Multiple Lines"
                  options={["Yes", "No", "No phone service"]}
                />

                <SelectField
                  label="Internet Service"
                  options={["DSL", "Fiber optic", "No"]}
                />
              </div>
            </section>

            {/* Additional Services */}
            <section className="prediction__form-section">
              <div className="prediction__section-header">
                <div>
                  <h3>Additional Services</h3>
                  <p>
                    Optional services currently associated with the customer.
                  </p>
                </div>
              </div>

              <div className="prediction__fields">
                <SelectField label="Online Security" options={serviceOptions} />

                <SelectField label="Online Backup" options={serviceOptions} />

                <SelectField
                  label="Device Protection"
                  options={serviceOptions}
                />

                <SelectField label="Tech Support" options={serviceOptions} />

                <SelectField label="Streaming TV" options={serviceOptions} />

                <SelectField
                  label="Streaming Movies"
                  options={serviceOptions}
                />
              </div>
            </section>

            {/* Account & Billing */}
            <section className="prediction__form-section">
              <div className="prediction__section-header">
                <div>
                  <h3>Account & Billing</h3>
                  <p>Contract, payment and billing information.</p>
                </div>
              </div>

              <div className="prediction__fields">
                <SelectField
                  label="Contract"
                  options={["Month-to-month", "One year", "Two year"]}
                />

                <SelectField label="Paperless Billing" options={yesNoOptions} />

                <SelectField
                  label="Payment Method"
                  options={[
                    "Electronic check",
                    "Mailed check",
                    "Bank transfer (automatic)",
                    "Credit card (automatic)",
                  ]}
                />

                <label className="prediction__field">
                  <span>
                    <CircleDollarSign size={14} aria-hidden="true" />
                    Monthly Charges
                  </span>

                  <input type="number" placeholder="e.g. 79.50" />
                </label>

                <label className="prediction__field">
                  <span>Total Charges</span>

                  <input type="number" placeholder="e.g. 1850.25" />
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
