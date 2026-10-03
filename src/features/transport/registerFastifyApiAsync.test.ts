import { createApiRuntime } from "@ankhorage/api";
import { afterEach, describe, expect, test } from "bun:test";
import type { FastifyInstance } from "fastify";

import { createFastifyApiServer } from "../host/createFastifyApiServer.js";
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
    expect(response.json()).toEqual({ id: "one", query: "detail" });
  });
});
