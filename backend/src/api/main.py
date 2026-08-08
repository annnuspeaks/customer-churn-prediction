from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI

app = FastAPI(
    title="Customer Churn Prediction API",
    description="API for predicting customer churn using the trained ML model.",
    version="1.0.0",
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


@app.post("/predict")
def predict(customer_data: dict):
    input_data = pd.DataFrame([customer_data])

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    return {
        "prediction": int(prediction),
        "churn": "Yes" if prediction == 1 else "No",
        "churn_probability": round(float(probability), 4),
    }