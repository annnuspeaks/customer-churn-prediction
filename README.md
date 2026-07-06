# customer-churn-prediction

End-to-end customer churn prediction platform with feature engineering, model explainability, deployment, and monitoring.

# Master Checklist
## Customer Churn Prediction Platform

### PHASE 1 — Project Planning
- 1.1 Define project objective
- 1.2 Identify target users & business problem
- 1.3 Finalize project architecture
- 1.4 Finalize technology stack
- 1.5 Finalize deployment strategy
- 1.6 Create development roadmap
- 1.7 Define repository standards

### PHASE 2 — Development Environment
- 2.1 Create GitHub repository
- 2.2 Initialize project structure
- 2.3 Setup Python virtual environment
- 2.4 Install dependencies
- 2.5 Configure code quality tools
- 2.6 Initial Git commit

### PHASE 3 — Dataset & Understanding
- 3.1 Select dataset
- 3.2 Data dictionary
- 3.3 Define target variable
- 3.4 Initial data validation

### PHASE 4 — Exploratory Data Analysis (EDA)
- 4.1 Dataset overview
- 4.2 Missing values
- 4.3 Target analysis
- 4.4 Numerical analysis
- 4.5 Categorical analysis
- 4.6 Correlation analysis
- 4.7 Business insights
- 4.8 Save EDA report

### PHASE 5 — Data Preprocessing
- 5.1 Handle missing values
- 5.2 Handle outliers
- 5.3 Encode categorical features
- 5.4 Feature scaling
- 5.5 Train-test split
- 5.6 Build preprocessing pipeline

### PHASE 6 — Feature Engineering
- 6.1 Feature selection
- 6.2 Feature creation
- 6.3 Pipeline optimization

### PHASE 7 — Model Development
- 7.1 Baseline model
- 7.2 Train multiple models
- 7.3 Hyperparameter tuning
- 7.4 Cross-validation
- 7.5 Model comparison
- 7.6 Final model selection

### PHASE 8 — Model Evaluation & Explainability
- 8.1 Performance metrics
- 8.2 Confusion matrix
- 8.3 ROC-AUC analysis
- 8.4 SHAP explainability
- 8.5 Final evaluation report

### PHASE 9 — Backend API
- 9.1 FastAPI setup
- 9.2 Prediction endpoint
- 9.3 Input validation
- 9.4 API documentation
- 9.5 Error handling

### PHASE 10 — Frontend Dashboard
- 10.1 UI design
- 10.2 Prediction form
- 10.3 Results page
- 10.4 Responsive design
- 10.5 API integration

### PHASE 11 — Testing
- 11.1 Unit tests
- 11.2 Integration testing
- 11.3 Manual testing
- 11.4 Bug fixes

### PHASE 12 — Deployment
- 12.1 Dockerize application
- 12.2 Deploy backend
- 12.3 Deploy frontend
- 12.4 Final production testing

### PHASE 13 — Documentation & Portfolio
- 13.1 Professional README
- 13.2 Architecture diagram
- 13.3 Screenshots
- 13.4 Demo video
- 13.5 Portfolio integration

---

## PHASE 1 — Project Planning

### 1.1 Define project objective

Customer Churn Prediction Platform

Objective

A production-ready web application that predicts, based on historical customer data, whether a customer has a high probability of churning..

Business Problem

Many companies (Telecom, SaaS, Banking, Insurance, OTT, subscription services) spend a significant amount of money acquiring new customers. Losing existing customers impacts both revenue and growth.

This platform will help companies identify high-risk customers early on, enabling them to run retention campaigns and reduce churn.

Primary Users
Business Analysts
Customer Success Teams
Marketing Teams
Product Managers
Core Features (MVP)
Upload or entering manually customer information 
Generating churn prediction
Showing probability score
Explaining prediction (important factors)
Clean, responsive web dashboard
REST API
Out of Scope (Intentionally)
User authentication
Multiple organizations (multi-tenant)
Real-time streaming predictions
Complex admin panel
Chatbot integration

### 1.2 Identify target users & business problem

