# Data Dictionary

| Feature          | Type        | ML Usage    | Description                                                                                                                                      |
| ---------------- | ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| customerID       | Identifier  | **Drop**    | Unique customer identifier used only for record identification. It is excluded from model training because it carries no predictive information. |
| gender           | Categorical | **Feature** | Customer gender.                                                                                                                                 |
| SeniorCitizen    | Binary      | **Feature** | Indicates whether the customer is a senior citizen.                                                                                              |
| Partner          | Binary      | **Feature** | Indicates whether the customer has a partner.                                                                                                    |
| Dependents       | Binary      | **Feature** | Indicates whether the customer has dependents.                                                                                                   |
| tenure           | Numerical   | **Feature** | Number of months the customer has stayed with the company.                                                                                       |
| PhoneService     | Binary      | **Feature** | Indicates whether the customer has phone service.                                                                                                |
| MultipleLines    | Categorical | **Feature** | Indicates whether the customer has multiple phone lines.                                                                                         |
| InternetService  | Categorical | **Feature** | Type of internet service subscribed by the customer.                                                                                             |
| OnlineSecurity   | Categorical | **Feature** | Indicates whether the customer has online security service.                                                                                      |
| OnlineBackup     | Categorical | **Feature** | Indicates whether the customer has online backup service.                                                                                        |
| DeviceProtection | Categorical | **Feature** | Indicates whether the customer has device protection service.                                                                                    |
| TechSupport      | Categorical | **Feature** | Indicates whether the customer has technical support service.                                                                                    |
| StreamingTV      | Categorical | **Feature** | Indicates whether the customer has TV streaming service.                                                                                         |
| StreamingMovies  | Categorical | **Feature** | Indicates whether the customer has movie streaming service.                                                                                      |
| Contract         | Categorical | **Feature** | Type of customer contract.                                                                                                                       |
| PaperlessBilling | Binary      | **Feature** | Indicates whether paperless billing is enabled.                                                                                                  |
| PaymentMethod    | Categorical | **Feature** | Customer's preferred payment method.                                                                                                             |
| MonthlyCharges   | Numerical   | **Feature** | Monthly amount charged to the customer.                                                                                                          |
| TotalCharges     | Numerical   | **Feature** | Total amount charged to the customer over the subscription period.                                                                               |
| Churn            | Target      | **Target**  | Indicates whether the customer has discontinued the service. This is the prediction target for the machine learning model.                       |

> This data dictionary serves as the reference document for exploratory data analysis, preprocessing, feature engineering, model development, and explainability throughout the project.
