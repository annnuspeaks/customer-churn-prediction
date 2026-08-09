# Customer Churn Prediction Platform — Backend Documentation

> Comprehensive technical documentation for the production backend of the Customer Churn Prediction Platform.

---

# Table of Contents

1. [Backend Overview](#1-backend-overview)
2. [Project Context](#2-project-context)
3. [Backend Responsibilities](#3-backend-responsibilities)
4. [System Architecture](#4-system-architecture)
5. [Backend Directory Structure](#5-backend-directory-structure)
6. [Technology Stack](#6-technology-stack)
7. [Dependency Management](#7-dependency-management)
8. [Application Architecture](#8-application-architecture)
9. [Application Lifecycle](#9-application-lifecycle)
10. [ML Model Integration](#10-ml-model-integration)
11. [ML Preprocessing Pipeline](#11-ml-preprocessing-pipeline)
12. [Model Artifact Management](#12-model-artifact-management)
13. [Prediction Flow](#13-prediction-flow)
14. [API Overview](#14-api-overview)
15. [Root Endpoint](#15-root-endpoint)
16. [Health Check Endpoint](#16-health-check-endpoint)
17. [Prediction Endpoint](#17-prediction-endpoint)
18. [Request Schema](#18-request-schema)
19. [Customer Input Fields](#19-customer-input-fields)
20. [Input Validation](#20-input-validation)
21. [Prediction Response](#21-prediction-response)
22. [HTTP Status Codes](#22-http-status-codes)
23. [Error Handling](#23-error-handling)
24. [OpenAPI Documentation](#24-openapi-documentation)
25. [Swagger UI](#25-swagger-ui)
26. [ReDoc](#26-redoc)
27. [API Testing](#27-api-testing)
28. [Local Development](#28-local-development)
29. [Virtual Environment](#29-virtual-environment)
30. [Running the Backend](#30-running-the-backend)
31. [Development Workflow](#31-development-workflow)
32. [Testing Strategy](#32-testing-strategy)
33. [Model Inference Testing](#33-model-inference-testing)
34. [Validation Testing](#34-validation-testing)
35. [Configuration and Paths](#35-configuration-and-paths)
36. [Frontend Integration](#36-frontend-integration)
37. [API Contract for Frontend](#37-api-contract-for-frontend)
38. [Performance Considerations](#38-performance-considerations)
39. [Reliability Considerations](#39-reliability-considerations)
40. [Deployment Architecture](#40-deployment-architecture)
41. [Render Deployment](#41-render-deployment)
42. [Render Free-Tier Strategy](#42-render-free-tier-strategy)
43. [Render Build Configuration](#43-render-build-configuration)
44. [Render Start Command](#44-render-start-command)
45. [Render Port Configuration](#45-render-port-configuration)
46. [Render Deployment Procedure](#46-render-deployment-procedure)
47. [Production API Verification](#47-production-api-verification)
48. [Frontend Deployment on Vercel](#48-frontend-deployment-on-vercel)
49. [Deployment Failure Scenarios](#49-deployment-failure-scenarios)
50. [Deployment Status](#50-deployment-status)
51. [Deployment Checklist](#51-deployment-checklist)
52. [Deployment Architecture Decision](#52-deployment-architecture-decision)
53. [Security Considerations](#53-security-considerations)
54. [CORS Strategy](#54-cors-strategy)
55. [Secrets and Environment Variables](#55-secrets-and-environment-variables)
56. [Logging and Monitoring](#56-logging-and-monitoring)
57. [Performance and Reliability Troubleshooting](#57-performance-and-reliability-troubleshooting)
58. [Common Development Issues](#58-common-development-issues)
59. [API Troubleshooting](#59-api-troubleshooting)
60. [Model Loading Troubleshooting](#60-model-loading-troubleshooting)
61. [Deployment Troubleshooting](#61-deployment-troubleshooting)
62. [Dependency Troubleshooting](#62-dependency-troubleshooting)
63. [Security Troubleshooting](#63-security-troubleshooting)
64. [Troubleshooting Decision Tree](#64-troubleshooting-decision-tree)
65. [Security and Troubleshooting Status](#65-security-and-troubleshooting-status)

---
# 1. Backend Overview

The backend is the production-serving layer of the Customer Churn Prediction Platform.

It exposes the trained machine learning model through a lightweight FastAPI application and provides HTTP endpoints that allow client applications to submit customer information and receive churn predictions.

The backend is intentionally separated from the experimentation notebooks.

The notebooks are responsible for experimentation, analysis, validation, model development, and explainability. The backend is responsible for serving the validated model and reusable preprocessing logic.

This separation follows the project's Notebook-first, Production-second engineering standard.

## 1.1 Primary Responsibilities

The backend currently provides the following capabilities:

- Serve the selected machine learning model.
- Load the persisted model artifact at application startup.
- Accept customer information through an HTTP API.
- Validate incoming customer data using Pydantic.
- Pass validated data through the persisted preprocessing pipeline.
- Generate a binary churn prediction.
- Generate a churn probability.
- Provide a health-check endpoint.
- Provide automatic OpenAPI documentation through FastAPI.
- Provide a lightweight architecture suitable for free-tier deployment on Render.

## 1.2 Current Backend Technology

The current backend uses:

| Component | Technology |
|---|---|
| API Framework | FastAPI |
| ASGI Server | Uvicorn |
| Request Validation | Pydantic |
| DataFrame Construction | pandas |
| Model Serialization | joblib |
| Machine Learning | scikit-learn |
| Deployment Target | Render Free Tier |

## 1.3 Backend Design Principle

The backend should remain lightweight.

The API should not reproduce machine learning preprocessing logic manually.

Instead, the persisted model contains the preprocessing and prediction workflow required for inference.

This reduces the risk of training-serving skew and ensures that the same transformations validated during model development are used during API inference.


# 2. Project Context

The Customer Churn Prediction Platform is a machine learning project designed to predict whether a telecom customer is likely to discontinue their service.

The machine learning problem is formulated as binary classification.

The original dataset contains customer demographic, service, contract, billing, and account-related information.

The target variable is `Churn`.

The project defines:

| Target Value | Encoded Value | Meaning |
|---|---:|---|
| No | 0 | Customer remains with the company |
| Yes | 1 | Customer leaves the company |

The backend represents the transition from the machine learning development lifecycle into a consumable prediction service.

## 2.1 ML Development to Production Flow

The overall development lifecycle follows:

```text
Raw Dataset
    ↓
Data Validation
    ↓
Exploratory Data Analysis
    ↓
Data Preparation
    ↓
Feature Engineering
    ↓
Model Development
    ↓
Model Evaluation
    ↓
Model Explainability
    ↓
Final Model Artifact
    ↓
FastAPI Backend
    ↓
Prediction API
    ↓
Frontend / Client
```

## 2.2 Production Boundary

The notebooks represent the research and experimentation environment.

The backend represents the production-serving environment.

This distinction is important because experimental code should not automatically become production code.

Reusable and validated preprocessing logic was migrated into:

```bash
backend/src/ml/
```

The API implementation resides under:

```bash
backend/src/api/
```

# 3. Backend Responsibilities

The backend is responsible for exposing the trained model as a reliable prediction service.

## 3.1 Model Serving

The backend loads the persisted Logistic Regression model from:

```bash
backend/artifacts/models/logistic_regression_final.joblib
```

The model is loaded when the FastAPI application starts.

## 3.2 Request Handling

The API accepts HTTP requests from clients.

For prediction requests, the client submits customer attributes as JSON.

FastAPI receives the request and passes it through the Pydantic validation layer.

## 3.3 Input Validation

The CustomerInput schema defines the accepted customer attributes.

Validation currently includes:

 - Required fields.
 - Allowed categorical values.
 - Non-negative tenure.
 - Non-negative monthly charges.
 - Non-negative total charges.

Invalid requests are rejected before being passed to the machine learning model.

## 3.4 Inference

After successful validation:
```bash
Validated JSON
    ↓
CustomerInput
    ↓
Dictionary
    ↓
pandas DataFrame
    ↓
Persisted ML Pipeline
    ↓
Logistic Regression
    ↓
Prediction
```

## 3.5 Response Generation

The prediction endpoint currently returns:

 - Numeric prediction.
 - Human-readable churn label.
 - Churn probability.

## 3.6 Health Monitoring

The ```/health``` endpoint provides a simple application-level health response.

The current health endpoint confirms that the API application is responding.

It does not currently perform a deep model or dependency health check.

That distinction should be preserved when interpreting the endpoint.

# 4. System Architecture

The current backend architecture follows a layered model-serving design.

```bash

                         CLIENT
                           │
                           │ HTTP
                           ▼
                 ┌───────────────────┐
                 │     FastAPI       │
                 │    Application    │
                 └─────────┬─────────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
           Root         Health       Prediction
             │             │             │
             │             │             ▼
             │             │       Pydantic Validation
             │             │             │
             │             │             ▼
             │             │       pandas DataFrame
             │             │             │
             │             │             ▼
             │             │    Persisted ML Pipeline
             │             │             │
             │             │             ▼
             │             │    Logistic Regression
             │             │             │
             │             │             ▼
             │             │      Prediction Result
             │             │             │
             └─────────────┴─────────────┘
                           │
                           ▼
                         JSON

```

## 4.1 Architectural Layers

The current implementation can be understood through the following logical layers:

### API Layer

Responsible for:
 - HTTP routing.
 - Request handling.
 - Response generation.
 - API metadata.

Implemented using FastAPI.

### Validation Layer

Responsible for:

 - Input schema definition.
 - Type validation.
 - Allowed categorical values.
 - Numeric constraints.

Implemented using Pydantic.

### Data Preparation Layer

Responsible for preparing incoming data before model inference.

This logic is implemented inside the reusable machine learning preprocessing pipeline.

### Feature Engineering Layer

Responsible for generating engineered features required by the trained model.

Current examples include:
 - ServiceCount
 - TenureGroup

### Preprocessing Layer

Responsible for numerical scaling and categorical encoding.

The current implementation uses:
 - StandardScaler
 - OneHotEncoder

### Model Layer

Responsible for generating the final prediction.

The selected model is Logistic Regression.

### Artifact Layer

Responsible for storing the serialized final model.

Current artifact:
```bash
backend/artifacts/models/logistic_regression_final.joblib
```

# 5. Backend Directory Structure

The current backend follows a separation between API code, machine learning logic, model artifacts, documentation, and dependencies.

```bash
backend/
├── README.md
├── requirements.txt
│
├── artifacts/
│   └── models/
│       └── logistic_regression_final.joblib
│
├── docs/
│   └── backend.md
│
└── src/
    ├── api/
    │   ├── __init__.py
    │   ├── main.py
    │   └── schemas.py
    │
    └── ml/
        └── preprocessing_pipeline.py
```

## 5.1 ```backend/README.md```

Provides a concise introduction and quick-start information for the backend.

It is intentionally shorter than this document.

## 5.2 ```backend/requirements.txt```

Contains Python dependencies required by the backend and associated machine learning implementation.

The project does not maintain a root-level requirements.txt.

## 5.3 ```backend/artifacts/```

Contains persisted machine learning artifacts.

The current model artifact is stored under:

```bash 
backend/artifacts/models/
```

## 5.4 ```backend/docs/```

Contains detailed backend technical documentation.

The primary document is:

```bash
backend/docs/backend.md
```

## 5.5 ```backend/src/api/```

Contains FastAPI application code.

Current files:
```bash
main.py
schemas.py
__init__.py
```

```main.py```

Defines the FastAPI application and API endpoints.

```schemas.py```

Defines the Pydantic request schema.

```__init__.py```

Marks the API directory as a Python package.

## 5.6 ```backend/src/ml/```

Contains reusable machine learning logic migrated from the experimentation workflow.

The current preprocessing implementation is:

```bash
backend/src/ml/preprocessing_pipeline.py
```

# 6. Technology Stack

## 6.1 FastAPI

FastAPI is the HTTP API framework used by the backend.

It provides:
 - Route definitions.
 - Request parsing.
 - Validation integration.
 - Automatic OpenAPI schema generation.
 - Interactive API documentation.

## 6.2 Uvicorn

Uvicorn is used as the ASGI server for running the FastAPI application.

Local development command:

```bash
uvicorn backend.src.api.main:app --reload
```

The production deployment will use an equivalent Uvicorn command configured for Render.

## 6.3 Pydantic

Pydantic provides structured validation for incoming prediction requests.

The project uses a dedicated:
```bash
CustomerInput
```

schema.

## 6.4 pandas

pandas is used to convert validated request data into a DataFrame before passing it into the machine learning pipeline.

## 6.5 scikit-learn

scikit-learn provides the machine learning and preprocessing components used by the project.

The backend relies on the persisted trained pipeline and Logistic Regression model.

## 6.6 joblib

joblib is used to serialize and deserialize the final machine learning model artifact.

## 6.7 Deployment Platform

The backend is planned for deployment on:

```bash
Render — Free Tier
```

The frontend will be deployed independently on:

```bash
Vercel
```

The backend and frontend therefore remain independently deployable components.

# 7. Dependency Management

Backend and machine learning dependencies are maintained at:

```bash
backend/requirements.txt
```

The project intentionally does not use a root-level Python requirements file.

## 7.1 Current Dependency Categories

The dependency file contains categories for:

### Core Machine Learning
```bash
numpy
pandas
scikit-learn
```
### Visualization
```bash
matplotlib
plotly
```
### Model Libraries
```bash
xgboost
shap
```
### Backend API
```bash
fastapi
uvicorn
pydantic
python-multipart
```
### Development Tools
```bash
black
ruff
pytest
pytest-cov
```

## 7.2 Dependency Responsibility

Not every dependency is required by the runtime API.

Some dependencies exist because the backend environment also supports the machine learning development workflow.

For example:

 - SHAP is primarily used for model explainability.
 - Matplotlib and Plotly are primarily used for analysis and visualization.
 - pytest is used for testing.

As the project moves toward deployment, dependency optimization should be considered carefully for the Render free-tier environment.

No dependency should be removed merely for optimization without verifying whether it is required by the current application or deployment workflow.

# 8. Application Architecture

The FastAPI application is defined in:

```bash
backend/src/api/main.py
```

The application object is created using:

```bash
app = FastAPI(
    title="Customer Churn Prediction API",
    description="API for predicting customer churn using the trained ML model.",
    version="1.0.0",
)
```

## 8.1 Application Metadata

Current API metadata:

|         Property         |           Value           |
|--------------------------|---------------------------|
|Title |	Customer Churn Prediction API |
|Version	| 1.0.0 |
|Framework	| FastAPI |
|Server	| Uvicorn |

## 8.2 Route Responsibilities

The current application exposes three routes:

```bash
GET  /
GET  /health
POST /predict
```

The first two are lightweight application endpoints.

The ```/predict``` endpoint is the machine learning inference endpoint.

## 8.3 Import Structure

The application imports:
```bash
from pathlib import Path
import joblib
import pandas as pd
from fastapi import FastAPI
from .schemas import CustomerInput
```

This keeps API schema definitions separate from endpoint implementation.

The separation also makes the validation model reusable and easier to test independently.

# 9. Application Lifecycle

The current application loads the model during application initialization.

The relevant flow is:

```bash
Python Process Starts
        ↓
FastAPI Application Imported
        ↓
Model Artifact Path Resolved
        ↓
joblib.load(...)
        ↓
Model Available In Memory
        ↓
API Starts Accepting Requests
```

## 9.1 Model Loading

The model is loaded using:

```bash
model = joblib.load(MODEL_PATH)
```

This happens once during application initialization rather than once for every prediction request.

## 9.2 Why the Model Is Loaded Once

Loading the serialized model for every request would introduce unnecessary overhead.

The current approach provides:
 - Lower per-request overhead.
 - Simpler inference logic.
 - Reuse of the loaded model.
 - Better suitability for a lightweight API.

## 9.3 Startup Failure

If the model artifact cannot be loaded during application initialization, the application may fail to start.

This is an intentional fail-fast behavior of the current implementation.

A missing or corrupted model artifact should not result in an API that appears healthy while being unable to perform predictions.

Detailed runtime error handling will be addressed separately during the backend error-handling stage.

# 10. ML Model Integration

The backend serves the final model selected during Phase 7.

The selected model is:

```bash
Logistic Regression
```

The final model was selected after:
 - Baseline evaluation.
 - Multiple model comparison.
 - Hyperparameter tuning.
 - Cross-validation.
 - Test-set comparison.
 - Final model selection.

## 10.1 Final Model Performance

The final test evaluation established:

|    Metric	 |    Score   |
|------------|------------|
| Accuracy | 0.7999 |
| Precision | 0.6554 |
| Recall | 0.5187 |
| F1 Score | 0.5791 |
| ROC-AUC | 0.8424 |
| Average Precision | 0.6367 |

These values represent the evaluation baseline established before API deployment.

## 10.2 Model Artifact

The final serialized artifact is:
```bash
backend/artifacts/models/logistic_regression_final.joblib
```

The backend does not retrain the model when serving predictions.

## 10.3 Separation of Training and Serving

Training occurs during the machine learning development lifecycle.

Serving occurs in the backend.

The backend therefore performs inference only.
```bash
Training Environment
        │
        │ trained model
        ▼
Serialized Artifact
        │
        ▼
Backend
        │
        │ inference
        ▼
Prediction
```

This prevents API requests from triggering model training.

# 11. ML Preprocessing Pipeline

The backend uses the reusable preprocessing pipeline implemented in:

```bash
backend/src/ml/preprocessing_pipeline.py
```

The pipeline contains three primary stages:

```bash
Input Data
    ↓
Data Preparation
    ↓
Feature Engineering
    ↓
Preprocessing
```

## 11.1 Data Preparation

The ```prepare_input_data()``` function creates a copy of the incoming DataFrame.

It also converts ```TotalCharges``` to numeric form:

```bash
dataframe["TotalCharges"] = pd.to_numeric(
    dataframe["TotalCharges"],
    errors="coerce"
)
```

Missing converted values are filled with zero.

This ensures that the model receives a numerical representation for the TotalCharges field.

## 11.2 Feature Engineering

The backend preprocessing pipeline generates reusable engineered features.

Current engineered features include:

```bash
ServiceCount
TenureGroup
```

### ServiceCount

```ServiceCount``` represents the number of applicable subscribed services among the configured service columns.

### TenureGroup

```TenureGroup``` groups customer tenure into predefined ranges:

|    Range   |    Label   |
|------------|------------|
| 0–12 months |	0-12 months |
| 13–24 months | 13-24 months |
| 25–48 months | 25-48 months |
| 49–72 months | 49-72 months |

The feature is generated using the customer's ```tenure```.

## 11.3 Numerical Features

The preprocessing pipeline currently defines:

```bash
SeniorCitizen
tenure
MonthlyCharges
TotalCharges
ServiceCount
```

as numerical features.

These features are passed through:

```bash
StandardScaler
```

## 11.4 Categorical Features

Categorical features include customer demographic, service, contract, billing, and tenure-group fields.

The pipeline uses:

```bash
OneHotEncoder(
    drop="first",
    handle_unknown="ignore"
)
```

## 11.5 Unknown Categories

```handle_unknown="ignore"``` allows the preprocessing stage to handle previously unseen categorical values without failing during transformation.

However, API-level validation still restricts incoming values to the supported domain.

These two layers serve different purposes:

```bash
Pydantic
    ↓
Reject invalid API input

OneHotEncoder
    ↓
Safely process valid but potentially unseen categories
```

## 11.6 Pipeline Composition

The reusable preprocessing pipeline is constructed using scikit-learn's ```Pipeline``` and ```ColumnTransformer```.

Conceptually:

```bash
Pipeline
│
├── data_preparation
│
├── feature_engineering
│
└── preprocessing
    │
    ├── numerical → StandardScaler
    │
    └── categorical → OneHotEncoder
```

This composition allows the same transformation sequence to be reused during inference.

# 12. Model Artifact Management

The model artifact is stored separately from source code.

Current location:

```bash
backend/artifacts/models/logistic_regression_final.joblib
```

## 12.1 Artifact Purpose

The artifact contains the trained model required for inference.

It allows the API to operate without retraining the model.

## 12.2 Artifact Loading

The API resolves the artifact path relative to the location of main.py.

Current implementation:

```bash
MODEL_PATH = (
    Path(__file__).resolve().parents[2]
    / "artifacts"
    / "models"
    / "logistic_regression_final.joblib"
)
```

This avoids relying on the developer's current working directory.

## 12.3 Why Relative Path Resolution Is Used

The backend may be executed from different working directories.

Using:

```bash
Path(__file__).resolve()
```

provides a path anchored to the actual source file location.

This is particularly useful for deployment environments where the working directory may differ from local development assumptions.

## 12.4 Artifact Naming

The current artifact name is:

```bash
logistic_regression_final.joblib
```

The name communicates:
 - Model family: Logistic Regression.
 - Status: final selected model.
 - Serialization format: joblib.

## 12.5 Artifact Lifecycle

The current lifecycle is:

```bash
Model Development
       ↓
Model Evaluation
       ↓
Final Model Selection
       ↓
Model Serialization
       ↓
backend/artifacts/models/
       ↓
FastAPI Startup
       ↓
Model Loaded
       ↓
Inference
```

The artifact should be regenerated whenever the final model implementation changes.

The API should not silently use an outdated artifact after a new model has been selected.

# 13. Prediction Flow

The prediction flow combines API validation, data preparation, feature engineering, preprocessing, and model inference.

## 13.1 High-Level Flow

```bash
Client
  │
  │ POST /predict
  ▼
FastAPI
  │
  ▼
CustomerInput
  │
  │ validation
  ▼
Validated Customer Data
  │
  ▼
pandas DataFrame
  │
  ▼
Persisted ML Pipeline
  │
  ├── Data Preparation
  │
  ├── Feature Engineering
  │
  └── Preprocessing
  │
  ▼
Logistic Regression
  │
  ├── Binary Prediction
  │
  └── Churn Probability
  │
  ▼
JSON Response
```

## 13.2 Request Processing

The ```/predict``` endpoint accepts:

```bash
customer_data: CustomerInput
```

FastAPI uses the Pydantic model before the endpoint logic executes.

## 13.3 DataFrame Construction

Validated request data is converted into a pandas DataFrame:

```bash
input_data = pd.DataFrame(
    [customer_data.model_dump()]
)
```

The resulting DataFrame represents one customer record.

## 13.4 Model Inference

The persisted model receives the DataFrame:

```bash
prediction = model.predict(input_data)[0]
```

The prediction is a binary value.

The model probability is obtained using:

```bash
probability = model.predict_proba(input_data)[0][1]
```

The probability corresponds to the positive churn class.

## 13.5 Response Construction

The API returns:

```bash
{
    "prediction": 1,
    "churn": "Yes",
    "churn_probability": 0.6200
}
```

The exact probability depends on the submitted customer data.

## 13.6 Prediction Semantics

The response contains both machine-readable and human-readable representations.

```prediction```

Numeric binary prediction:

```bash
0 → No Churn
1 → Churn
```

```churn```

Human-readable prediction:

```bash
"No"
"Yes"
```

```churn_probability```

Probability assigned to the positive churn class.

This value is returned as a floating-point number rounded to four decimal places.

## 13.7 End-to-End Example

```bash
Customer JSON
     ↓
Pydantic validation
     ↓
CustomerInput
     ↓
DataFrame
     ↓
prepare_input_data()
     ↓
create_engineered_features()
     ↓
ColumnTransformer
     ↓
Logistic Regression
     ↓
prediction = 1
     ↓
probability = 0.xxxx
     ↓
JSON response
```

## 13.8 Training-Serving Consistency

A key architectural objective is to ensure that the transformations used during prediction are consistent with the transformations used during model development.

The reusable preprocessing pipeline helps maintain this consistency.

The API does not independently implement:

 - Manual categorical encoding.
 - Manual numerical scaling.
 - Manual feature engineering.

Instead, these transformations remain part of the reusable ML pipeline.

This reduces the possibility of training-serving transformation mismatch.

# 14. API Overview

The backend exposes a lightweight HTTP API for application status, health verification, and customer churn prediction.

The current API consists of three endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Returns basic API status |
| GET | `/health` | Returns application health status |
| POST | `/predict` | Generates a customer churn prediction |

The prediction API is the primary machine learning interface consumed by the frontend and other clients.

## 14.1 Base URL

During local development, the API is available at:

```text
http://127.0.0.1:8000
```

The production base URL will be determined by the Render deployment.

The frontend should use an environment-specific API base URL rather than hard-coding the production URL into application components.

## 14.2 Content Type

Prediction requests use:

```bash
Content-Type: application/json
```

The API returns JSON responses.

## 14.3 Interactive API Documentation

FastAPI automatically exposes interactive documentation at:

```bash
/docs
```

For local development:

```bash
http://127.0.0.1:8000/docs
```

The OpenAPI schema is available at:

```bash
http://127.0.0.1:8000/openapi.json
```

ReDoc is available at:

```bash
http://127.0.0.1:8000/redoc
```

# 15. Root Endpoint

## 15.1 Endpoint

```bash
GET /
```

## 15.2 Purpose

The root endpoint provides a simple indication that the Customer Churn Prediction API is running.

It is intended primarily for basic service verification and human inspection.

## 15.3 Implementation

The current implementation returns:

```bash
{
  "message": "Customer Churn Prediction API",
  "status": "running"
}
```

## 15.4 Response Fields
| Field | Type | Description |
|---------|---------|---------|
| message | string | Identifies the API |
|status | string | Indicates that the application is running |

## 15.5 Example Request

```bash
curl http://127.0.0.1:8000/
```

## 15.6 Example Response

```bash
{
  "message": "Customer Churn Prediction API",
  "status": "running"
}
```

## 15.7 Limitations

The root endpoint is not intended to perform dependency or model health verification.

A successful response only indicates that the FastAPI application is responding.

# 16. Health Check Endpoint

## 16.1 Endpoint

```bash
GET /health
```

## 16.2 Purpose

The health endpoint provides a lightweight application-level health check.

It can be used by developers, deployment environments, monitoring systems, and other infrastructure components to determine whether the API process is responding.

## 16.3 Current Response

```bash
{
  "status": "healthy"
}
```

## 16.4 Example Request

```bash
curl http://127.0.0.1:8000/health
```

## 16.5 Example Response

```bash
{
  "status": "healthy"
}
```

## 16.6 Current Health Scope

The current endpoint performs an application-level response check.

It does not currently verify:
 - Database connectivity.
 - External service availability.
 - Model artifact integrity.
 - Model inference readiness.
 - Memory utilization.
 - CPU utilization.

These capabilities may be considered as the backend evolves.

## 16.7 Deployment Usage

The endpoint provides a simple URL that can be used for service verification after deployment.

For example:

```bash
https://<render-service>/health
```

The actual production URL will be documented after Render deployment.

# 17. Prediction Endpoint

## 17.1 Endpoint

```bash
POST /predict
```

## 17.2 Purpose

The ```/predict``` endpoint is the primary machine learning inference endpoint.

It accepts validated customer information and returns:
 - Binary churn prediction.
 - Human-readable churn label.
 - Churn probability.

## 17.3 Request Flow

```bash
HTTP POST /predict
        ↓
JSON Request
        ↓
Pydantic Validation
        ↓
CustomerInput
        ↓
DataFrame
        ↓
Persisted ML Pipeline
        ↓
Logistic Regression
        ↓
Prediction + Probability
        ↓
JSON Response
```

## 17.4 Request Content Type

```bash
application/json
```

## 17.5 Request Body

The request body must conform to the ```CustomerInput``` Pydantic schema.

The schema is implemented in:

```bash
backend/src/api/schemas.py
```

## 17.6 Example Valid Request

```bash
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 1,
  "PhoneService": "No",
  "MultipleLines": "No phone service",
  "InternetService": "DSL",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "No",
  "StreamingMovies": "No",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 29.85,
  "TotalCharges": 29.85
}
```

## 17.7 Example cURL Request

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Female",
    "SeniorCitizen": 0,
    "Partner": "Yes",
    "Dependents": "No",
    "tenure": 1,
    "PhoneService": "No",
    "MultipleLines": "No phone service",
    "InternetService": "DSL",
    "OnlineSecurity": "No",
    "OnlineBackup": "Yes",
    "DeviceProtection": "No",
    "TechSupport": "No",
    "StreamingTV": "No",
    "StreamingMovies": "No",
    "Contract": "Month-to-month",
    "PaperlessBilling": "Yes",
    "PaymentMethod": "Electronic check",
    "MonthlyCharges": 29.85,
    "TotalCharges": 29.85
  }'
```

# 18. Request Schema

The ```/predict``` endpoint uses the following Pydantic model:

```bash
class CustomerInput(BaseModel):
    ...
```
The complete implementation is maintained in:

```bash
backend/src/api/schemas.py
```

The schema is intentionally separated from the FastAPI route implementation.

This separation provides:
 - Clear API contracts.
 - Centralized validation.
 - Better readability.
 - Easier testing.
 - Automatic OpenAPI schema generation.
 - Cleaner endpoint implementation.

## 18.1 Schema Architecture

```bash
Client JSON
     ↓
CustomerInput
     ↓
Pydantic validation
     ↓
Validated Python object
     ↓
model_dump()
     ↓
pandas DataFrame
     ↓
ML Pipeline
```

## 18.2 Validation Philosophy

The validation layer acts as the first boundary between external input and the machine learning system.

The API should reject malformed or unsupported data before it reaches the model.

This prevents invalid request values from being silently interpreted by the prediction pipeline.

# 19. Customer Input Fields

The current API accepts 19 customer input fields.

The customerID field is intentionally excluded because it is an identifier and is not used by the model.

The Churn field is also excluded because it is the target variable that the API is designed to predict.

## 19.1 Field Summary

| Field | Type | Validation |
|------|------|
| gender | categorical | Male / Female |
| SeniorCitizen | binary | 0 / 1 |
| Partner | categorical | Yes / No |
| Dependents | categorical | Yes / No |
| tenure | integer | >= 0 |
| PhoneService | categorical | Yes / No |
| MultipleLines | categorical | Supported dataset values |
| InternetService | categorical | Supported dataset values |
| OnlineSecurity | categorical | Supported dataset values |
| OnlineBackup | categorical | Supported dataset values |
| DeviceProtection | categorical | Supported dataset values |
| TechSupport | categorical | Supported dataset values |
| StreamingTV | categorical | Supported dataset values |
| StreamingMovies | categorical | Supported dataset values | 
| Contract | categorical | Supported contract types |
| PaperlessBilling | categorical | Yes / No |
| PaymentMethod | categorical | Supported payment methods |
| MonthlyCharges | float | >= 0 |
| TotalCharges | float | >= 0 |

## 19.2 ```gender```

Allowed values:

```bash
Male
Female
```

The field is represented using a Pydantic Literal.

## 19.3 ```SeniorCitizen```

Allowed values:

```bash
0
1
```

Interpretation:

```bash
0 → Not a senior citizen
1 → Senior citizen
```

The API does not accept arbitrary integer values for this field.

## 19.4 ```Partner```

Allowed values:

```bash
Yes
No
```

## 19.5 ```Dependents```

Allowed values:

```bash
Yes
No
```

## 19.6 ```tenure```

Represents the number of months the customer has remained with the company.

The current validation rule requires:

```bash
tenure >= 0
```

Negative values are rejected.

## 19.7 ```PhoneService```

Allowed values:

```bash
Yes
No
```

## 19.8 ```MultipleLines```

Allowed values:

```bash
Yes
No
```

No phone service

## 19.9 ```InternetService```

Allowed values:

```bash
DSL
Fiber optic
No
```

## 19.10 ```OnlineSecurity```

Allowed values:

```bash
Yes
No
```

No internet service

## 19.11 ```OnlineBackup```

Allowed values:

```bash
Yes
No
No internet service
```

## 19.12 ```DeviceProtection```

Allowed values:

```bash
Yes
No
No internet service
```

## 19.13 ```TechSupport```

Allowed values:

```bash
Yes
No
No internet service
```

## 19.14 ```StreamingTV```

Allowed values:

```bash
Yes
No
No internet service
```

## 19.15 ```StreamingMovies```

Allowed values:

```bash
Yes
No
No internet service
```

## 19.16 ```Contract```

Allowed values:

```bash
Month-to-month
One year
Two year
```

## 19.17 ```PaperlessBilling```

Allowed values:

```bash
Yes
No
```

## 19.18 ```PaymentMethod```

Allowed values:

```bash
Electronic check
Mailed check
Bank transfer (automatic)
Credit card (automatic)
```

## 19.19 ```MonthlyCharges```

Represents the customer's monthly service charge.

The API requires:

```bash
MonthlyCharges >= 0
```

Negative monetary values are rejected.

## 19.20 ```TotalCharges```

Represents the total amount charged to the customer.

The API requires:

```bash
TotalCharges >= 0
```

Negative monetary values are rejected.

# 20. Input Validation

Input validation is implemented using Pydantic.

The current endpoint declaration is:

```bash
@app.post("/predict")
def predict(customer_data: CustomerInput):
```

FastAPI automatically applies the Pydantic validation layer before executing the endpoint body.

## 20.1 Validation Categories

The current validation layer covers:
 - Required fields.
 - Allowed categorical values.
 - Binary values.
 - Numeric types.
 - Non-negative numerical constraints.

## 20.2 Required Fields

All fields defined in ```CustomerInput``` are required.

A request that omits a required field is rejected.

## 20.3 Categorical Validation

Categorical fields use Pydantic ```Literal``` definitions.

For example:

```bash
gender: Literal["Male", "Female"]
```

This means values outside the declared set are rejected.

## 20.4 Numeric Validation

Numerical fields are represented using appropriate Python numeric types.

For example:

```bash
tenure: int = Field(ge=0)
```

and:

```bash
MonthlyCharges: float = Field(ge=0)
```

## 20.5 Negative Value Validation

The following fields currently use non-negative constraints:

```bash
tenure
MonthlyCharges
TotalCharges
```

The constraint:

```bash
ge=0
```

means the value must be greater than or equal to zero.

## 20.6 Validation Before Inference

Validation occurs before the model receives the input.

```bash
Invalid Request
      ↓
Pydantic
      ↓
HTTP 422
      ↓
Model is NOT executed
```

This is important because invalid external input should never be passed directly to the model.

## 20.7 Valid Request

```bash
Valid JSON
    ↓
Pydantic validation
    ↓
CustomerInput
    ↓
Prediction
```

## 20.8 Example Invalid Request

For example:

```bash
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": -1
}
```

The negative ```tenure``` violates the defined validation constraint.

FastAPI/Pydantic returns HTTP 422 rather than executing the prediction.

## 20.9 Missing Field Example

If ```MonthlyCharges``` is omitted, the request does not satisfy the complete ```CustomerInput``` schema.

The API returns a validation error.

## 20.10 Unsupported Category Example

If:

```bash
{
  "gender": "Unknown"
}
```

is submitted, the value does not match:

```bash
Male
Female
```

and validation fails.

## 20.11 Why Validation Is Separate from Preprocessing

API validation and machine learning preprocessing have different responsibilities.

### API Validation

Protects the service boundary.

### ML Preprocessing

Transforms valid data into the representation expected by the model.

Therefore:

```bash
External Input
      ↓
API Validation
      ↓
Valid Input
      ↓
ML Preprocessing
      ↓
Model
```

The two layers should not be merged.

# 21. Prediction Response

A successful /predict request returns a JSON response containing three fields.

## 21.1 Response Structure

```bash
{
  "prediction": 1,
  "churn": "Yes",
  "churn_probability": 0.6200
}
```

## 21.2 ```prediction```

Type:

```bash
integer
```

Possible values:

```bash
0
1
```

Interpretation:

| Value | Meaning |
|------ | ------ |
| 0 | No churn |
| 1 | Churn |

## 21.3 ```churn```

Type:

```bash
string
```

Possible values:

```bash
No
Yes
```

This field is provided for easier consumption by frontend interfaces and human users.

## 21.4 ```churn_probability```

Type:

```bash
float
```

The probability corresponds to the positive churn class.

The current implementation uses:

```bash
model.predict_proba(input_data)[0][1]
```

The returned probability is rounded to four decimal places.

## 21.5 Response Example — Churn

```bash
{
  "prediction": 1,
  "churn": "Yes",
  "churn_probability": 0.7421
}
```

## 21.6 Response Example — No Churn

```bash
{
  "prediction": 0,
  "churn": "No",
  "churn_probability": 0.1837
}
```

## 21.7 Machine-Readable and Human-Readable Values

The response intentionally provides both:

```bash
prediction
```

for programmatic logic and:

```bash
churn
```

for presentation.

This allows the frontend to display meaningful language without having to reinterpret the numeric model output.

# 22. HTTP Status Codes

The API currently relies heavily on FastAPI's standard HTTP behavior.

## 22.1 Successful Request

A valid prediction request returns:

```bash
HTTP 200 OK
```

## 22.2 Validation Error

Invalid request data returns:

```bash
HTTP 422 Unprocessable Entity
```

This occurs when the submitted request does not satisfy the CustomerInput schema.

## 22.3 Common Status Categories

| Status | Meaning | Current Usage |
|----------|----------|----------|
| 200 | Successful request | Root, health, prediction
| 422 | Validation failure | Invalid prediction input
| 500 | Internal server error | Global and prediction runtime handling |

## 22.4 Status Code Philosophy

The API should distinguish between:
 - Client-side input errors.
 - Server-side application failures.
 - Successful inference.

This distinction becomes increasingly important when the frontend consumes the API.

# 23. Error Handling

The current implementation already benefits from FastAPI and Pydantic's automatic validation behavior.

However, comprehensive application-level error handling has not yet been implemented.

This is intentionally reserved for:

```bash
Phase 9.5 — Error Handling
```

## 23.1 Current Validation Errors

Invalid request data is automatically converted into HTTP 422 responses through FastAPI and Pydantic validation.

The `CustomerInput` schema defines the accepted categorical values and numerical constraints.

Validation occurs before the prediction function executes.

## 23.2 Current Runtime Error Handling

Unexpected application-level exceptions are handled through a global FastAPI exception handler.

The global handler returns a standardized HTTP 500 response:

```json
{
  "error": "InternalServerError",
  "message": "An unexpected internal server error occurred."
}
```

Internal exception details are intentionally not exposed to API clients.

## 23.3 Prediction Runtime Errors

The ```/predict``` endpoint additionally contains a prediction-specific error boundary.

If an exception occurs while:
 - Creating the inference DataFrame.
 - Running ```model.predict()```.
 - Running ```model.predict_proba()```.
 - Constructing the prediction response.

the endpoint returns:

```text
{
  "error": "PredictionError",
  "message": "Unable to generate churn prediction."
}
```

with HTTP status:

```text
500 Internal Server Error
```

## 23.4 Error Handling Boundary

The current architecture is:

```text
Client
  ↓
Request Validation
  │
  ├── Invalid
  │      ↓
  │    HTTP 422
  │
  └── Valid
         ↓
      Prediction
         │
         ├── Success
         │      ↓
         │    HTTP 200
         │
         └── Runtime Failure
                ↓
        PredictionError Handler
                ↓
             HTTP 500
```

Unexpected exceptions outside the prediction-specific boundary are handled by the global application exception handler.

## 23.5 Client-Safe Error Messages

The backend intentionally separates client-facing messages from internal exception details.

Clients receive safe messages such as:

```text
InternalServerError
PredictionError
```

rather than Python traceback information, file paths, stack traces, or implementation details.

Internal diagnostic logging will be addressed in the later logging subphase.

## 23.6 Error Handling Status

The current implementation provides:

| Capability | Status |
|-------------|-------------|
| Pydantic validation | Implemented |
| HTTP 422 validation response | Implemented |
| Global exception handler | Implemented |
| Standard ```ErrorResponse``` model | Implemented |
| Prediction-specific error handling | Implemented |
| Client-safe runtime messages | Implemented |
| Runtime failure test | Pending Phase 9.5.6 |
| Detailed application logging | Pending Phase 9.5.5 |
| Startup/model loading handling | Pending Phase 9.5.4 |

---

# 24. OpenAPI Documentation

FastAPI automatically generates an OpenAPI schema from:
 - Route definitions.
 - Request models.
 - Type annotations.
 - Application metadata.

The generated schema is available at:

```bash
/openapi.json
```

For local development:
```bash
http://127.0.0.1:8000/openapi.json
```

## 24.1 Benefits

The generated OpenAPI specification provides:
 - Machine-readable API metadata.
 - Endpoint definitions.
 - Request schemas.
 - Response structures.
 - Validation constraints.
 - Interactive documentation integration.

## 24.2 Schema Source

The API schema is generated from the actual FastAPI implementation.

This means that changing the CustomerInput model changes the generated API contract.

Therefore, API schema documentation should be kept synchronized with the implementation.

# 25. Swagger UI

FastAPI provides an interactive Swagger UI interface.

Local URL:

```bash
http://127.0.0.1:8000/docs
```

Swagger allows developers to:
 - View available endpoints.
 - Inspect request schemas.
 - Submit test requests.
 - Inspect responses.
 - Observe validation errors.
 - Test the prediction endpoint without writing a separate client.

## 25.1 Prediction Testing Through Swagger

The ```/predict``` endpoint can be expanded inside Swagger.

The interface displays the generated request schema based on ```CustomerInput```.

Developers can enter a valid JSON payload and execute the request directly.

## 25.2 Validation Testing Through Swagger

Swagger can also be used to intentionally test invalid requests.

Examples include:
 - Missing required fields.
 - Invalid categorical values.
 - Negative numeric values.
 - Incorrect value types.

These tests should return validation errors when the request violates the schema.

## 25.3 Portfolio Value

Interactive Swagger documentation makes the backend easier to demonstrate during technical interviews and portfolio reviews.

A reviewer can inspect and test the API without needing to understand the entire repository first.

# 26. ReDoc

FastAPI also exposes ReDoc automatically.

Local URL:

```bash
http://127.0.0.1:8000/redoc
```

ReDoc provides a documentation-oriented presentation of the OpenAPI specification.

It is useful for:
 - API reference browsing.
 - Reading endpoint definitions.
 - Reviewing request schemas.
 - Understanding API contracts.

Swagger is more interactive for testing, while ReDoc provides a cleaner reference-style presentation.

# 27. API Testing

The backend API should be tested at multiple levels.

## 27.1 Current Manual Testing

The current API has been manually tested through the FastAPI Swagger interface.

Testing has included:
 - Root endpoint.
 - Health endpoint.
 - Prediction endpoint.
 - Valid prediction requests.
 - Invalid requests.

## 27.2 Successful Prediction Test

A valid customer payload should result in:

```bash
HTTP 200
```

and a response containing:

```bash
prediction
churn
churn_probability
```

## 27.3 Validation Test

An invalid customer payload should result in:

```bash
HTTP 422
```

without reaching the model inference stage.

## 27.4 Future Automated Tests

The project already includes pytest-related dependencies.

Automated API tests will be expanded as the backend implementation matures.

Potential test categories include:
 - Endpoint availability.
 - Health response.
 - Valid prediction.
 - Invalid categorical values.
 - Missing fields.
 - Negative numeric values.
 - Response schema.
 - Model inference failures.

## 27.5 Testing Principle

A prediction API should not be considered complete merely because a valid request works.

It should also demonstrate predictable behavior when receiving invalid or unexpected inputs.

# 28. Local Development

The backend is developed locally before being deployed to the production hosting environment.

Local development allows the API, model artifact, preprocessing pipeline, and validation behavior to be verified before deployment.

## 28.1 Development Environment

The backend is developed as part of the Customer Churn Prediction Platform monorepo.

The backend is located at:

```bash
backend/
```
The Python environment is maintained separately from the frontend environment.

## 28.2 Backend Python Environment

The project uses a dedicated Python virtual environment for the machine learning and backend workflow.

The environment prevents backend dependencies from interfering with system-level Python packages.

The backend dependency definition is maintained in:

```bash
backend/requirements.txt
```

The project intentionally does not maintain a root-level Python ```requirements.txt```.

## 28.3 Dependency Installation

Backend dependencies can be installed using:

```bash
pip install -r backend/requirements.txt
```

This should be performed inside the intended Python virtual environment.

## 28.4 Development Server

The FastAPI application is served locally using Uvicorn.

From the project root:

```bash
uvicorn backend.src.api.main:app --reload
```

The ```--reload``` option enables automatic server reloading when source files change.

This option is intended for development and should not be treated as the production server configuration.

## 28.5 Local API Address

The development server is normally available at:

```bash
http://127.0.0.1:8000
```

The following endpoints can then be accessed:

```bash
http://127.0.0.1:8000/
http://127.0.0.1:8000/health
http://127.0.0.1:8000/docs
http://127.0.0.1:8000/redoc
```

## 28.6 Development Workflow

The recommended local development sequence is:

```bash
Activate Python Environment
        ↓
Install / Verify Dependencies
        ↓
Verify Model Artifact
        ↓
Start Uvicorn
        ↓
Check /
        ↓
Check /health
        ↓
Open /docs
        ↓
Test /predict
        ↓
Test Validation
        ↓
Review Logs
```

This workflow provides a quick way to identify problems before committing or deploying backend changes.

# 29. Virtual Environment

The backend uses an isolated Python environment for its dependencies.

## 29.1 Purpose

A virtual environment provides:
 - Dependency isolation.
 - Reproducible local setup.
 - Reduced system-package conflicts.
 - Easier dependency management.

## 29.2 Environment Activation

The exact activation command depends on the operating system and shell being used.

On Windows PowerShell, a typical activation command is:

```bash
.venv\Scripts\Activate.ps1
```

On Windows Command Prompt:

```bash
.venv\Scripts\activate
```

The active environment should be verified before installing backend dependencies.

## 29.3 Verifying Python

The active Python interpreter can be checked with:

```bash
python --version
```

The executable location can be inspected with:

```bash
where python
```

on Windows.

## 29.4 Verifying pip

The active pip installation can be checked with:

```bash
python -m pip --version
```

Using:

```bash
python -m pip
```

helps ensure that packages are installed into the Python environment associated with the selected interpreter.

## 29.5 Dependency Verification

After installation, the environment can be inspected using:

```bash
pip list
```

or:

```bash
python -m pip list
```

Dependency changes should be reviewed before being committed.

## 29.6 Environment Reproducibility

The project uses ```backend/requirements.txt``` as the dependency declaration for the backend environment.

When dependencies change, the requirements file should be updated intentionally rather than relying only on the local environment state.

# 30. Running the Backend

## 30.1 Development Command

The current local development command is:

```bash
uvicorn backend.src.api.main:app --reload
```

The command has three important components:

```bash
uvicorn
    ↓
backend.src.api.main
    ↓
app
```

## 30.2 Module Path

The module path:

```bash
backend.src.api.main
```

points to:

```text
backend/
└── src/
    └── api/
        └── main.py
```

The final:

```bash
app
```

refers to the FastAPI application object defined inside ```main.py```.

## 30.3 Reload Mode

The ```--reload``` option is useful during development because the server automatically restarts when relevant source files change.

This reduces the need to manually stop and restart the development server after every code modification.

## 30.4 Production Difference

The production deployment should not rely on development reload behavior.

Render's production start command will be configured separately and will use the environment-provided port.

The production configuration will be documented in the deployment section after the Render setup is finalized.

## 30.5 Verifying Startup

A successful startup should indicate that Uvicorn is listening for requests.

The developer should then verify:

```bash
/
```

and:

```bash
/health
```

before testing machine learning inference.

## 30.6 Recommended Verification Order

```bash
1. Start API
2. Check /
3. Check /health
4. Open /docs
5. Test valid /predict
6. Test invalid /predict
```

This order isolates basic application problems from machine learning inference problems.

# 31. Development Workflow

The backend follows an incremental development workflow.

## 31.1 Development Cycle

Each backend change should follow:

```bash
Understand Requirement
        ↓
Review Existing Implementation
        ↓
Make Minimal Change
        ↓
Run Locally
        ↓
Test Relevant Endpoint
        ↓
Review Output
        ↓
Update Documentation
        ↓
Commit
        ↓
Push
```

## 31.2 Review Before Modification

Existing files should be reviewed before making structural changes.

This is especially important for:

```bash
```main.py```
```schemas.py```
```preprocessing_pipeline.py```
model artifacts
```requirements.txt```
```

The purpose is to avoid introducing duplicate implementations or incompatible assumptions.

## 31.3 Minimal Changes

Backend changes should remain focused on the current phase or subphase.

Unrelated refactoring should not be introduced merely because a file can be reorganized.

This keeps the Git history understandable and makes regressions easier to identify.

## 31.4 Verify Before Commit

A backend change should not be committed solely because the code looks correct.

The relevant behavior should be executed locally.

For API changes, this generally means:
 - Starting the server.
 - Calling the affected endpoint.
 - Checking the response.
 - Testing at least one failure condition when applicable.

## 31.5 Documentation Synchronization

Documentation should be updated after the implementation has been verified.

This prevents the technical documentation from describing behavior that does not actually exist.

# 32. Testing Strategy

Testing is divided into multiple layers.

## 32.1 Testing Layers

The backend testing strategy can be represented as:

```bash
Static / Structural Checks
        ↓
Schema Validation Tests
        ↓
API Endpoint Tests
        ↓
Model Inference Tests
        ↓
Integration Tests
        ↓
Deployment Verification
```

Not every layer is currently automated.

The testing strategy will evolve as the backend implementation progresses.

## 32.2 Structural Testing

Structural verification confirms that required files and application components exist.

Examples include:

```bash
backend/src/api/main.py
backend/src/api/schemas.py
backend/src/ml/preprocessing_pipeline.py
backend/artifacts/models/logistic_regression_final.joblib
```

## 32.3 Schema Testing

Schema testing verifies that ```CustomerInput``` accepts supported values and rejects invalid values.

Examples:
 - Valid categorical values.
 - Invalid categorical values.
 - Missing required fields.
 - Negative numerical values.
 - Incorrect data types.

## 32.4 Endpoint Testing

Endpoint testing verifies that:

```bash
GET /
GET /health
POST /predict
```

behave according to their intended contracts.

## 32.5 Model Inference Testing

Inference testing verifies that a valid customer record can successfully pass through the persisted pipeline and produce:

```text
prediction
churn
churn_probability
```

## 32.6 Integration Testing

Integration testing verifies the complete path:

```text
HTTP Request
    ↓
FastAPI
    ↓
Pydantic
    ↓
DataFrame
    ↓
ML Pipeline
    ↓
Model
    ↓
HTTP Response
```

## 32.7 Deployment Testing

After deployment, the production API should be tested independently of local development.

At minimum:

```text
Production /
Production /health
Production /docs
Production /predict
```

should be verified where applicable.

Deployment-specific testing will be documented in the Render deployment section.

# 33. Model Inference Testing

The prediction endpoint depends on the persisted model artifact.

Therefore inference testing must verify more than the API route itself.

## 33.1 Required Inference Components

The following components must work together:

```text
CustomerInput
      ↓
DataFrame
      ↓
Preprocessing
      ↓
Feature Engineering
      ↓
Encoding / Scaling
      ↓
Logistic Regression
      ↓
Prediction
```

## 33.2 Valid Inference

A valid request should produce HTTP 200 and a response containing:

```bash
{
  "prediction": 0,
  "churn": "No",
  "churn_probability": 0.1234
}
```

The actual probability depends on the submitted customer data.

## 33.3 Prediction Type

The numeric prediction should be represented as an integer in the API response.

The current implementation converts the model output using:

```bash
int(prediction)
```

This prevents NumPy scalar types from being exposed directly in the JSON response.

## 33.4 Probability Type

The churn probability is converted to a standard Python floating-point value.

The value is rounded before being returned.

This keeps the API response compact and predictable.

## 33.5 Artifact Dependency

Inference cannot operate correctly if the model artifact is missing or incompatible.

Therefore the following file is a critical runtime dependency:

```text
backend/artifacts/models/logistic_regression_final.joblib
```

## 33.6 Inference Consistency

The model should receive the same feature representation expected during training.

The persisted preprocessing pipeline is responsible for preserving this transformation sequence.

Manual transformations in the API should be avoided unless explicitly required by the model architecture.

# 34. Validation Testing

Validation testing verifies the behavior of the ```CustomerInput``` schema.

## 34.1 Valid Input

A complete request containing supported values should pass validation.

Expected result:

```text
HTTP 200
```

provided that model inference also succeeds.

## 34.2 Missing Required Field

Removing a required field should result in:

```text
HTTP 422
```

The model should not be invoked for an invalid request.

## 34.3 Invalid Categorical Value

For example:

```bash
{
  "gender": "Unknown"
}
```

should fail validation because ```Unknown``` is not part of the permitted domain.

## 34.4 Negative Tenure

Example:

```bash
{
  "tenure": -1
}
```

should fail the ```ge=0``` validation constraint.

## 34.5 Negative Monthly Charges

Example:

```bash
{
  "MonthlyCharges": -10
}
```

should fail validation.

## 34.6 Negative Total Charges

Example:

```bash
{
  "TotalCharges": -10
}
```

should fail validation.

## 34.7 Invalid SeniorCitizen Value

The API accepts:

```text
0
1
```

Other values should be rejected.

## 34.8 Validation Boundary

The validation layer is intentionally positioned before model inference:

```text
External Request
      ↓
Pydantic
      │
      ├── Invalid → HTTP 422
      │
      └── Valid
            ↓
         ML Model
```

This prevents malformed input from reaching the model.

# 35. Configuration and Paths

The backend currently uses source-relative path resolution for the model artifact.

## 35.1 Model Path

The model path is constructed in main.py:

```bash
MODEL_PATH = (
    Path(__file__).resolve().parents[2]
    / "artifacts"
    / "models"
    / "logistic_regression_final.joblib"
)
```

## 35.2 Why Source-Relative Resolution

The application should not depend on the terminal's current working directory.

For example, a command executed from the project root should still correctly resolve:

```text
backend/artifacts/models/logistic_regression_final.joblib
```

## 35.3 Configuration Philosophy

Current configuration is intentionally minimal.

The API currently does not require:
 - Database connection strings.
 - External API keys.
 - Cloud storage credentials.
 - Authentication secrets.

The model artifact is local to the deployed application environment.

## 35.4 Future Configuration

As the application grows, environment variables may be introduced for:
 - CORS origins.
 - Environment mode.
 - Logging level.
 - External service URLs.
 - Authentication configuration.
 - Model version identifiers.

Such values should not be hard-coded into source code.

## 35.5 Environment-Specific Configuration

The eventual architecture should distinguish:

```text
Local Development
        ↓
Development Configuration

Render Deployment
        ↓
Production Configuration
```

The exact production configuration will be documented after deployment architecture is implemented.

# 36. Frontend Integration

The backend is designed to serve a separate frontend application.

The planned deployment architecture is:

```text
┌──────────────────────────┐
│          Vercel          │
│       Frontend App       │
└────────────┬─────────────┘
             │
             │ HTTPS
             ▼
┌──────────────────────────┐
│         Render           │
│       FastAPI API        │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│     ML Model Artifact    │
└──────────────────────────┘
```

The frontend and backend are therefore independently deployable.

## 36.1 Frontend Responsibility

The frontend is responsible for:
 - Collecting customer information.
 - Presenting input controls.
 - Sending the prediction request.
 - Displaying prediction results.
 - Displaying validation or API errors.

## 36.2 Backend Responsibility

The backend is responsible for:
 - Validating the request.
 - Running the ML pipeline.
 - Generating the prediction.
 - Returning structured JSON.

## 36.3 Separation of Concerns

The frontend should not contain:
 - Model weights.
 - Training code.
 - Preprocessing implementation.
 - Feature engineering logic.

The ML inference logic belongs to the backend.

## 36.4 API Communication

The frontend will communicate with:

```text
POST /predict
```

using JSON.

The frontend should treat the API response as the authoritative prediction result.

# 37. API Contract for Frontend

The frontend integration contract is based on the ```CustomerInput``` schema and prediction response.

## 37.1 Request Contract

The frontend must send all required fields.

The field names must exactly match the backend schema.

For example:

```bash
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 1,
  "PhoneService": "No",
  "MultipleLines": "No phone service",
  "InternetService": "DSL",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "No",
  "StreamingMovies": "No",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 29.85,
  "TotalCharges": 29.85
}
```

## 37.2 Response Contract

Successful prediction:

```bash
{
  "prediction": 1,
  "churn": "Yes",
  "churn_probability": 0.6200
}
```

## 37.3 Client-Side Validation

The frontend may perform user-friendly validation before sending the request.

However, frontend validation should not replace backend validation.

The backend remains the authoritative validation boundary.

## 37.4 Why Both Layers Validate

```text
Frontend Validation
        ↓
Better User Experience
        ↓
Backend Validation
        ↓
Security / Integrity Boundary
        ↓
Model
```

Frontend validation can improve usability.

Backend validation protects the API regardless of the client.

# 38. Performance Considerations

The current API is designed for relatively lightweight synchronous inference.

## 38.1 Model Loading

The model is loaded once during application initialization.

This prevents repeated disk deserialization.

## 38.2 Single-Record Inference

The current ```/predict``` endpoint accepts one customer record per request.

The implementation creates:

```text
one request
    ↓
one-row DataFrame
```

This is appropriate for an interactive customer-facing prediction interface.

## 38.3 Preprocessing Overhead

Each request passes through:
 - Data preparation.
 - Feature engineering.
 - Numerical scaling.
 - Categorical encoding.
 - Logistic Regression inference.

These operations are relatively lightweight for a single customer record.

## 38.4 Response Size

The prediction response is intentionally small.

It contains only:

```text
prediction
churn
churn_probability
```

This reduces unnecessary network payload size.

## 38.5 Future Optimization

If the application evolves to batch prediction, additional endpoints and batching strategies may be considered.

Such changes should not be introduced unless the product requirements justify them.

# 39. Reliability Considerations

Reliability refers to the backend's ability to consistently respond to valid requests and fail predictably when problems occur.

## 39.1 Current Reliability Mechanisms

The current implementation provides:
 - Request validation.
 - Persisted model loading.
 - Health endpoint.
 - Automatic API documentation.
 - Stateless prediction requests.

## 39.2 Fail-Fast Model Loading

If the model artifact cannot be loaded during startup, the application should not pretend to be prediction-ready.

This makes deployment failures visible rather than silently producing incorrect behavior.

## 39.3 Stateless Requests

Each prediction request is independent.

The backend does not maintain prediction state between requests.

This simplifies deployment and scaling.

## 39.4 Health Endpoint

The ```/health``` endpoint provides a lightweight availability check.

However, it should not currently be interpreted as a complete readiness check because it does not verify every dependency.

## 39.5 Future Reliability Improvements

Potential improvements include:
 - Readiness checks.
 - Structured exception handling.
 - Automated tests.
 - Request timeouts where applicable.
 - Monitoring.
 - Rate limiting.
 - More detailed startup validation.

# 40. Deployment Architecture

The Customer Churn Prediction Platform uses a separated deployment architecture.

The frontend and backend are deployed as independent services.

```text
                         INTERNET
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
      ┌───────────────┐           ┌───────────────┐
      │    Vercel     │           │    Render     │
      │   Frontend    │ ────────► │   FastAPI     │
      └───────────────┘   HTTPS   └───────┬───────┘
                                          │
                                          ▼
                               ┌────────────────────┐
                               │  ML Model Artifact │
                               │  + Preprocessing   │
                               └────────────────────┘
```
## 40.1 Deployment Responsibilities
| Component | Platform | Responsibility |
|-------------|-------------|-------------|
| Frontend | Vercel | User interface |
| Backend | Render | FastAPI + ML inference |
| Model | Render application filesystem | Prediction artifact |

The frontend does not contain the machine learning model.

The backend does not serve the frontend application.

This separation keeps the application modular and independently deployable.

## 40.2 Deployment Flow

The intended deployment flow is:

```text
Developer
    ↓
Git Repository
    ↓
Render
    ↓
Backend Build
    ↓
Dependency Installation
    ↓
FastAPI Startup
    ↓
Model Loading
    ↓
Health Verification
    ↓
Public API
```

The frontend follows a separate Vercel deployment flow.

## 40.3 Deployment Source

The backend is maintained inside the project repository.

The backend-specific files are located under:

```text
backend/
```

The repository therefore remains a monorepo rather than requiring a separate backend repository.

# 41. Render Deployment

The backend is intended to be deployed using Render.

Render is selected because it provides a practical free-tier deployment option suitable for this portfolio project.

## 41.1 Deployment Objective

The objective is to expose the FastAPI backend through a publicly accessible HTTPS endpoint.

The resulting API will be consumed by the frontend hosted on Vercel.

## 41.2 Backend Runtime

The backend runtime consists of:

```text
Python
    ↓
FastAPI
    ↓
Uvicorn
    ↓
Persisted ML Model
```

## 41.3 Repository Structure Relevant to Render

The backend deployment depends on the following structure:

```text
customer-churn-prediction/
│
├── backend/
│   ├── requirements.txt
│   │
│   ├── artifacts/
│   │   └── models/
│   │       └── logistic_regression_final.joblib
│   │
│   └── src/
│       ├── api/
│       │   ├── __init__.py
│       │   ├── main.py
│       │   └── schemas.py
│       │
│       └── ml/
│           └── preprocessing_pipeline.py
│
└── frontend/
```

The root project does not contain a Python ```requirements.txt```.

## 41.4 Dependency Source

Render should install backend dependencies from:

```text
backend/requirements.txt
```

The dependency file is therefore a critical part of the deployment configuration.

## 41.5 Build Strategy

The final Render build command must install the backend dependencies.

A repository-root deployment can use a command equivalent to:

```text
pip install -r backend/requirements.txt
```

The exact command should be verified against the final Render service configuration.

## 41.6 Start Strategy

The production FastAPI process should use Uvicorn.

The expected command pattern is:

```bash
uvicorn backend.src.api.main:app --host 0.0.0.0 --port $PORT
```

This command is intentionally different from the local development command because production should not use ```--reload```.

## 41.7 Render Configuration Status

At the current stage:

```text
Render service: Planned
Production URL: Not yet assigned
Build command: Planned
Start command: Planned
Environment variables: Not yet required
Custom domain: Not yet configured
```

These values will be updated after the actual Render deployment is completed.

# 42. Render Free-Tier Strategy

The backend is specifically designed with the Render free-tier constraint in mind.

The objective is to deploy the complete ML inference API without introducing paid infrastructure.

## 42.1 Cost-Conscious Architecture

The backend does not currently require:

 - A managed database.
 - A dedicated model-serving platform.
 - AWS infrastructure.
 - A paid container service.
 - External inference infrastructure.
 - A separate caching service.

The prediction request can be processed entirely within the FastAPI service.

## 42.2 Stateless Design

The prediction endpoint is stateless.

Each request contains the customer information required for inference.

The backend does not need to maintain user sessions for prediction.

This reduces infrastructure requirements.

## 42.3 No Runtime Training

Model training is not performed by the deployed API.

The production backend only performs inference using the saved model artifact.

This significantly reduces runtime resource requirements.

## 42.4 Model Loading Strategy

The model is loaded during application startup.

The current strategy is:

```text
Render starts service
        ↓
Python process starts
        ↓
FastAPI application loads
        ↓
Model artifact loaded
        ↓
API becomes available
```

The model is not loaded for every prediction request.

## 42.5 Free-Tier Resource Awareness

The free-tier environment may have constrained:
 - CPU.
 - Memory.
 - Startup performance.
 - Runtime availability.

The backend therefore avoids unnecessary computational work during requests.

## 42.6 Dependency Awareness

The backend dependency file currently contains both API and machine learning dependencies.

Before production deployment, dependency size and runtime requirements should be reviewed.

However, dependencies should not be removed merely because they appear unnecessary without verifying whether the persisted model or preprocessing pipeline requires them.

## 42.7 Cold Starts

Free hosting may result in delayed responses when the service needs to start from an inactive state.

This is acceptable for the portfolio deployment.

The application should prioritize correctness and maintainability over premature optimization.

## 42.8 Portfolio Trade-Off

The free-tier deployment is intended to demonstrate:
 - Machine learning deployment.
 - REST API development.
 - Model serving.
 - Input validation.
 - Frontend/backend integration.
 - Cloud deployment.

It is not intended to represent a high-traffic enterprise production infrastructure.

# 43. Render Build Configuration

Render requires a build process that prepares the application environment before the service starts.

## 43.1 Python Dependencies

The primary dependency source is:

```bash
backend/requirements.txt
```

## 43.2 Expected Build Command

The expected dependency installation command is:

```text
pip install -r backend/requirements.txt
```

This should be executed from the repository root if the Render service uses the repository root as its working directory.

## 43.3 Alternative Root Directory Strategy

Render may also be configured with:

```text
Root Directory:
backend
```

If the backend directory is configured as the service root, the dependency command can instead use:

```bash
pip install -r requirements.txt
```

and the application import path would need to match the selected working directory.

The final configuration should use one consistent strategy rather than mixing repository-root and backend-root assumptions.

## 43.4 Recommended Strategy

For the current monorepo structure, keeping the repository root as the deployment context provides a straightforward relationship between:

```text
backend/
frontend/
```

and makes the deployment architecture easier to understand.

The final Render configuration should be tested before being documented as finalized.

# 44. Render Start Command

The production server must bind to the network interface and port expected by Render.

## 44.1 Expected Command

```bash
uvicorn backend.src.api.main:app --host 0.0.0.0 --port $PORT
```

## 44.2 Command Components
```uvicorn```

Starts the ASGI server.

```backend.src.api.main:app```

Points to the FastAPI application object.

```--host 0.0.0.0```

Allows the application to accept traffic routed from outside the local process.

```--port $PORT```

Uses the port supplied by the deployment environment.

## 44.3 Development vs Production

Development:

```bash
uvicorn backend.src.api.main:app --reload
```

Production:

```bash
uvicorn backend.src.api.main:app --host 0.0.0.0 --port $PORT
```

The production command intentionally does not use ```--reload```.

## 44.4 Why Reload Is Not Used

Automatic reload is useful while developing because source changes trigger application restarts.

In production, this behavior is unnecessary and introduces avoidable process management overhead.

# 45. Render Port Configuration

## 45.1 Local Port

The local API currently uses:

```text
8000
```

Local URL:

```text
http://127.0.0.1:8000
```

## 45.2 Production Port

Render provides the production port through:

```text
$PORT
```

The backend should therefore not hard-code port ```8000``` in the production command.

## 45.3 Binding Address

The production service should bind to:

```text
0.0.0.0
```

rather than:
```text
127.0.0.1
```

This allows the hosting platform to route requests to the application.

# 46. Render Deployment Procedure

The final deployment procedure should follow an ordered workflow.

## 46.1 Pre-Deployment Checks

Before creating the Render service, verify:

```text
[ ] Backend dependencies are declared
[ ] FastAPI starts locally
[ ] / endpoint works
[ ] /health endpoint works
[ ] /predict endpoint works
[ ] Invalid input returns 422
[ ] Model artifact exists
[ ] Model artifact is loadable
[ ] Backend source is committed
[ ] Git repository is up to date
```

## 46.2 Create Render Service

Create a Render web service connected to the project repository.

The service should be configured as a Python web service.

## 46.3 Configure Repository

The Render service must point to the correct repository and branch.

The deployment branch should be the branch containing the verified backend implementation.

The current project workflow uses:

```text
main
```

as the primary branch.

## 46.4 Configure Build Command

Use the verified backend dependency installation command.

For repository-root deployment:

```bash
pip install -r backend/requirements.txt
```

## 46.5 Configure Start Command

Use:

```bash
uvicorn backend.src.api.main:app --host 0.0.0.0 --port $PORT
```

## 46.6 Deploy

Trigger the initial deployment after verifying the configuration.

Render should:

```text
Clone Repository
    ↓
Install Dependencies
    ↓
Start Uvicorn
    ↓
Load FastAPI
    ↓
Load Model
    ↓
Expose Service
```

## 46.7 Deployment Verification

After deployment, open the generated Render service URL.

Test:

```text
/
```

Then:

```text
/health
```

Then:

```text
/docs
```

Finally test:

```text
/predict
```

using a valid customer payload.

# 47. Production API Verification

Deployment is not considered complete merely because Render reports a successful build.

The public API must be tested.

## 47.1 Root Endpoint

Expected:

```text
GET /
```

Response:

```bash
{
  "message": "Customer Churn Prediction API",
  "status": "running"
}
```

## 47.2 Health Endpoint

Expected:

```text
GET /health
```

Response:

```bash
{
  "status": "healthy"
}
```

## 47.3 Swagger

Expected:

```text
/docs
```

The interactive API documentation should load successfully.

## 47.4 Prediction Endpoint

A known valid customer payload should be submitted.

Expected:

```text
POST /predict
```

with:

```text
HTTP 200
```

and:

```bash
{
  "prediction": 0,
  "churn": "No",
  "churn_probability": 0.1234
}
```

The actual result depends on the input payload.

## 47.5 Validation Verification

An intentionally invalid request should produce:

```text
HTTP 422
```

This confirms that production validation is functioning in addition to local validation.

# 48. Frontend Deployment on Vercel

The frontend will be deployed independently from the backend.

## 48.1 Frontend Platform

Target platform:

```text
Vercel
```

## 48.2 Backend Platform

Target platform:

```text
Render
```

## 48.3 Communication

The frontend communicates with the deployed backend using HTTPS.

```text
Vercel Frontend
      │
      │ HTTPS POST
      ▼
Render FastAPI
      │
      ▼
ML Prediction
```

## 48.4 API Base URL

The frontend should store the backend URL as configuration rather than embedding it throughout the application.

Conceptually:

```text
VITE_API_BASE_URL
```

or the equivalent environment variable mechanism supported by the selected frontend framework.

The exact variable name will be finalized when the frontend implementation begins.

## 48.5 Local Frontend Development

During local development, the frontend will communicate with the local FastAPI server.

Example:

```text
http://127.0.0.1:8000
```

Production will use the Render-generated HTTPS URL.

## 48.6 Environment Separation

The intended configuration is:

```text
Development
    ↓
Local Frontend
    ↓
Local FastAPI

Production
    ↓
Vercel Frontend
    ↓
Render FastAPI
```

This prevents local development settings from being hard-coded into the production application.

# 49. Deployment Failure Scenarios

Deployment failures should be diagnosed systematically.

## 49.1 Dependency Installation Failure

Possible causes:
 - Incorrect requirements file path.
 - Unsupported dependency version.
 - Missing dependency.
 - Python version incompatibility.

First verify:

```text
backend/requirements.txt
```

and the configured build command.

## 49.2 Application Import Failure

Possible causes:
 - Incorrect Uvicorn module path.
 - Missing __init__.py.
 - Incorrect working directory.
 - Python import path mismatch.

Verify:

```text
backend.src.api.main:app
```

and the Render root-directory configuration.

## 49.3 Model Artifact Not Found

Possible causes:
 - Artifact not committed.
 - Incorrect artifact path.
 - Incorrect deployment working directory.
 - Incorrect source-relative path.

Verify:

```text
backend/artifacts/models/logistic_regression_final.joblib
```

## 49.4 Model Loading Failure

Possible causes:
 - Incompatible scikit-learn version.
 - Incompatible dependency versions.
 - Corrupted artifact.
 - Missing runtime dependency.

The local environment should first be tested using the same dependency versions intended for deployment.

## 49.5 Port Failure

Possible causes:
 - Hard-coded port.
 - Incorrect host binding.
 - Incorrect start command.

Production should use:

```text
--host 0.0.0.0
--port $PORT
```

## 49.6 Health Endpoint Failure

If ```/health``` is unavailable after deployment, verify:

```text
Application startup
↓
Uvicorn logs
↓
Port configuration
↓
Route definition
↓
Render service status
```

## 49.7 Prediction Failure After Successful Startup

If ```/health``` works but ```/predict``` fails, investigate separately:

```text
Request validation
↓
Input schema
↓
DataFrame creation
↓
Preprocessing pipeline
↓
Model artifact
↓
Inference
```

A healthy API process does not necessarily guarantee successful model inference.

# 50. Deployment Status

The deployment documentation distinguishes between planned architecture and completed deployment.

## 50.1 Current Status
|----------------|----------------|
| Backend local API: | Implemented |
| Local model inference: | Implemented |
| Input validation: | Implemented |
| Render service: | Not yet deployed |
| Production URL: | Not yet available |
| Vercel frontend: | Planned |
| Frontend/backend integration: | Planned |
| Production CORS: | Planned |

## 50.2 Documentation Rule

Deployment details should be updated immediately after the actual deployment configuration is verified.

The documentation should never claim that a service is deployed when it has only been planned.

## 50.3 Final Deployment Documentation

After successful Render deployment, this section should be updated with:
 - Actual service configuration.
 - Actual production URL.
 - Verified build command.
 - Verified start command.
 - Environment variables.
 - Production verification results.
 - Any deployment-specific limitations.

# 51. Deployment Checklist

Before considering the backend deployment complete:

```text
[ ] Render service created
[ ] Correct repository connected
[ ] Correct branch selected
[ ] Build command verified
[ ] Start command verified
[ ] backend/requirements.txt installed successfully
[ ] Model artifact available
[ ] Application starts successfully
[ ] Production port configured correctly
[ ] / endpoint verified
[ ] /health verified
[ ] /docs verified
[ ] Valid /predict verified
[ ] Invalid /predict verified
[ ] Frontend can reach backend
[ ] CORS configured
[ ] Production HTTPS verified
[ ] Deployment URL documented
```

The checklist should only be marked complete after each item has been tested.

# 52. Deployment Architecture Decision

The project intentionally uses:

```text
Frontend → Vercel
Backend  → Render
```

instead of deploying both components to a single platform.

## 52.1 Reasoning

The separation provides:
 - Independent deployment.
 - Clear frontend/backend boundaries.
 - Easier API testing.
 - Better portfolio demonstration.
 - Simple scaling path.
 - Appropriate free-tier hosting.
 - Technology-specific deployment environments.

## 52.2 Cost Consideration

The architecture is designed to remain within the project's free-tier objective.

Paid infrastructure should only be introduced if future requirements make it necessary.

## 52.3 Future Scaling

If the application eventually requires higher availability or traffic capacity, the deployment architecture can evolve independently.

Possible future changes include:
 - Dedicated backend infrastructure.
 - Managed databases.
 - Container orchestration.
 - External model storage.
 - CI/CD deployment pipelines.
 - Observability infrastructure.

These are future production considerations rather than current project requirements.

# 53. Security Considerations

Security is an important consideration even for a portfolio-oriented machine learning API.

The current backend is intentionally lightweight and does not implement authentication, authorization, rate limiting, or advanced security infrastructure.

Therefore, security documentation must distinguish between:

- Security mechanisms currently implemented.
- Security practices already followed.
- Security controls planned for future implementation.

## 53.1 Current Security Boundary

The primary security boundary currently implemented by the API is input validation.

The prediction endpoint does not directly trust arbitrary incoming JSON.

Instead:

```text
External Client
      ↓
FastAPI
      ↓
Pydantic CustomerInput
      ↓
Validated Data
      ↓
ML Inference
```

Invalid input is rejected before it reaches the model.

## 53.2 No Runtime Training Exposure

The backend exposes model inference only.

There is no API endpoint that:
 - Trains the model.
 - Retrains the model.
 - Changes model parameters.
 - Uploads a new training dataset.
 - Replaces the production model.

This significantly reduces the attack surface of the current API.

## 53.3 Model Artifact Protection

The model artifact is part of the backend application:

```text
backend/artifacts/models/logistic_regression_final.joblib
```

The API loads this artifact internally.

The prediction endpoint does not expose the artifact itself.

Clients receive prediction results rather than the serialized model.

## 53.4 Customer Data Handling

The prediction API receives customer attributes in the request body.

The current implementation does not persist prediction requests to a database.

This means that the current architecture does not intentionally create a persistent customer-data store for predictions.

However, infrastructure-level logs may still contain request-related information depending on the hosting platform and application logging configuration.

Therefore, customer data should not be unnecessarily written to logs.

## 53.5 Sensitive Data Principle

The backend should follow the principle of collecting and processing only the information required for prediction.

The current API accepts model features rather than identifiers such as:

```text
customerID
```

The identifier was excluded from the model-serving schema because it is not required for inference.

## 53.6 No Secrets in Source Code

Application secrets should never be hard-coded into:

```text
main.py
schemas.py
preprocessing_pipeline.py
```

or other tracked source files.

If future functionality requires secrets, they should be supplied through environment configuration.

## 53.7 HTTPS

Production frontend-to-backend communication should use HTTPS.

The intended architecture is:

```text
Vercel Frontend
      │
      │ HTTPS
      ▼
Render Backend
```

The exact production URL will be documented after deployment.

## 53.8 Authentication

Authentication is not currently implemented.

The prediction endpoint is therefore intended as a public portfolio demonstration endpoint rather than an authenticated enterprise API.

Authentication can be introduced later if the product requirements require protected access.

## 53.9 Authorization

Authorization is not currently implemented because the current application does not expose user-specific resources or administrative operations.

Future administrative functionality would require explicit authorization controls.

## 53.10 Rate Limiting

Rate limiting is not currently implemented.

A public API could potentially receive excessive requests.

If the service becomes publicly accessible at meaningful scale, rate limiting should be considered.

## 53.11 Security Scope

The current security posture should therefore be understood as:

```text
Implemented:
- Input validation
- No runtime training endpoint
- No model artifact download endpoint
- No intentional prediction persistence

Not currently implemented:
- Authentication
- Authorization
- Rate limiting
- Advanced request filtering
- Application-level security monitoring
```

# 54. CORS Strategy

The frontend and backend are intended to run on different origins.

The deployment architecture is:

```text
Vercel
Frontend
    │
    │ Cross-Origin HTTPS Request
    ▼
Render
FastAPI Backend
```

## 54.1 Why CORS Is Required

Browser security policies restrict cross-origin requests.

The backend therefore needs an appropriate CORS policy when the frontend is deployed separately.

## 54.2 Current Status

Production CORS configuration is not yet finalized.

It should be implemented when the frontend/backend integration is performed.

## 54.3 Development CORS

During local development, the frontend and backend may run on different ports.

For example:

```text
Frontend:
http://localhost:<frontend-port>

Backend:
http://127.0.0.1:8000
```

The exact frontend development port depends on the frontend framework configuration.

## 54.4 Production CORS

Production should allow the actual Vercel frontend origin.

The preferred policy is:

```text
Allowed Origins
      ↓
Specific Frontend Origin
```

rather than unnecessarily allowing every origin.

## 54.5 Wildcard Consideration

A configuration equivalent to:

```text
*
```

allows requests from any origin.

This may be convenient during early development but is not the preferred production configuration when the frontend origin is known.

## 54.6 CORS Is Not Authentication

CORS controls browser-origin access.

It does not authenticate users.

It does not prevent non-browser clients from sending HTTP requests.

Therefore, CORS should not be treated as a replacement for authentication or authorization.

# 55. Secrets and Environment Variables

The current backend does not require application secrets for local model inference.

## 55.1 Current Configuration

The current runtime primarily depends on:

```text
Application source
Model artifact
Python dependencies
```

No database credentials or third-party API credentials are currently required for prediction.

## 55.2 Future Environment Variables

Environment variables may be introduced for:
 - Production CORS origins.
 - Environment name.
 - Logging level.
 - External service URLs.
 - Authentication configuration.
 - Model configuration.
 - Other deployment-specific settings.

## 55.3 Secret Storage Principle

Secrets should be supplied through the deployment environment rather than committed to Git.

For example, credentials should not appear directly inside:

```bash
API_KEY = "..."
```

or equivalent source-code constants.

## 55.4 Local Environment Files

If a .env file becomes necessary during development, it should be excluded from version control when it contains secrets.

A safe pattern is:

```text
.env
.env.*
```

with appropriate exceptions when non-secret example configuration is intentionally committed.

## 55.5 Example Configuration

If environment configuration becomes necessary, a separate example file can document expected variable names without containing real secrets.

For example:

```text
CORS_ORIGINS=
ENVIRONMENT=
LOG_LEVEL=
```

The actual values should remain outside the repository when sensitive.

## 55.6 Render Environment Configuration

Render provides environment configuration for deployed services.

Production values should be configured there rather than embedded into the repository.

The exact environment variables will be documented after they are actually introduced.

# 56. Logging and Monitoring

Logging provides visibility into backend behavior.

## 56.1 Current Logging

The current backend primarily relies on standard FastAPI/Uvicorn runtime output.

Dedicated application-level structured logging has not yet been implemented.

## 56.2 Useful Operational Events

Future application logging may include:

```text
Application startup
Model loading
Application shutdown
Prediction failures
Unexpected exceptions
Configuration failures
```

## 56.3 Avoid Logging Raw Customer Data

The API receives customer attributes.

Therefore, logging complete request payloads should be avoided unless there is a strong debugging requirement.

For example, this should generally be avoided:

```text
POST /predict
{
    "gender": "...",
    "tenure": "...",
    ...
}
```

Instead, operational logs should focus on:

```text
Request received
Validation failed
Prediction completed
Prediction failed
```

without unnecessarily exposing customer attributes.

## 56.4 Logging Levels

A future logging strategy may distinguish:

```text
DEBUG
INFO
WARNING
ERROR
CRITICAL
```

Development can use more verbose logging.

Production should avoid excessive debug-level output.

## 56.5 Monitoring

Potential operational metrics include:

```text
Request count
Successful prediction count
Validation error count
Prediction error count
Response latency
Application availability
Startup failures
```

## 56.6 Health Endpoint

The current:

```text
GET /health
```

endpoint provides a lightweight availability signal.

It should not currently be interpreted as a complete dependency health check.

## 56.7 Future Observability

As the project evolves, observability may include:
 - Structured logs.
 - Error tracking.
 - Request latency monitoring.
 - Health monitoring.
 - Deployment alerts.

These are future improvements rather than current requirements.

# 57. Performance and Reliability Troubleshooting

Performance issues should be investigated systematically rather than immediately modifying the model or API.

## 57.1 Slow Startup

If startup is slow, inspect:

```text
Python startup
      ↓
Dependency imports
      ↓
FastAPI initialization
      ↓
Model loading
```

Potential causes include:
 - Large dependency imports.
 - Model artifact loading.
 - Cold start.
 - Hosting resource constraints.

## 57.2 Slow Prediction

If individual predictions are slow, inspect:

```text
Request validation
      ↓
DataFrame creation
      ↓
Feature engineering
      ↓
Preprocessing
      ↓
Model inference
```

The current model performs single-record inference and is expected to remain lightweight.

## 57.3 Memory Usage

If memory usage becomes problematic, investigate:
 - Loaded dependencies.
 - Model artifact size.
 - Multiple worker processes.
 - Unnecessary data loading.
 - Runtime objects retained in memory.

The API should not load the original training dataset during prediction.

## 57.4 Reliability Priority

When diagnosing performance issues:

```text
Correctness
    ↓
Reliability
    ↓
Observability
    ↓
Optimization
```

Performance optimization should not compromise prediction correctness.

# 58. Common Development Issues

This section provides a troubleshooting reference for common local development problems.

## 58.1 Uvicorn Command Not Found

### Symptom

The terminal reports that uvicorn is not recognized.

### Possible Cause

The correct virtual environment is not active or Uvicorn is not installed.

### Check

```bash
python -m pip show uvicorn
```

### Recommended Approach

Activate the intended virtual environment and verify the backend dependencies.

If necessary:

```bash
python -m pip install -r backend/requirements.txt
```

## 58.2 FastAPI Module Not Found

### Symptom

The application fails because FastAPI cannot be imported.

### Check

```bash
python -m pip show fastapi
```

### Possible Cause

The package is missing from the active Python environment.

## 58.3 Incorrect Uvicorn Module Path

### Symptom

Uvicorn cannot import:

```text
backend.src.api.main:app
```

### Check

Verify the repository structure:

```text
backend/
└── src/
    └── api/
        ├── __init__.py
        └── main.py
```

Then run the command from the repository root:

```text
uvicorn backend.src.api.main:app --reload
```

## 58.4 Port Already in Use

### Symptom

Port ```8000``` is already occupied.

### Possible Causes
 - Another Uvicorn process is running.
 - Another application is using port 8000.
 - A previous development process did not shut down cleanly.

### Resolution

Identify and stop the process using the port, or start the development server on another local port.

For example:

```bash
uvicorn backend.src.api.main:app --reload --port 8001
```

The frontend API base URL must then use the corresponding port.

# 59. API Troubleshooting

## 59.1 ```/``` Works but ```/health``` Fails

Verify that the route exists in ```main.py```:

```text
GET /health
```

Then restart the development server if the source code was recently modified.

## 59.2 ```/health``` Works but ```/predict``` Fails

This usually indicates that the FastAPI application is running but something in the prediction path is failing.

Investigate in this order:

```text
Request JSON
      ↓
Pydantic Schema
      ↓
DataFrame
      ↓
Preprocessing Pipeline
      ↓
Model Artifact
      ↓
Inference
```

## 59.3 HTTP 422

A 422 response normally indicates request validation failure.

### Check:
 - Missing fields.
 - Invalid categorical values.
 - Invalid numeric values.
 - Incorrect data types.

The response body should identify the field responsible for the validation failure.

## 59.4 HTTP 500

An HTTP 500 response indicates an unexpected server-side failure.

At the current stage, detailed custom error handling has not yet been implemented.

Therefore, inspect the Uvicorn application logs to identify the underlying exception.

## 59.5 Prediction Response Missing Fields

A successful response should contain:
 - prediction
 - churn
 - churn_probability

If the response differs, inspect the implementation of ```/predict``` in:

```text
backend/src/api/main.py
```

## 59.6 Incorrect Prediction

An incorrect prediction should not immediately be treated as an API bug.

Investigate:

```text
Input values
      ↓
Feature engineering
      ↓
Preprocessing
      ↓
Model artifact
      ↓
Model version
      ↓
Expected model output
```

The deployed artifact must correspond to the intended final model.

# 60. Model Loading Troubleshooting

The model artifact is a critical backend dependency.

## 60.1 File Not Found

### Symptom

The application cannot locate:

```text
backend/artifacts/models/logistic_regression_final.joblib
```

### Check

Verify the file exists at exactly that location.

## 60.2 Incorrect Relative Path

The backend currently resolves the artifact using the source file location.

The relevant logic uses:

```bash
Path(__file__).resolve()
```

This is intended to avoid dependence on the terminal's current working directory.

## 60.3 Artifact Not Committed

If the model exists locally but not in the Git repository, deployment will not have access to it.

Verify Git tracking before deployment.

## 60.4 Incompatible Artifact

A serialized scikit-learn artifact may depend on compatible versions of its underlying libraries.

If loading fails after deployment but works locally, compare:

```text
Python version
scikit-learn version
numpy version
pandas version
joblib version
```

between the local and deployment environments.

## 60.5 Model Pipeline Dependency

The persisted artifact may depend on preprocessing components defined by the project's machine learning implementation.

Therefore, the backend runtime must contain the required dependencies and compatible source structure.

## 60.6 Model Replacement

When replacing the model artifact:

```text
New Model
    ↓
Evaluate
    ↓
Serialize
    ↓
Verify Locally
    ↓
Replace Artifact
    ↓
Run API Tests
    ↓
Commit
    ↓
Deploy
```

A model artifact should never be replaced in production without verification.

# 61. Deployment Troubleshooting

## 61.1 Build Failure

If Render fails during the build stage:

```text
Check build logs
      ↓
Identify failed dependency
      ↓
Verify requirements.txt
      ↓
Reproduce locally
      ↓
Correct dependency/configuration
      ↓
Redeploy
```

## 61.2 Start Failure

If dependencies install successfully but the service does not start, inspect:
 - Uvicorn command.
 - Module path.
 - Working directory.
 - Python import errors.
 - Model loading errors.
 - Port configuration.

## 61.3 Service Starts but Is Unreachable

### Check:

```text
Host binding
Port
Render service status
Application logs
```

The production command should use:

```text
--host 0.0.0.0
```

and:

```text
--port $PORT
```

## 61.4 Health Check Failure

If Render reports that the service is unhealthy:

```text
Service startup
      ↓
Uvicorn binding
      ↓
/health route
      ↓
Port availability
```

should be checked in that order.

## 61.5 Prediction Works Locally but Fails on Render

This usually indicates an environment difference.

Compare:

```text
Dependency versions
Python version
Model artifact
Working directory
Environment variables
File availability
```

The same model artifact and compatible runtime dependencies should be used in both environments.

# 62. Dependency Troubleshooting

## 62.1 Dependency Version Mismatch

A package may work locally but fail during deployment if the versions differ.

The requirements file should therefore explicitly define the intended dependency versions where appropriate.

## 62.2 Runtime vs Development Dependencies

The project currently maintains a unified backend requirements file.

Some dependencies may primarily support:

```text
Development
Experimentation
Visualization
Explainability
Testing
```

rather than runtime inference.

Future dependency optimization may separate these concerns if deployment constraints justify it.

## 62.3 Do Not Remove Dependencies Blindly

A package should not be removed simply because it does not appear directly in main.py.

The persisted ML pipeline may depend on libraries indirectly.

The safe process is:

```text
Identify Dependency
      ↓
Determine Usage
      ↓
Check Model / Pipeline Requirements
      ↓
Test Locally
      ↓
Test Deployment
      ↓
Remove Only If Safe
```

## 62.4 Rebuild After Dependency Changes

After changing ```backend/requirements.txt```, the backend should be tested in a clean environment when practical.

This reduces the chance that a locally installed package hides a missing dependency declaration.

# 63. Security Troubleshooting

## 63.1 Unexpected CORS Error

If the frontend reports a browser CORS error:

```text
Frontend Origin
      ↓
Backend CORS Configuration
      ↓
Allowed Origin?
```

Verify that the frontend's actual origin is permitted.

## 63.2 CORS Works Locally but Fails in Production

Check that the production Vercel URL is included in the production CORS configuration.

Do not assume the local development origin and production origin are identical.

## 63.3 Exposed Secret

If a secret is accidentally committed:
 - Stop using the exposed credential.
 - Rotate/revoke the credential.
 - Remove it from the source.
 - Update the deployment configuration.
 - Review Git history if necessary.

Removing a secret from the latest commit does not necessarily remove it from Git history.

## 63.4 Unexpected Public Access

The current prediction API does not implement authentication.

Therefore, if the endpoint is publicly reachable, anyone who knows the URL may be able to submit prediction requests.

This is acceptable for the current portfolio objective but should be reconsidered for a production application containing protected functionality.

# 64. Troubleshooting Decision Tree

A general troubleshooting decision tree is:

```text
API Not Starting
      │
      ├── Dependency Error?
      │       └── Check requirements.txt
      │
      ├── Import Error?
      │       └── Check module path / package structure
      │
      ├── Model Error?
      │       └── Check artifact + dependency versions
      │
      └── Port Error?
              └── Check host + port configuration


API Starts
      │
      ├── / Fails?
      │       └── Check route / application
      │
      ├── /health Fails?
      │       └── Check route / startup
      │
      └── /predict Fails?
              │
              ├── 422?
              │     └── Check CustomerInput
              │
              ├── 500?
              │     └── Check inference logs
              │
              └── Incorrect Result?
                    └── Check input → pipeline → artifact
```

## 64.1 General Principle

Troubleshooting should move from the outermost layer toward the inner layer.

```text
Infrastructure
    ↓
Application
    ↓
API
    ↓
Validation
    ↓
Preprocessing
    ↓
Model
```

This prevents developers from changing the model when the actual problem is an API configuration issue.

# 65. Security and Troubleshooting Status

The current implementation status is:

| Area | Status |
|-----------|-----------|
| Pydantic input validation | Implemented |
| Model artifact isolation | Implemented |
| No runtime training endpoint | Implemented |
| HTTPS production architecture | Planned with deployment |
| Production CORS | Not yet implemented |
| Authentication | Not implemented |
| Authorization | Not implemented |
| Rate limiting | Not implemented |
| Structured application logging | Not implemented |
| Advanced monitoring | Not implemented |
| Comprehensive exception handling | Scheduled for Phase 9.5 |

The absence of these controls should be clearly understood when evaluating the current backend.

The application is currently designed as a portfolio-grade ML inference service rather than a fully hardened enterprise production API.