This project is for a Telecommunications Industry.

Target users are:

1. Customer Success Manager - To Monitor Customers for Retention.
2. Marketing Team - To Offer Discount
3. Business Analyst - To Watch Report.
4. Product Manager - To Improve Policies.

### 1.3 Finalize project architecture

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

┌──────────────────┐ ┌──────────────────┐
│ ML Pipeline │ │ Model Artifact │
│ Preprocessing │ │ (.pkl/.joblib) │
│ Feature Pipeline │ └──────────────────┘
│ Prediction │
└──────────────────┘

#### System Architecture

The application follows a modular monolithic architecture, separating the user interface, API layer, and machine learning components while keeping deployment simple and maintainable.

#### Architecture Overview

- **Frontend:** React + TypeScript (Vite)
- **Backend:** FastAPI
- **Machine Learning:** Scikit-learn Pipeline
- **Model Serialization:** Joblib
- **Deployment:** Vercel (Frontend) + Render (Backend)
- **Containerization:** Docker

#### Request Flow

1. The user enters customer information through the web interface.
2. The frontend sends a prediction request to the FastAPI backend.
3. The backend validates the input data.
4. The preprocessing pipeline transforms the input.
5. The trained machine learning model generates a prediction.
6. The backend returns both the churn probability and prediction result to the frontend.

The architecture is intentionally lightweight, scalable, and designed to demonstrate production-level machine learning engineering practices without introducing unnecessary infrastructure complexity.

### 1.4 Finalize technology stack

#### Technology Stack

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

### 1.5 Finalize deployment strategy

#### Deployment Strategy

The project is designed around a simple, production-oriented deployment workflow that remains completely free for portfolio use.

#### Deployment Workflow

```text
Local Development
        │
        ▼
GitHub Repository
        │
        ▼
GitHub Actions (Continuous Integration)
        │
        ├───────────────┐
        ▼               ▼
React Frontend     FastAPI Backend
(Vercel)           (Render)
        │               │
        └───────┬───────┘
                ▼
      Live Customer Churn Platform
```

#### Deployment Components

- **Frontend:** Vercel
- **Backend:** Render
- **Containerization:** Docker
- **Version Control:** GitHub
- **Continuous Integration:** GitHub Actions

This deployment strategy provides a production-like workflow while remaining lightweight, maintainable, and compatible with free hosting services.

### 1.6 Create development roadmap

#### Development Roadmap

The project follows a structured, phase-based development process inspired by professional software engineering workflows. Each phase has clearly defined objectives, deliverables, and completion criteria before progressing to the next stage.

| Phase    | Objective                             |
| -------- | ------------------------------------- |
| Phase 1  | Project Planning                      |
| Phase 2  | Development Environment Setup         |
| Phase 3  | Dataset Selection & Understanding     |
| Phase 4  | Exploratory Data Analysis             |
| Phase 5  | Data Preprocessing                    |
| Phase 6  | Feature Engineering                   |
| Phase 7  | Model Development                     |
| Phase 8  | Model Evaluation & Explainability     |
| Phase 9  | Backend API Development               |
| Phase 10 | Frontend Dashboard Development        |
| Phase 11 | Testing & Quality Assurance           |
| Phase 12 | Deployment                            |
| Phase 13 | Documentation & Portfolio Preparation |

Each phase must satisfy its predefined completion criteria before the next phase begins. This approach ensures consistent quality, maintainability, and reproducibility throughout the project lifecycle.

### 1.7 Define repository standards

#### Repository Standards

The repository follows a consistent set of engineering standards to ensure readability, maintainability, and scalability throughout the project lifecycle.

#### Coding Standards

- Follow the PEP 8 Python Style Guide.
- Format Python code using Black.
- Perform static analysis using Ruff.
- Use descriptive and meaningful names for variables, functions, classes, and files.

#### Naming Conventions

- **Python files:** `snake_case`
- **React components:** `PascalCase`
- **Classes:** `PascalCase`
- **Functions and variables:** `snake_case`

#### Git Commit Convention

The project follows the Conventional Commits specification.

