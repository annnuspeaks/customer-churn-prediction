from pathlib import Path

from fastapi.testclient import TestClient

from backend.src.api.main import app

from unittest.mock import Mock, patch


client = TestClient(app)


VALID_PAYLOAD = {
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
    "TotalCharges": 29.85,
}


def test_invalid_tenure_returns_422():
    payload = VALID_PAYLOAD.copy()
    payload["tenure"] = -1

    response = client.post("/predict", json=payload)

    assert response.status_code == 422


def test_invalid_monthly_charges_returns_422():
    payload = VALID_PAYLOAD.copy()
    payload["MonthlyCharges"] = -1

    response = client.post("/predict", json=payload)

    assert response.status_code == 422


def test_invalid_total_charges_returns_422():
    payload = VALID_PAYLOAD.copy()
    payload["TotalCharges"] = -1

    response = client.post("/predict", json=payload)

    assert response.status_code == 422


def test_invalid_gender_returns_422():
    payload = VALID_PAYLOAD.copy()
    payload["gender"] = "Invalid"

    response = client.post("/predict", json=payload)

    assert response.status_code == 422


def test_invalid_contract_returns_422():
    payload = VALID_PAYLOAD.copy()
    payload["Contract"] = "Invalid Contract"

    response = client.post("/predict", json=payload)

    assert response.status_code == 422
    
def test_prediction_runtime_error_returns_500(monkeypatch):
    failing_model = Mock()
    failing_model.predict.side_effect = RuntimeError(
        "Simulated prediction failure"
    )

    import backend.src.api.main as main_module

    monkeypatch.setattr(main_module, "model", failing_model)

    response = client.post("/predict", json=VALID_PAYLOAD)

    assert response.status_code == 500
    assert response.json() == {
        "error": "PredictionError",
        "message": "Unable to generate churn prediction.",
    }

def test_global_exception_handler_returns_500():
    from fastapi import APIRouter
    from fastapi.testclient import TestClient

    router = APIRouter()

    @router.get("/test-global-exception")
    def raise_unexpected_error():
        raise RuntimeError("Simulated unexpected application failure")

    app.include_router(router)

    test_client = TestClient(
        app,
        raise_server_exceptions=False,
    )

    response = test_client.get("/test-global-exception")

    assert response.status_code == 500
    assert response.json() == {
        "error": "InternalServerError",
        "message": "An unexpected internal server error occurred.",
    }

def test_model_loads_successfully_during_startup(monkeypatch):
    import backend.src.api.main as main_module

    fake_model_path = Path("fake_model.joblib")
    fake_model = Mock()

    monkeypatch.setattr(
        main_module,
        "MODEL_PATH",
        fake_model_path,
    )

    monkeypatch.setattr(
        Path,
        "exists",
        lambda self: True,
    )

    with patch(
        "backend.src.api.main.joblib.load",
        return_value=fake_model,
    ) as mock_load:
        with TestClient(main_module.app):
            mock_load.assert_called_once_with(fake_model_path)

    assert main_module.model is fake_model

def test_missing_model_artifact_aborts_startup(monkeypatch):
    import backend.src.api.main as main_module

    fake_model_path = Path("missing_model.joblib")

    monkeypatch.setattr(
        main_module,
        "MODEL_PATH",
        fake_model_path,
    )

    monkeypatch.setattr(
        Path,
        "exists",
        lambda self: False,
    )

    try:
        with TestClient(main_module.app):
            pass
    except FileNotFoundError as exc:
        assert "Model artifact not found" in str(exc)
    else:
        raise AssertionError(
            "Application startup should fail when the model artifact is missing."
        )