```markdown
# Customer Churn Prediction — Backend

FastAPI backend responsible for serving the trained Customer Churn Prediction model.

## Responsibilities

- Serve the trained ML model
- Validate prediction inputs
- Provide churn prediction API
- Return churn probability
- Provide health-check endpoint
- Provide OpenAPI / Swagger documentation

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API status |
| GET | `/health` | Health check |
| POST | `/predict` | Churn prediction |

## Local Development

From the project root:

```bash
cd backend
uvicorn src.api.main:app --reload
````

The API will be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

## Production

The backend is deployed on Render and serves the production frontend through the prediction API.

## Structure

```text
backend/
├── src/
│   ├── api/
│   └── ml/
├── artifacts/
├── requirements.txt
├── Dockerfile
└── README.md
```