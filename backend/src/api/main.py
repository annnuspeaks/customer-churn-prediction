from fastapi import FastAPI

app = FastAPI(
    title="Customer Churn Prediction API",
    description="API for predicting customer churn using the trained ML model.",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Customer Churn Prediction API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }