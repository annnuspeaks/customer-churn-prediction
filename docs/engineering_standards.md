# Engineering Standards

This document defines the engineering principles, development conventions, and project standards followed throughout the **Customer Churn Prediction Platform**.

These standards ensure consistency, maintainability, reproducibility, and professional software engineering practices across the project.

> These standards are considered mandatory unless explicitly revised in future project documentation.

---

# ES-01 — Notebook-first, Production-second

## Description

All experimentation, exploration, and validation are performed inside Jupyter notebooks first.

Only validated and reusable logic is migrated to the production backend.

## Implementation

- Jupyter Notebooks
- backend/src

---

# ES-02 — Reusable Configuration

Configuration values such as feature lists, target variables, constants, and paths will be centralized inside reusable configuration modules.

Implementation Phase:

- Phase 5

---

# ES-03 — Visualization Standards

Every visualization must include:

- Clear title
- Axis labels
- Consistent figure size
- Readable formatting
- One graph = One insight

---

# ES-04 — Evidence-driven Machine Learning

Every important conclusion must be validated using three levels of evidence.

1. EDA
2. Statistical Evidence
3. Model Explainability (Feature Importance + SHAP)

Business conclusions are never drawn from EDA alone.

---

# ES-05 — Hypothesis Tracking

EDA observations are converted into hypotheses.

Each hypothesis is tracked until validated or rejected during model development.

Implementation Phase:

- Phase 6

---

# ES-06 — Executive Summaries

Every major project phase concludes with an executive summary containing:

- Objective
- Key Findings
- Business Impact
- Technical Outcome
- Next Steps

---

# ES-07 — Phase Completion Reports

Every completed phase produces:

1. Technical Artifact
2. Documentation Update
3. Executive Summary

---

# ES-08 — Folder-level Documentation

Every major directory maintains its own README.md.

Examples:

- backend/
- frontend/
- notebooks/
- docs/
- data/
- models/
- reports/

---

# ES-09 — Documentation Index

The root README serves as the primary navigation point for all project documentation.

Each folder README is referenced from the root README instead of duplicating content.

---

# ES-10 — Root README Philosophy

The root README provides:

- Project overview
- Architecture
- Installation
- Development roadmap
- Documentation navigation

Detailed implementation belongs inside folder-specific documentation.

---

# Future Standards

Additional engineering standards may be introduced as the project evolves.

Any new standard must be documented in this file before becoming part of the development workflow.