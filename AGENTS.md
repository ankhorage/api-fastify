# AGENTS.md

## Repository

Package: `@ankhorage/api-fastify`

Fastify transport adapter for the canonical `@ankhorage/api` runtime.

## Current architecture only

Only the current Ankhorage architecture is valid. Do not duplicate API dispatch or portable contract semantics owned by `@ankhorage/api` and `@ankhorage/contracts`.

Cross-package usage must go through published public APIs and declared dependencies.

## Required repository instructions

Before changing any file, inspect `.agents/skills/` when present. Load the Ankhorage coding rules and project-structure rules for implementation work, plus hexagonal architecture for boundary changes.

## Scope

This package owns Fastify-specific request/reply translation, route registration, host creation, and Fastify-specific configuration. Consumers should not need a direct `fastify` dependency for normal Ankhorage API hosting.
