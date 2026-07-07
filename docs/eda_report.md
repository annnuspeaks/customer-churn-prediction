# Exploratory Data Analysis Report

## Executive Summary

### Objective

Perform an exploratory analysis of the IBM Telco Customer Churn dataset to understand data quality, feature characteristics, and business patterns before preprocessing and machine learning model development.

---

### Dataset Overview

- Domain: Telecommunications
- Problem Type: Binary Classification
- Target Variable: Churn
- Records: 7,043
- Features: 20
- Target Column: 1

---

### Data Quality Summary

- Dataset successfully loaded.
- No duplicate records detected.
- No standard NaN values detected.
- 11 whitespace values identified in the `TotalCharges` column.
- Data quality issues documented for preprocessing.

---

### Target Variable Summary

- Customer Retention: ~73%
- Customer Churn: ~27%
- Class imbalance is moderate.
- Accuracy alone will not be sufficient for model evaluation.

---

### Numerical Feature Summary

Analyzed Features:

- tenure
- MonthlyCharges
- TotalCharges

Analysis Performed:

- Descriptive statistics
- Distribution analysis
- Outlier inspection
- Missing value verification

---

### Categorical Feature Summary

Analyzed:

- Customer demographics
- Contract information
- Internet services
- Payment methods
- Technical support services

Feature-wise churn comparisons were performed to identify customer segments with potentially higher churn risk.

---

### Correlation Summary

Correlation analysis was performed on numerical features.

Key relationships were documented for later validation using feature importance and SHAP explainability.

---

### Business Insights

EDA identified several customer characteristics associated with churn.

These observations will be validated during model development before being considered business conclusions.

Potential business opportunities include:

- Early churn prediction
- Customer retention campaigns
- Contract optimization
- Personalized offers
- Revenue protection

---

### Limitations

Exploratory Data Analysis identifies patterns rather than causal relationships.

No preprocessing, feature engineering, or model training has been performed during this phase.

The original dataset has been preserved without modification.

---

### Next Phase

Phase 5 focuses on:

- Data Cleaning
- Data Preprocessing
- Feature Encoding
- Missing Value Handling
- Data Preparation for Machine Learning