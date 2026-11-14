import { createApiRuntime } from "@ankhorage/api";
import { afterEach, describe, expect, test } from "bun:test";
import type { FastifyInstance } from "fastify";

import { createFastifyApiServer } from "../host/createFastifyApiServer.js";
import { registerAuthorizedFastifyApiAsync } from "./registerAuthorizedFastifyApiAsync.js";
import { registerFastifyApiAsync } from "./registerFastifyApiAsync.js";

const servers: FastifyInstance[] = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => server.close()));
});

describe("registerFastifyApiAsync", () => {
  test("registers runtime operations and dispatches through Fastify", async () => {
    const runtime = createApiRuntime({
      definition: {
        id: "example",
        origin: "internal",
        protocol: "rest",
        basePath: "/api",
        endpoints: {
          health: {
            id: "health",
            kind: "http",
            operations: {
              "health.read": {
                id: "health.read",
                protocol: "http",
                intent: "read",
                method: "GET",
                path: "/health/:id",
              },
            },
          },
        },
      },
      handlers: {
        "health.read": (request) => ({
          status: 201,
          headers: { "x-operation": request.operationId },
          body: { id: request.params.id, query: request.query.view },
        }),
      },
    });
    const server = createFastifyApiServer({ logger: false });
    servers.push(server);

    const registered = await registerFastifyApiAsync(server, runtime);
    expect(registered.map((item) => item.path)).toEqual(["/api/health/:id"]);

    const response = await server.inject({
      method: "GET",
      url: "/api/health/one?view=detail",
    });

    expect(response.statusCode).toBe(201);
    expect(response.headers["x-operation"]).toBe("health.read");
    expect(response.json<{ id: string; query: string }>()).toEqual({
      id: "one",
      query: "detail",
    });
  });
});

describe("registerAuthorizedFastifyApiAsync", () => {
  test("hosts only API-approved handlers and denies an unauthorized request", async () => {
    const server = createFastifyApiServer({ logger: false });
    servers.push(server);
    const handler = () => ({ body: { ok: true } });

    await registerAuthorizedFastifyApiAsync(server, {
      definition: healthDefinition,
      context: { appId: "app", projectId: "project" },
      resolveHandler: ({ binding }) =>
        binding.operationId === "health.read" ? handler : undefined,
      authorizeAsync: () => false,
    });

    const response = await server.inject({ method: "GET", url: "/api/health" });

    expect(response.statusCode).toBe(403);
    expect(
      response.json<{ error: { code: string; operationId: string } }>(),
    ).toEqual({
      error: { code: "forbidden", operationId: "health.read" },
    });
  });
});

describe("authorized API registration validation", () => {
  test("preserves canonical API errors from an approved handler", async () => {
    const server = createFastifyApiServer({ logger: false });
    servers.push(server);

    await registerAuthorizedFastifyApiAsync(server, {
      definition: healthDefinition,
      context: { appId: "app", projectId: "project" },
      resolveHandler: () => () => {
        throw new Error("handler failure");
      },
      authorizeAsync: () => true,
    });

    const response = await server.inject({ method: "GET", url: "/api/health" });

    expect(response.statusCode).toBe(500);
    expect(
      response.json<{ error: { code: string; operationId: string } }>(),
    ).toEqual({
      error: { code: "handler_failed", operationId: "health.read" },
    });
  });
});

describe("authorized route exposure", () => {
  test("does not expose a route when the API owner has not approved its handler", async () => {
    const server = createFastifyApiServer({ logger: false });
    servers.push(server);

    expect(
      registerAuthorizedFastifyApiAsync(server, {
        definition: healthDefinition,
        context: { appId: "app", projectId: "project" },
        resolveHandler: () => undefined,
        authorizeAsync: () => true,
      }),
    ).rejects.toThrow(
      "No approved handler is registered for API operation health.read.",
    );

    expect(
      (await server.inject({ method: "GET", url: "/api/health" })).statusCode,
    ).toBe(404);
  });

  test("leaves unknown paths and unsupported methods to Fastify routing", async () => {
    const server = createFastifyApiServer({ logger: false });
    servers.push(server);

    await registerAuthorizedFastifyApiAsync(server, {
      definition: healthDefinition,
      context: { appId: "app", projectId: "project" },
      resolveHandler: () => () => ({ body: { ok: true } }),
      authorizeAsync: () => true,
    });

    expect(
      (await server.inject({ method: "POST", url: "/api/health" })).statusCode,
    ).toBe(404);
    expect(
      (await server.inject({ method: "GET", url: "/api/missing" })).statusCode,
    ).toBe(404);
  });
});

const healthDefinition = {
  id: "health-api",
  origin: "internal" as const,
  protocol: "rest" as const,
  basePath: "/api",
  endpoints: {
    health: {
      id: "health",
      kind: "http" as const,
      operations: {
        "health.read": {
          id: "health.read",
          protocol: "http" as const,
          intent: "read" as const,
          method: "GET",
          path: "/health",
        },
      },
    },
  },
};
