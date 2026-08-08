import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer, OneHotEncoder, StandardScaler

SERVICE_COLUMNS = [
    "PhoneService",
    "MultipleLines",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
]

NUMERICAL_COLUMNS = [
    "SeniorCitizen",
    "tenure",
    "MonthlyCharges",
    "TotalCharges",
    "ServiceCount",
]

CATEGORICAL_COLUMNS = [
    "gender",
    "Partner",
    "Dependents",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "TenureGroup",
]


def prepare_input_data(dataframe: pd.DataFrame) -> pd.DataFrame:
    dataframe = dataframe.copy()

    dataframe["TotalCharges"] = pd.to_numeric(
        dataframe["TotalCharges"],
        errors="coerce"
    )

    dataframe["TotalCharges"] = dataframe["TotalCharges"].fillna(0)

    return dataframe


def create_engineered_features(dataframe: pd.DataFrame) -> pd.DataFrame:
    dataframe = dataframe.copy()

    dataframe["ServiceCount"] = (
        dataframe[SERVICE_COLUMNS]
        .apply(
            lambda row: sum(
                value in ["Yes", "Yes, Yes"]
                for value in row
            ),
            axis=1,
        )
    )

    dataframe["TenureGroup"] = pd.cut(
        dataframe["tenure"],
        bins=[-1, 12, 24, 48, 72],
        labels=[
            "0-12 months",
            "13-24 months",
            "25-48 months",
            "49-72 months",
        ],
    )

    return dataframe


def build_preprocessing_pipeline() -> Pipeline:
    preprocessor = ColumnTransformer(
        transformers=[
            (
                "numerical",
                StandardScaler(),
                NUMERICAL_COLUMNS,
            ),
            (
                "categorical",
                OneHotEncoder(
                    drop="first",
                    handle_unknown="ignore",
                ),
                CATEGORICAL_COLUMNS,
            ),
        ]
    )
    
    return Pipeline(
    steps=[
        (
            "data_preparation",
            FunctionTransformer(
                prepare_input_data,
                validate=False,
            ),
        ),
        (
            "feature_engineering",
            FunctionTransformer(
                create_engineered_features,
                validate=False,
            ),
        ),
        ("preprocessing", preprocessor),
    ]
)
