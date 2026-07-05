# customer-churn-prediction
End-to-end customer churn prediction platform with feature engineering, model explainability, deployment, and monitoring.


<!-- Master Checklist -->
Customer Churn Prediction Platform
==================================

PHASE 1 — Project Planning
⬜ 1.1 Define project objective
⬜ 1.2 Identify target users & business problem
⬜ 1.3 Finalize project architecture
⬜ 1.4 Finalize technology stack
⬜ 1.5 Finalize deployment strategy
⬜ 1.6 Create development roadmap
⬜ 1.7 Define repository standards

PHASE 2 — Development Environment
⬜ 2.1 Create GitHub repository
⬜ 2.2 Initialize project structure
⬜ 2.3 Setup Python virtual environment
⬜ 2.4 Install dependencies
⬜ 2.5 Configure code quality tools
⬜ 2.6 Initial Git commit

PHASE 3 — Dataset & Understanding
⬜ 3.1 Select dataset
⬜ 3.2 Data dictionary
⬜ 3.3 Define target variable
⬜ 3.4 Initial data validation

PHASE 4 — Exploratory Data Analysis (EDA)
⬜ 4.1 Dataset overview
⬜ 4.2 Missing values
⬜ 4.3 Target analysis
⬜ 4.4 Numerical analysis
⬜ 4.5 Categorical analysis
⬜ 4.6 Correlation analysis
⬜ 4.7 Business insights
⬜ 4.8 Save EDA report

PHASE 5 — Data Preprocessing
⬜ 5.1 Handle missing values
⬜ 5.2 Handle outliers
⬜ 5.3 Encode categorical features
⬜ 5.4 Feature scaling
⬜ 5.5 Train-test split
⬜ 5.6 Build preprocessing pipeline

PHASE 6 — Feature Engineering
⬜ 6.1 Feature selection
⬜ 6.2 Feature creation
⬜ 6.3 Pipeline optimization

PHASE 7 — Model Development
⬜ 7.1 Baseline model
⬜ 7.2 Train multiple models
⬜ 7.3 Hyperparameter tuning
⬜ 7.4 Cross-validation
⬜ 7.5 Model comparison
⬜ 7.6 Final model selection

PHASE 8 — Model Evaluation & Explainability
⬜ 8.1 Performance metrics
⬜ 8.2 Confusion matrix
⬜ 8.3 ROC-AUC analysis
⬜ 8.4 SHAP explainability
⬜ 8.5 Final evaluation report

PHASE 9 — Backend API
⬜ 9.1 FastAPI setup
⬜ 9.2 Prediction endpoint
⬜ 9.3 Input validation
⬜ 9.4 API documentation
⬜ 9.5 Error handling

PHASE 10 — Frontend Dashboard
⬜ 10.1 UI design
⬜ 10.2 Prediction form
⬜ 10.3 Results page
⬜ 10.4 Responsive design
⬜ 10.5 API integration

PHASE 11 — Testing
⬜ 11.1 Unit tests
⬜ 11.2 Integration testing
⬜ 11.3 Manual testing
⬜ 11.4 Bug fixes

PHASE 12 — Deployment
⬜ 12.1 Dockerize application
⬜ 12.2 Deploy backend
⬜ 12.3 Deploy frontend
⬜ 12.4 Final production testing

PHASE 13 — Documentation & Portfolio
⬜ 13.1 Professional README
⬜ 13.2 Architecture diagram
⬜ 13.3 Screenshots
⬜ 13.4 Demo video
⬜ 13.5 Portfolio integration
                                **************************************************

=========================================================================================================================
PHASE 1 — Project Planning
=========================================================================================================================
Phase 1.1 Define project objective
=========================================================================================================================

Customer Churn Prediction Platform

Objective

Ek production-ready web application jo historical customer data ke basis par predict kare ki koi customer service chhodne (churn) ki high probability rakhta hai ya nahi.

Business Problem

Kai companies (Telecom, SaaS, Banking, Insurance, OTT, Subscription Services) naye customers acquire karne par bahut paisa kharch karti hain. Existing customers ko lose karna revenue aur growth dono ko impact karta hai.

