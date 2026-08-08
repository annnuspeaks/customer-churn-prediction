# Architecture Decision Records (ADR)

This document records significant architectural and engineering decisions made during the development of the **Customer Churn Prediction Platform**.

The objective is to preserve the reasoning behind important technical choices, making the project easier to maintain, review, and extend.

---

# ADR-001 — Monorepo Project Structure

## Status

Accepted

## Decision

Use a monorepo structure containing separate backend, frontend, notebooks, data, documentation, models, and reports directories.

## Rationale

- Clear separation of responsibilities
- Easier project navigation
- Independent backend and frontend development
- Better scalability
- Cleaner portfolio presentation

## Alternatives Considered

- Single-folder project
- Multiple repositories

## Consequences

Positive

- Better maintainability
- Cleaner architecture

Negative

- Slightly more initial setup

---

# ADR-002 — Preserve Raw Dataset

## Status

Accepted

## Decision

The original dataset will never be modified.

## Rationale

- Reproducibility
- Easier debugging
- Reliable experimentation
- Industry best practice

## Alternatives Considered

Modify the original dataset directly.

## Consequences

Positive

- Complete data traceability
- Safe experimentation

---

# ADR-003 — Notebook-first Development

## Status

Accepted

## Decision

All experimentation will be performed in notebooks before implementation in production code.

## Rationale

- Faster experimentation
- Easier debugging
- Cleaner production code

## Alternatives Considered

Implement directly in backend.

## Consequences

Positive

- Reduced development risk
- Better validation

---

# ADR-004 — Folder-level Documentation

## Status

Accepted

## Decision

Every major directory maintains its own README.md.

## Rationale

- Better discoverability
- Cleaner documentation
- Easier onboarding

## Alternatives Considered

Single large README only.

## Consequences

Positive

- Modular documentation
- Better navigation

---

# ADR-005 — Engineering Standards

## Status

Accepted

## Decision

Maintain engineering conventions in a dedicated document instead of relying on implicit practices.

## Rationale

- Consistency
- Better collaboration
- Easier long-term maintenance

## Related Document

docs/engineering_standards.md

---

# Future ADRs

Future architectural decisions will be documented here as the project evolves.

Examples:

- Backend framework
- Feature engineering strategy
- Model selection
- Model serialization
- Deployment architecture
- Monitoring strategy