Examples:

- `feat: add prediction endpoint`
- `fix: handle missing values`
- `refactor: simplify preprocessing pipeline`
- `docs: update README`
- `test: add evaluation tests`

#### Documentation

The root `README.md` serves as the primary documentation for the project. Major architectural decisions, implementation details, and deployment instructions will be documented incrementally throughout development.

#### Notebook Policy

Jupyter notebooks are used exclusively for experimentation, exploratory data analysis, and visualization. Production code is implemented as reusable Python modules within the project structure.

## PHASE 2 — Development Environment

### 2.1 Create GitHub repository

customer-churn-prediction github repo created with README initiation.

### 2.2 Initialize project structure

#### Project Structure

The project follows a modular monorepo architecture that separates the frontend, backend, documentation, datasets, and development resources into well-defined directories.

```text
customer-churn-prediction/
├── assets/         # Static assets (images, icons, diagrams)
├── backend/        # FastAPI backend application
│   ├── src/        # Production Python source code
│   ├── tests/      # Backend tests
│   └── requirements.txt
├── configs/        # Project configuration files
├── data/           # Raw and processed datasets
├── docker/         # Docker configuration
├── docs/           # Project documentation
├── frontend/       # React frontend application
├── mlruns/         # Local MLflow experiment tracking
├── notebooks/      # Jupyter notebooks for experimentation
├── .gitignore
├── LICENSE
└── README.md
```

Each directory has a single responsibility, ensuring a clean separation between application code, experimentation, documentation, and deployment resources. This structure improves maintainability and supports future scalability while keeping the repository organized.

#### Design Principles

- A single repository contains the complete application.
- Frontend and backend are developed independently.
- Production code is separated from experimentation.
- Each directory has a single responsibility.
- The structure is designed to remain maintainable and scalable as the project grows.

### 2.3 Setup Python virtual environment

#### Development Environment

The backend application uses a dedicated Python virtual environment to isolate project dependencies from the global Python installation.

#### Prerequisites

- Python 3.12 or later
- Git
- Node.js (for the frontend)

#### Creating the Virtual Environment

```bash
cd backend
python -m venv .venv
```

#### Activating the Environment

**Windows**

```bash
.venv\Scripts\activate
```

**Linux / macOS**

```bash
source .venv/bin/activate
```

#### Python Environment

The project uses a dedicated virtual environment located inside the `backend` directory.

```text
backend/
└── .venv/
```

All backend dependencies are installed inside this isolated environment, ensuring reproducibility and preventing conflicts with other Python projects.

A dedicated virtual environment ensures reproducible dependency management and avoids version conflicts across different Python projects.

### 2.4 Install dependencies

#### Development Environment

The backend application is developed inside an isolated Python virtual environment to ensure reproducible dependency management and eliminate conflicts with other Python projects.

#### Prerequisites

Before setting up the project, ensure the following software is installed:

- Python 3.14.4 (Current Development Environment)
- Git
- Node.js (Frontend Development)
- Visual Studio Code (Recommended)

#### Virtual Environment

Create the virtual environment inside the `backend` directory:

```bash
cd backend
python -m venv .venv
```

Activate the environment.

**Windows (PowerShell)**