Ye platform companies ko high-risk customers pehle hi identify karne me help karega, taaki retention campaigns chalakar churn reduce kiya ja sake.

Primary Users
Business Analysts
Customer Success Teams
Marketing Teams
Product Managers
Core Features (MVP)
Upload ya manually customer information enter karna
Churn prediction generate karna
Probability score dikhana
Prediction explain karna (important factors)
Clean, responsive web dashboard
REST API
Out of Scope (Intentionally)
User authentication
Multiple organizations (multi-tenant)
Real-time streaming predictions
Complex admin panel
Chatbot integration

=========================================================================================================================
1.2 Identify target users & business problem
=========================================================================================================================
This project is for a Telecommunications Industry.

Target users are:
1. Customer Success Manager - To Monitor Customers for Retention.
2. Marketing Team - To Offer Discount
3. Business Analyst - To Watch Report.
4. Product Manager - To Improve Policies.

=========================================================================================================================
1.3 Finalize project architecture
=========================================================================================================================

                ┌─────────────────────────┐
                │     React Frontend      │
                │  (TypeScript + Vite)    │
                └──────────┬──────────────┘
                           │ HTTPS
                           ▼
                ┌─────────────────────────┐
                │     FastAPI Backend     │
                │     REST API Layer      │
                └──────────┬──────────────┘
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
 ┌──────────────────┐              ┌──────────────────┐
 │ ML Pipeline      │              │ Model Artifact   │
 │ Preprocessing    │              │ (.pkl/.joblib)   │
 │ Feature Pipeline │              └──────────────────┘
 │ Prediction       │
 └──────────────────┘

## System Architecture

The application follows a modular monolithic architecture, separating the user interface, API layer, and machine learning components while keeping deployment simple and maintainable.

### Architecture Overview

* **Frontend:** React + TypeScript (Vite)
* **Backend:** FastAPI
* **Machine Learning:** Scikit-learn Pipeline
* **Model Serialization:** Joblib
* **Deployment:** Vercel (Frontend) + Render (Backend)
* **Containerization:** Docker

### Request Flow

1. The user enters customer information through the web interface.
2. The frontend sends a prediction request to the FastAPI backend.
3. The backend validates the input data.
4. The preprocessing pipeline transforms the input.
5. The trained machine learning model generates a prediction.
6. The backend returns both the churn probability and prediction result to the frontend.

The architecture is intentionally lightweight, scalable, and designed to demonstrate production-level machine learning engineering practices without introducing unnecessary infrastructure complexity.

=========================================================================================================================
1.4 Finalize technology stack
=========================================================================================================================

## Technology Stack

The project is intentionally built using a minimal yet production-ready technology stack. Every technology has been selected based on industry adoption, long-term maintainability, and its practical value within the project.

| Category             | Technology              |
| -------------------- | ----------------------- |
| Programming Language | Python                  |
| Machine Learning     | Scikit-learn, XGBoost   |
| Data Processing      | Pandas, NumPy           |
| Data Visualization   | Matplotlib, Plotly      |
| Model Explainability | SHAP                    |
| Backend API          | FastAPI                 |
| Frontend             | React, TypeScript, Vite |
| Model Serialization  | Joblib                  |
| Testing              | Pytest                  |
| Code Formatting      | Black                   |
| Linting              | Ruff                    |
| Containerization     | Docker                  |
| Version Control      | Git & GitHub            |
| CI/CD                | GitHub Actions          |
| Frontend Deployment  | Vercel                  |
| Backend Deployment   | Render                  |

The technology stack prioritizes simplicity, performance, and production-readiness while avoiding unnecessary dependencies and infrastructure complexity.


