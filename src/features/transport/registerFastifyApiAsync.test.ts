import {
  type ApiApprovedHandler,
  type ApiHandler,
  createApiRuntime,
} from "@ankhorage/api";
import type { InternalRestApiDefinition } from "@ankhorage/contracts/data";
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
  test("delegates approved operation, method, intent, and scope to API 0.5 authorization", async () => {
    const server = createFastifyApiServer({ logger: false });
    servers.push(server);

    await registerAuthorizedFastifyApiAsync(server, {
      definition: healthDefinition,
      context: healthScope,
      resolveHandler: ({ binding, declaration, context }) => {
        expect(binding.operationId).toBe("health.read");
        expect(binding.method).toBe("GET");
        expect(binding.operation.intent).toBe("read");
        expect(declaration).toEqual({
          operationId: "health.read",
          capability: "health.status",
        });
        expect(context).toEqual(healthScope);

        return approvedHealthHandler((request, handlerContext) => ({
          status: 201,
          headers: { "x-operation": request.operationId },
          body: {
            capability: handlerContext.capability?.id,
            projectId: handlerContext.composition?.projectId,
          },
        }));
      },
      authorizeAsync: () => true,
    });

    const response = await server.inject({ method: "GET", url: "/api/health" });

    expect(response.statusCode).toBe(201);
    expect(response.headers["x-operation"]).toBe("health.read");
    expect(response.json<{ capability: string; projectId: string }>()).toEqual({
      capability: "health.status",
      projectId: "project",
    });
  });
});

describe("authorized API authorization", () => {
  test("hosts only API-approved handlers and denies an unauthorized request", async () => {
    const server = createFastifyApiServer({ logger: false });
    servers.push(server);

    await registerAuthorizedFastifyApiAsync(server, {
      definition: healthDefinition,
      context: healthScope,
      resolveHandler: ({ binding }) =>
        binding.operationId === "health.read"
          ? approvedHealthHandler(() => ({ body: { ok: true } }))
          : undefined,
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
      context: healthScope,
      resolveHandler: () =>
        approvedHealthHandler(() => {
          throw new Error("handler failure");
        }),
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
        context: healthScope,
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
      context: healthScope,
      resolveHandler: () =>
        approvedHealthHandler(() => ({ body: { ok: true } })),
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

const healthScope = { appId: "app", projectId: "project" };

function approvedHealthHandler(handler: ApiHandler): ApiApprovedHandler {
  return {
    capability: {
      id: "health.status" as const,
      owner: "@ankhorage/health",
      access: ["read"] as const,
      binding: { kind: "api" as const, bindableAs: ["target"] as const },
    },
    approval: {
      operationId: "health.read",
      intent: "read" as const,
      method: "GET" as const,
      capabilityId: "health.status" as const,
      owner: "@ankhorage/health",
      scope: healthScope,
    },
    handler,
  };
}

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
  handlers: {
    "health.read": {
      operationId: "health.read",
      capability: "health.status" as const,
    },
  },
} satisfies InternalRestApiDefinition;
