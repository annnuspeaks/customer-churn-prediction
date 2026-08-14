import { useState } from "react";
import {
  BrainCircuit,
  CircleDollarSign,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import "./Prediction.css";

const yesNoOptions = ["Yes", "No"];
const serviceOptions = ["Yes", "No", "No internet service"];

const initialFormData = {
  gender: "",
  seniorCitizen: "",
  partner: "",
  dependents: "",
  tenure: "",
  phoneService: "",
  multipleLines: "",
  internetService: "",
  onlineSecurity: "",
  onlineBackup: "",
  deviceProtection: "",
  techSupport: "",
  streamingTV: "",
  streamingMovies: "",
  contract: "",
  paperlessBilling: "",
  paymentMethod: "",
  monthlyCharges: "",
  totalCharges: "",
};

function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Select option",
}) {
  return (
    <label
      className={`prediction__field${error ? " prediction__field--error" : ""}`}
    >
      <span>{label}</span>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <small id={`${id}-error`} className="prediction__error">
          {error}
        </small>
      )}
    </label>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  icon,
  min,
  max,
  step,
}) {
  return (
    <label
      className={`prediction__field${error ? " prediction__field--error" : ""}`}
    >
      <span>
        {icon}
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <small id={`${id}-error`} className="prediction__error">
          {error}
        </small>
      )}
    </label>
  );
}