=========================================================================================================================
1.5 Finalize deployment strategy
=========================================================================================================================
=========================================================================================================================
1.6 Create development roadmap
=========================================================================================================================
=========================================================================================================================
1.7 Define repository standards
=========================================================================================================================
=========================================================================================================================
PHASE 2 — Development Environment
=========================================================================================================================
2.1 Create GitHub repository
=========================================================================================================================
2.2 Initialize project structure
=========================================================================================================================
2.3 Setup Python virtual environment
=========================================================================================================================
2.4 Install dependencies
=========================================================================================================================
2.5 Configure code quality tools
=========================================================================================================================
2.6 Initial Git commit
=========================================================================================================================
PHASE 3 — Dataset & Understanding
=========================================================================================================================
3.1 Select dataset
=========================================================================================================================
3.2 Data dictionary
=========================================================================================================================
3.3 Define target variable
=========================================================================================================================
3.4 Initial data validation
=========================================================================================================================
PHASE 4 — Exploratory Data Analysis (EDA)
=========================================================================================================================
4.1 Dataset overview
=========================================================================================================================
4.2 Missing values
=========================================================================================================================
4.3 Target analysis
=========================================================================================================================
4.4 Numerical analysis
=========================================================================================================================
4.5 Categorical analysis
=========================================================================================================================
4.6 Correlation analysis
=========================================================================================================================
4.7 Business insights
=========================================================================================================================
4.8 Save EDA report
=========================================================================================================================
PHASE 5 — Data Preprocessing
=========================================================================================================================
5.1 Handle missing values
=========================================================================================================================
5.2 Handle outliers
=========================================================================================================================
5.3 Encode categorical features
=========================================================================================================================
5.4 Feature scaling
=========================================================================================================================
5.5 Train-test split
=========================================================================================================================
5.6 Build preprocessing pipeline
=========================================================================================================================
PHASE 6 — Feature Engineering
=========================================================================================================================
6.1 Feature selection
=========================================================================================================================
6.2 Feature creation
=========================================================================================================================
6.3 Pipeline optimization
=========================================================================================================================
PHASE 7 — Model Development
=========================================================================================================================
7.1 Baseline model
=========================================================================================================================
7.2 Train multiple models
=========================================================================================================================
7.3 Hyperparameter tuning
=========================================================================================================================
7.4 Cross-validation
=========================================================================================================================
7.5 Model comparison
=========================================================================================================================
7.6 Final model selection
=========================================================================================================================
PHASE 8 — Model Evaluation & Explainability
=========================================================================================================================
8.1 Performance metrics
=========================================================================================================================
8.2 Confusion matrix
=========================================================================================================================
8.3 ROC-AUC analysis
=========================================================================================================================
8.4 SHAP explainability
=========================================================================================================================
8.5 Final evaluation report
=========================================================================================================================
PHASE 9 — Backend API
=========================================================================================================================
9.1 FastAPI setup
=========================================================================================================================
9.2 Prediction endpoint
=========================================================================================================================
9.3 Input validation
=========================================================================================================================
9.4 API documentation
=========================================================================================================================
9.5 Error handling
=========================================================================================================================
PHASE 10 — Frontend Dashboard
=========================================================================================================================
10.1 UI design
=========================================================================================================================
10.2 Prediction form
=========================================================================================================================
10.3 Results page
=========================================================================================================================
10.4 Responsive design
=========================================================================================================================
10.5 API integration
=========================================================================================================================
PHASE 11 — Testing
=========================================================================================================================
11.1 Unit tests
=========================================================================================================================
11.2 Integration testing
=========================================================================================================================
11.3 Manual testing
=========================================================================================================================
11.4 Bug fixes
=========================================================================================================================
PHASE 12 — Deployment
=========================================================================================================================
12.1 Dockerize application
=========================================================================================================================
12.2 Deploy backend
=========================================================================================================================
12.3 Deploy frontend
=========================================================================================================================
12.4 Final production testing
=========================================================================================================================
PHASE 13 — Documentation & Portfolio
=========================================================================================================================
13.1 Professional README
=========================================================================================================================
13.2 Architecture diagram
=========================================================================================================================
13.3 Screenshots
=========================================================================================================================
13.4 Demo video
=========================================================================================================================
13.5 Portfolio integration
=========================================================================================================================