```powershell
.\.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt)**

```cmd
.venv\Scripts\activate
```

Once activated, the terminal should display:

```text
(.venv)
```

---

#### Dependency Installation

Project dependencies are installed incrementally in logical groups instead of installing everything at once. This approach improves debugging, dependency management, and long-term maintainability.

#### Core Machine Learning

- NumPy
- Pandas
- Scikit-learn

#### Data Visualization

- Matplotlib
- Plotly

#### Backend API

- FastAPI
- Uvicorn
- Pydantic
- python-multipart

#### Model Libraries

- XGBoost

#### Model Explainability

- SHAP

#### Development Tools

- Black
- Ruff
- Pytest
- Pytest-Cov

The dependency installation strategy intentionally separates libraries by responsibility, making the project easier to understand, maintain, and extend throughout development.

### 2.5 Configure code quality tools

#### Code Quality

The backend project follows modern Python development practices by centralizing formatting, linting, and testing configuration inside a single `pyproject.toml` file.

#### Configured Tools

- **Black** — Automatic code formatting
- **Ruff** — Fast static analysis and linting
- **Pytest** — Unit testing framework

#### Code Formatting

The project uses **Black** as the official Python code formatter.

Formatting rules are centrally managed through `backend/pyproject.toml`, ensuring a consistent coding style across the entire backend codebase.

To format the project:

```bash
cd backend
black .
```

#### Static Analysis

The project uses **Ruff** for fast static analysis and linting.

Ruff helps identify:

- Unused imports
- Unused variables
- Code style issues
- Import ordering
- Potential programming mistakes

Run a project-wide lint check:

```bash
cd backend
ruff check .
```

Automatically fix supported issues:

```bash
ruff check . --fix
```

#### Testing

The project uses **Pytest** as the primary testing framework.

Test discovery is configured through `pyproject.toml`, allowing Pytest to automatically detect test files located inside the `backend/tests` directory.

Naming conventions:

- Test files: `test_*.py`
- Test functions: `test_*`

Run all tests:

```bash
cd backend
pytest
```

Future development will include unit tests, integration tests, and API validation tests to ensure reliability across the entire application.

Using a single configuration file simplifies project maintenance and ensures a consistent development experience across different environments.

#### Project Status

The project is being developed incrementally using a structured, phase-based workflow inspired by professional software engineering practices.

| Phase | Status |
|--------|--------|
| Project Planning | ✅ Completed |
| Development Environment | ✅ Completed |
| Dataset & Understanding | ⏳ Next |
| Exploratory Data Analysis | ⏳ Pending |
| Data Preprocessing | ⏳ Pending |
| Feature Engineering | ⏳ Pending |
| Model Development | ⏳ Pending |
| Model Evaluation | ⏳ Pending |
| Backend API | ⏳ Pending |
| Frontend Dashboard | ⏳ Pending |
| Testing | ⏳ Pending |
| Deployment | ⏳ Pending |
| Documentation & Portfolio | ⏳ Pending |

The repository is now fully prepared for machine learning development. The next phase focuses on dataset selection, validation, and business understanding before any model training begins.

### 2.6 Initial Git commit

Initialized and pushed to git origin main.

## PHASE 3 — Dataset & Understanding

### 3.1 Select dataset

#### Dataset

The project uses the **IBM Telco Customer Churn** dataset, a publicly available benchmark dataset for customer churn prediction.

#### Dataset Overview

- **Domain:** Telecommunications
- **Problem Type:** Binary Classification
- **Target Variable:** `Churn`
- **Records:** Approximately 7,000 customer records
- **Features:** Customer demographics, account information, subscribed services, contract details, billing information, and customer tenure.

#### Dataset Management

To preserve reproducibility:

- The original dataset is stored in `data/raw/`.
- Cleaned and transformed datasets will be stored in `data/processed/`.
- The raw dataset is never modified directly.

### 3.2 Data dictionary

#### Data Dictionary

A complete data dictionary is maintained in `docs/dataset.md`.

The document describes every feature, its data type, business meaning, and role within the machine learning pipeline. Maintaining a dedicated data dictionary improves reproducibility, simplifies feature engineering, and provides clear business context for model development and explainability.

### 3.3 Define target variable

#### Target Variable

The machine learning model predicts the **`Churn`** column, making this a **binary classification** problem.

- **Positive Class (`1`)**: Customer churns
- **Negative Class (`0`)**: Customer remains with the company

Target encoding is performed during the preprocessing stage, while the original dataset is preserved in its raw form to maintain reproducibility.

#### Data Validation

Before exploratory data analysis, the dataset undergoes an initial validation process to verify its overall quality and structure.

The validation includes:

- Dataset dimensions
- Column verification
- Data type inspection
- Missing value analysis
- Blank value detection
- Duplicate record detection
- Target class distribution
- Statistical summary

This validation step establishes a reliable baseline before any preprocessing or feature engineering is performed.


## PHASE 4 — Exploratory Data Analysis (EDA)

### Exploratory Data Analysis

Exploratory Data Analysis (EDA) is performed after validating the dataset to understand its structure, feature distribution, and business characteristics before any preprocessing or model training.

The EDA process includes:

- Dataset overview
- Feature categorization
- Missing value analysis
- Target variable analysis
- Numerical feature analysis
- Categorical feature analysis
- Correlation analysis
- Business insights

### Missing Value Analysis

The dataset is evaluated for multiple forms of missing information before preprocessing.

The validation process includes:

- Null (`NaN`) values
- Blank string values
- Whitespace-only values

A consolidated data quality report is generated to identify affected features. Any detected issues are documented during EDA and resolved later during the preprocessing phase to preserve the integrity of the original dataset.

The objective of EDA is to understand the dataset and identify meaningful patterns before applying machine learning techniques.

### Target Variable Analysis

The target variable (`Churn`) is analyzed to understand customer retention and churn distribution.

The analysis includes:

- Class frequency
- Percentage distribution
- Class imbalance assessment
- Business interpretation

This evaluation establishes the baseline for selecting appropriate model evaluation metrics during the training phase.

### Numerical Feature Analysis

All numerical features are analyzed using descriptive statistics and visualizations.

The analysis includes:

- Statistical summary
- Distribution analysis
- Outlier detection
- Missing value inspection
- Business interpretation

Temporary data type conversions are performed only for visualization purposes. The original dataset remains unchanged throughout the exploratory analysis.

### Categorical Feature Analysis

Categorical and binary features are analyzed to understand customer characteristics and their relationship with churn.

The analysis includes:

- Category frequency distribution
- Percentage distribution
- Feature-wise churn comparison
- Cross-tabulation
- Business interpretation

This analysis helps identify customer segments with higher churn risk and provides valuable insights for feature engineering and model development.

### Correlation Analysis

Correlation analysis is performed on numerical features to understand linear relationships within the dataset.

The analysis includes:

- Correlation matrix
- Heatmap visualization
- Relationship interpretation
- Business insights

Categorical feature relationships are intentionally excluded from this stage and are handled later through preprocessing and feature importance analysis.

### 4.7 Business insights

### 4.8 Save EDA report

## PHASE 5 — Data Preprocessing

### 5.1 Handle missing values

### 5.2 Handle outliers

### 5.3 Encode categorical features

### 5.4 Feature scaling

### 5.5 Train-test split

### 5.6 Build preprocessing pipeline

## PHASE 6 — Feature Engineering

### 6.1 Feature selection

### 6.2 Feature creation

### 6.3 Pipeline optimization

### PHASE 7 — Model Development

### 7.1 Baseline model

### 7.2 Train multiple models

### 7.3 Hyperparameter tuning

### 7.4 Cross-validation

### 7.5 Model comparison

### 7.6 Final model selection

## PHASE 8 — Model Evaluation & Explainability

### 8.1 Performance metrics

### 8.2 Confusion matrix

### 8.3 ROC-AUC analysis

### 8.4 SHAP explainability

### 8.5 Final evaluation report

## PHASE 9 — Backend API

### 9.1 FastAPI setup

### 9.2 Prediction endpoint

### 9.3 Input validation

### 9.4 API documentation

### 9.5 Error handling

## PHASE 10 — Frontend Dashboard

### 10.1 UI design

### 10.2 Prediction form

### 10.3 Results page

### 10.4 Responsive design

### 10.5 API integration

## PHASE 11 — Testing

### 11.1 Unit tests

### 11.2 Integration testing

### 11.3 Manual testing

### 11.4 Bug fixes

## PHASE 12 — Deployment

### 12.1 Dockerize application

### 12.2 Deploy backend

### 12.3 Deploy frontend

### 12.4 Final production testing

## PHASE 13 — Documentation & Portfolio

### 13.1 Professional README

### 13.2 Architecture diagram

### 13.3 Screenshots

### 13.4 Demo video

### 13.5 Portfolio integration
