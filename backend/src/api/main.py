from pathlib import Path

import joblib
import logging
import pandas as pd

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from backend.src.api.schemas import CustomerInput, ErrorResponse

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

logger = logging.getLogger(__name__)

MODEL_PATH = (
    Path(__file__).resolve().parents[2]
    / "artifacts"
    / "models"
    / "logistic_regression_final.joblib"
)

model = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global model

    try:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Model artifact not found: {MODEL_PATH}"
            )

        model = joblib.load(MODEL_PATH)

        logger.info("ML model loaded successfully.")
        logger.info("Application startup complete.")

        yield

    except Exception:
        logger.exception(
            "Failed to load ML model during application startup."
        )
        raise
    
    logger.info("Application shutdown complete.")


app = FastAPI(
    title="Customer Churn Prediction API",
    description="API for predicting customer churn using the trained ML model.",
    version="1.0.0",
    lifespan=lifespan,
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

        result = {
            "prediction": int(prediction),
            "churn": "Yes" if prediction == 1 else "No",
            "churn_probability": round(float(probability), 4),
        }

        logger.info("Prediction completed successfully.")

        return result

    except Exception:
        logger.exception("Prediction failed during inference.")

        return JSONResponse(
            status_code=500,
            content=ErrorResponse(
                error="PredictionError",
                message="Unable to generate churn prediction."
            ).model_dump()
        )