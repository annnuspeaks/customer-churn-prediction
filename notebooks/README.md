# Notebooks

This directory contains all Jupyter notebooks used throughout the development of the **Customer Churn Prediction Platform**.

The notebooks are organized according to the project development phases and are intended for **exploration, experimentation, validation, and analysis**.

> **Important**
>
> Notebooks are used for research and experimentation only.
> Production-ready implementations are migrated to the `backend/src` package once the logic has been validated.

---

# Notebook Execution Order

Execute the notebooks in the following order:

| Order | Notebook | Purpose | Status |
|------:|----------|---------|--------|
| 01 | `01_data_validation.ipynb` | Initial dataset validation and quality inspection | ✅ Completed |
| 02 | `02_exploratory_data_analysis.ipynb` | Exploratory Data Analysis (EDA) and business insights | ✅ Completed |

Future notebooks will be added as the project progresses.

---

# Notebook Details

## 01_data_validation.ipynb

### Objective

Validate the dataset before performing any preprocessing or machine learning.

### Activities

- Load dataset
- Verify dataset dimensions
- Inspect column names
- Inspect data types
- Detect missing values
- Detect blank values
- Detect whitespace values
- Identify duplicate records
- Analyze target distribution
- Generate descriptive statistics

### Outputs

- Dataset quality report
- Missing value summary
- Duplicate record summary
- Initial validation report

---

## 02_exploratory_data_analysis.ipynb

### Objective

Understand the dataset from both technical and business perspectives before preprocessing.

### Activities

- Dataset overview
- Feature categorization
- Missing value analysis
- Target variable analysis
- Numerical feature analysis
- Categorical feature analysis
- Correlation analysis
- Business insights
- Executive summary

### Outputs

- Distribution analysis
- Correlation analysis
- Business insights
- EDA report
- Visualizations
- Feature observations

---

# Notebook Guidelines

All notebooks in this project follow the same structure.

1. Objective
2. Data Loading
3. Analysis
4. Visualizations
5. Observations
6. Business Interpretation
7. Executive Summary

---

# Engineering Standards

The notebooks follow the engineering principles adopted throughout the project.

- Notebook-first, Production-second
- One graph = One insight
- No modification of the raw dataset
- All observations must be evidence-driven
- Business conclusions require validation through machine learning models and SHAP explainability
- Reusable logic is migrated to `backend/src`

---

# Future Notebooks

The following notebooks will be added during later phases.

| Order | Notebook | Planned Phase |
|------:|----------|--------------:|
| 03 | `03_data_preprocessing.ipynb` | Phase 5 |
| 04 | `04_feature_engineering.ipynb` | Phase 6 |
| 05 | `05_model_training.ipynb` | Phase 7 |
| 06 | `06_model_evaluation.ipynb` | Phase 8 |
| 07 | `07_model_explainability.ipynb` | Phase 9 |
| 08 | `08_prediction_pipeline_testing.ipynb` | Phase 10 |

---

# Notes

These notebooks document the complete research and development lifecycle of the project.

Together with the production backend, they provide a transparent and reproducible machine learning workflow from raw data to deployment.