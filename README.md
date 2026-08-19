````markdown
# Customer Churn Prediction Platform

An end-to-end machine learning platform that predicts customer churn risk and provides actionable insights through a production-ready web application.

## 🚀 Live Demo

**Web Application:** https://churnmatrix.vercel.app/

The platform allows users to enter customer information and receive a churn probability, risk level, and prediction insights.

---

## 🎯 Project Overview

Customer churn is a major business challenge for subscription-based companies.

This project uses historical telecom customer data to predict whether a customer is likely to leave the service.

The system combines:

- Data analysis
- Feature engineering
- Machine learning
- Model explainability
- REST API development
- React frontend
- Production deployment

The primary objective is to help business teams identify high-risk customers early and support retention decisions.

---

## ✨ Key Features

- Customer churn probability prediction
- Risk-level classification
- Interactive prediction dashboard
- Prediction result visualization
- Model-driven insights
- REST API using FastAPI
- Responsive React interface
- Dark / Light theme
- API health check
- Production deployment
- Dockerized backend

---

## 🏗️ System Architecture

```text
                 ┌──────────────────────┐
                 │     React + Vite     │
                 │       Frontend       │
                 └──────────┬───────────┘
                            │ HTTPS
                            ▼
                 ┌──────────────────────┐
                 │       FastAPI        │
                 │      REST API        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ ML Preprocessing     │
                 │ & Feature Pipeline   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Logistic Regression  │
                 │     ML Model         │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Churn Probability    │
                 │ + Risk Prediction    │
                 └──────────────────────┘
````

### Deployment

```text
GitHub
   │
   ├── Frontend ──► Vercel
   │
   └── Backend  ──► Render
```

---

## 🧠 Machine Learning

### Dataset

The project uses the **IBM Telco Customer Churn dataset**.

| Property | Value                 |
| -------- | --------------------- |
| Domain   | Telecommunications    |
| Problem  | Binary Classification |
| Records  | 7,043                 |
| Features | 20                    |
| Target   | `Churn`               |

The original dataset is preserved and is never modified directly.

### Target

```text
0 → Customer remains
1 → Customer churns
```

### Model

The final production model is:

**Logistic Regression**

The persisted model contains the preprocessing and prediction workflow required for inference.

---

## 🔧 Technology Stack

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* XGBoost
* SHAP
* Matplotlib
* Plotly

### Backend

* FastAPI
* Uvicorn
* Pydantic
* Joblib

### Frontend

* React
* Vite
* JavaScript / JSX
* CSS
* React Router
* Lucide React

### Engineering & Deployment

* Git
* GitHub
* Docker
* GitHub Actions
* Vercel
* Render

---

## 🔌 API

The FastAPI backend exposes:

| Method | Endpoint   | Purpose          |
| ------ | ---------- | ---------------- |
| GET    | `/`        | API status       |
| GET    | `/health`  | Health check     |
| POST   | `/predict` | Churn prediction |

Interactive API documentation is available through FastAPI's OpenAPI interface when the backend is running.

---

## 💻 Local Development

### Backend

```bash
cd backend

# Activate virtual environment
.venv\Scripts\activate

# Run API
uvicorn src.api.main:app --reload
```

### Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 📁 Project Structure

```text
customer-churn-prediction/
│
├── backend/
│   ├── src/
│   ├── artifacts/
│   ├── docs/
│   ├── tests/
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── README.md
│
├── data/
│   ├── raw/
│   └── processed/
│
├── docs/
│   ├── dataset.md
│   ├── eda_report.md
│   ├── architecture_decisions.md
│   └── engineering_standards.md
│
├── notebooks/
│
├── assets/
│
├── README.md
└── LICENSE
```

---

## 📚 Documentation

The root README is the primary documentation and navigation point for the project.

### Project Documentation

* [Dataset & Data Dictionary](docs/dataset.md)
* [EDA Report](docs/eda_report.md)
* [Architecture Decisions](docs/architecture_decisions.md)
* [Engineering Standards](docs/engineering_standards.md)
* [Backend Documentation](backend/README.md)
* [Frontend Documentation](frontend/README.md)

---

## 🔬 Development Approach

The project was developed through a structured machine learning engineering workflow:

```text
Project Planning
      ↓
Environment Setup
      ↓
Dataset Understanding
      ↓
EDA
      ↓
Data Preprocessing
      ↓
Feature Engineering
      ↓
Model Development
      ↓
Model Evaluation
      ↓
Explainability
      ↓
Backend API
      ↓
Frontend Dashboard
      ↓
Testing
      ↓
Deployment
```

The project follows a **Notebook-first, Production-second** approach: experimentation and validation are performed first, while reusable validated logic is moved into production code.

---

## 📊 Business Use Case

The prediction system can support:

* Customer retention campaigns
* Identification of high-risk customers
* Personalized offers
* Contract optimization
* Revenue protection
* Customer success decision-making

Predictions should be treated as decision-support signals rather than guaranteed outcomes.

---

## 🛡️ Engineering Principles

The project emphasizes:

* Reproducibility
* Modular architecture
* Reusable ML pipelines
* Separation of experimentation and production code
* Input validation
* Code quality
* Maintainable documentation
* Simple production deployment

---

## 👨‍💻 Author

**Anurag Shukla**

Machine Learning / AI Engineering Projects

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.

```