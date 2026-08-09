from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from backend.src.api.schemas import CustomerInput, ErrorResponse

app = FastAPI(
    title="Customer Churn Prediction API",
    description="API for predicting customer churn using the trained ML model.",
    version="1.0.0",
)


@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception
):
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="InternalServerError",
            message="An unexpected internal server error occurred."
        ).model_dump()
    )


MODEL_PATH = (
    Path(__file__).resolve().parents[2]
    / "artifacts"
    / "models"
    / "logistic_regression_final.joblib"
)

model = joblib.load(MODEL_PATH)


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


@app.post("/predict", response_model=dict)
def predict(customer_data: CustomerInput):
    try:
        input_data = pd.DataFrame([customer_data.model_dump()])

        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]

        return {
            "prediction": int(prediction),
            "churn": "Yes" if prediction == 1 else "No",
            "churn_probability": round(float(probability), 4),
        }

    except Exception:
        return JSONResponse(
            status_code=500,
            content=ErrorResponse(
                error="PredictionError",
                message="Unable to generate churn prediction."
            ).model_dump()
        )
