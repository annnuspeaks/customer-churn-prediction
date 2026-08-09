# Customer Churn Prediction — Backend

FastAPI backend for serving the trained Customer Churn Prediction model.

## Responsibilities

- Serve the trained ML model
- Provide prediction APIs
- Validate prediction inputs
- Expose health-check endpoints
- Provide OpenAPI/Swagger documentation

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API status |
| GET | `/health` | Health check |
| POST | `/predict` | Customer churn prediction |

## Local Development

From the project root:

```bash
uvicorn backend.src.api.main:app --reload