function Prediction() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({ ...current, [name]: value }));

    setErrors((current) => {
      if (!current[name]) return current;
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const validateForm = () => {
    const nextErrors = {};

    Object.entries(formData).forEach(([field, value]) => {
      if (String(value).trim() === "") {
        nextErrors[field] = "This field is required.";
      }
    });

    if (formData.tenure !== "") {
      const tenure = Number(formData.tenure);
      if (!Number.isInteger(tenure) || tenure < 0 || tenure > 72) {
        nextErrors.tenure = "Enter a valid tenure between 0 and 72 months.";
      }
    }

    if (formData.monthlyCharges !== "") {
      const monthlyCharges = Number(formData.monthlyCharges);
      if (!Number.isFinite(monthlyCharges) || monthlyCharges < 0) {
        nextErrors.monthlyCharges =
          "Enter a valid non-negative monthly charge.";
      }
    }

    if (formData.totalCharges !== "") {
      const totalCharges = Number(formData.totalCharges);
      if (!Number.isFinite(totalCharges) || totalCharges < 0) {
        nextErrors.totalCharges = "Enter a valid non-negative total charge.";
      }
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitMessage("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const predictionPayload = {
      ...formData,
      tenure: Number(formData.tenure),
      monthlyCharges: Number(formData.monthlyCharges),
      totalCharges: Number(formData.totalCharges),
    };

    // API integration will be implemented in Phase 10.5.
    console.log("Prediction payload ready:", predictionPayload);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Prediction request prepared successfully.");
    }, 700);
  };

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

          <form className="prediction__form" onSubmit={handleSubmit} noValidate>
            <section className="prediction__form-section">
              <div className="prediction__section-header">
                <div>
                  <h3>Customer Profile</h3>
                  <p>Basic information about the customer.</p>
                </div>
              </div>

              <div className="prediction__fields">
                <SelectField
                  id="gender"
                  label="Gender"
                  options={["Male", "Female"]}
                  value={formData.gender}
                  onChange={handleChange}
                  error={errors.gender}
                  placeholder="Select gender"
                />
                <SelectField
                  id="seniorCitizen"
                  label="Senior Citizen"
                  options={["0", "1"]}
                  value={formData.seniorCitizen}
                  onChange={handleChange}
                  error={errors.seniorCitizen}
                />
                <SelectField
                  id="partner"
                  label="Partner"
                  options={yesNoOptions}
                  value={formData.partner}
                  onChange={handleChange}
                  error={errors.partner}
                />
                <SelectField
                  id="dependents"
                  label="Dependents"
                  options={yesNoOptions}
                  value={formData.dependents}
                  onChange={handleChange}
                  error={errors.dependents}
                />
                <InputField
                  id="tenure"
                  label="Tenure"
                  type="number"
                  value={formData.tenure}
                  onChange={handleChange}
                  error={errors.tenure}
                  placeholder="e.g. 24 months"
                  icon={<Clock3 size={14} aria-hidden="true" />}
                  min="0"
                  max="72"
                  step="1"
                />
              </div>
            </section>

            <section className="prediction__form-section">
              <div className="prediction__section-header">
                <div>
                  <h3>Phone & Internet Services</h3>
                  <p>Customer connectivity and internet service details.</p>
                </div>
              </div>

              <div className="prediction__fields">
                <SelectField
                  id="phoneService"
                  label="Phone Service"
                  options={yesNoOptions}
                  value={formData.phoneService}
                  onChange={handleChange}
                  error={errors.phoneService}
                />
                <SelectField
                  id="multipleLines"
                  label="Multiple Lines"
                  options={["Yes", "No", "No phone service"]}
                  value={formData.multipleLines}
                  onChange={handleChange}
                  error={errors.multipleLines}
                />
                <SelectField
                  id="internetService"
                  label="Internet Service"
                  options={["DSL", "Fiber optic", "No"]}
                  value={formData.internetService}
                  onChange={handleChange}
                  error={errors.internetService}
                />
              </div>
            </section>

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
                <SelectField
                  id="onlineSecurity"
                  label="Online Security"
                  options={serviceOptions}
                  value={formData.onlineSecurity}
                  onChange={handleChange}
                  error={errors.onlineSecurity}
                />
                <SelectField
                  id="onlineBackup"
                  label="Online Backup"
                  options={serviceOptions}
                  value={formData.onlineBackup}
                  onChange={handleChange}
                  error={errors.onlineBackup}
                />
                <SelectField
                  id="deviceProtection"
                  label="Device Protection"
                  options={serviceOptions}
                  value={formData.deviceProtection}
                  onChange={handleChange}
                  error={errors.deviceProtection}
                />
                <SelectField
                  id="techSupport"
                  label="Tech Support"
                  options={serviceOptions}
                  value={formData.techSupport}
                  onChange={handleChange}
                  error={errors.techSupport}
                />
                <SelectField
                  id="streamingTV"
                  label="Streaming TV"
                  options={serviceOptions}
                  value={formData.streamingTV}
                  onChange={handleChange}
                  error={errors.streamingTV}
                />
                <SelectField
                  id="streamingMovies"
                  label="Streaming Movies"
                  options={serviceOptions}
                  value={formData.streamingMovies}
                  onChange={handleChange}
                  error={errors.streamingMovies}
                />
              </div>
            </section>

            <section className="prediction__form-section">
              <div className="prediction__section-header">
                <div>
                  <h3>Account & Billing</h3>
                  <p>Contract, payment and billing information.</p>
                </div>
              </div>

              <div className="prediction__fields">
                <SelectField
                  id="contract"
                  label="Contract"
                  options={["Month-to-month", "One year", "Two year"]}
                  value={formData.contract}
                  onChange={handleChange}
                  error={errors.contract}
                />
                <SelectField
                  id="paperlessBilling"
                  label="Paperless Billing"
                  options={yesNoOptions}
                  value={formData.paperlessBilling}
                  onChange={handleChange}
                  error={errors.paperlessBilling}
                />
                <SelectField
                  id="paymentMethod"
                  label="Payment Method"
                  options={[
                    "Electronic check",
                    "Mailed check",
                    "Bank transfer (automatic)",
                    "Credit card (automatic)",
                  ]}
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  error={errors.paymentMethod}
                />
                <InputField
                  id="monthlyCharges"
                  label="Monthly Charges"
                  type="number"
                  value={formData.monthlyCharges}
                  onChange={handleChange}
                  error={errors.monthlyCharges}
                  placeholder="e.g. 79.50"
                  icon={<CircleDollarSign size={14} aria-hidden="true" />}
                  min="0"
                  step="0.01"
                />
                <InputField
                  id="totalCharges"
                  label="Total Charges"
                  type="number"
                  value={formData.totalCharges}
                  onChange={handleChange}
                  error={errors.totalCharges}
                  placeholder="e.g. 1850.25"
                  min="0"
                  step="0.01"
                />
              </div>
            </section>

            <button
              type="submit"
              className="prediction__submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              <BrainCircuit size={18} aria-hidden="true" />
              {isSubmitting ? "Preparing Prediction..." : "Predict Churn Risk"}
            </button>
            {submitMessage && (
              <p className="prediction__submit-message" role="status">
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default Prediction;
