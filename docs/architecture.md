# Architecture

## Boundaries

The domain layer owns validation and project-specific deterministic logic. The repository interface isolates persistence. HTTP handlers translate requests into service calls and map known domain errors to safe responses.

## Project-specific core

CivicSignal merges overlapping reports using a normalized title-and-area fingerprint, keeps the strongest current signal, and removes expired alerts. Source confidence is explicit and does not replace links to original public sources.

## Deliberate limitations

The included server uses an in-memory repository and has no authentication. It is suitable for local exploration and tests only. A production deployment needs durable transactional storage, access control, request limits, observability, and a documented threat model.
