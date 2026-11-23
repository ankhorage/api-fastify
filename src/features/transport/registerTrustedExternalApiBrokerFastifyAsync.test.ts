import { afterEach, describe, expect, test } from "bun:test";
import type { FastifyInstance } from "fastify";

import { createFastifyApiServer } from "../host/createFastifyApiServer.js";
import { registerTrustedExternalApiBrokerFastifyAsync } from "./registerTrustedExternalApiBrokerFastifyAsync.js";

const servers: FastifyInstance[] = [];
const brokerUrl = "/api/runtime/external/zefix/company/search";
type BrokerOptions = Parameters<
  typeof registerTrustedExternalApiBrokerFastifyAsync
>[1];

afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => server.close()));
});

describe("trusted external API broker route registration", () => {
  test("delegates only trusted host-owned context through the fixed route", async () => {
    const server = createServer();
    const calls: string[] = [];
    const registered = await registerTrustedExternalApiBrokerFastifyAsync(
      server,
      recordingOptions(calls),
    );

    expect(registered.path).toBe(
      "/api/runtime/external/:apiId/:endpointId/:operationId",
    );

    const response = await postBroker(server);
    expect(response.statusCode).toBe(201);
    expect(response.json<unknown>()).toEqual({ company: "Ankhorage" });
    expect(calls).toEqual([
      "authenticate",
      "scope",
      "authorize",
      "operation",
      "validate",
      "credentials",
      "execute",
    ]);
  });
});

describe("trusted external API broker authentication", () => {
  test("denies an unauthenticated caller before operation, credential, or network ports", async () => {
    const server = createServer();
    const calls: string[] = [];
    await registerTrustedExternalApiBrokerFastifyAsync(
      server,
      trustedOptions({
        authenticateCallerAsync: () => {
          calls.push("authenticate");
          return undefined;
        },
        resolveOperationAsync: () => {
          calls.push("operation");
          return undefined;
        },
        resolveCredentialsAsync: () => {
          calls.push("credentials");
          return undefined;
        },
        executeOperationAsync: () => {
          calls.push("execute");
          return { status: 200 };
        },
      }),
    );

    const response = await postBroker(server);
    expect(response.statusCode).toBe(401);
    expect(response.json<unknown>()).toEqual({
      error: { code: "unauthorized" },
    });
    expect(calls).toEqual(["authenticate"]);
  });
});

describe("trusted external API broker request isolation", () => {
  test("rejects caller-owned scope and upstream fields before broker execution", async () => {
    const server = createServer();
    const calls: string[] = [];
    await registerTrustedExternalApiBrokerFastifyAsync(
      server,
      trustedOptions({
        authenticateCallerAsync: () => {
          calls.push("authenticate");
          return { id: "caller" };
        },
        resolveScopeAsync: () => {
          calls.push("scope");
          return { appId: "app", projectId: "project", environment: "prod" };
        },
      }),
    );

    for (const payload of [
      { projectId: "another-project", input: {} },
      { url: "https://untrusted.example", input: {} },
    ]) {
      const response = await postBroker(server, payload);
      expect(response.statusCode).toBe(400);
      expect(response.json<unknown>()).toEqual({
        error: { code: "invalid_request" },
      });
    }
    expect(calls).toEqual(["authenticate", "scope", "authenticate", "scope"]);
  });
});

describe("trusted external API broker unknown operations", () => {
  test("returns the canonical unknown-operation response", async () => {
    const server = createServer();
    await registerTrustedExternalApiBrokerFastifyAsync(
      server,
      trustedOptions({ resolveOperationAsync: () => undefined }),
    );
    expect((await postBroker(server)).statusCode).toBe(404);
  });
});

describe("trusted external API broker unavailable credentials", () => {
  test("does not execute an operation when its required credential is unavailable", async () => {
    const server = createServer();
    let executed = false;
    await registerTrustedExternalApiBrokerFastifyAsync(
      server,
      trustedOptions({
        resolveOperationAsync: ({ request }) => ({
          ...request,
          credentialsRequired: true,
        }),
        resolveCredentialsAsync: () => undefined,
        executeOperationAsync: () => {
          executed = true;
          return { status: 200 };
        },
      }),
    );

    const response = await postBroker(server);
    expect(response.statusCode).toBe(424);
    expect(response.json<unknown>()).toEqual({
      error: { code: "credential_unavailable" },
    });
    expect(executed).toBeFalse();
  });
});

describe("trusted external API broker failed providers", () => {
  test("redacts provider diagnostics from failed operation responses", async () => {
    const server = createServer();
    await registerTrustedExternalApiBrokerFastifyAsync(
      server,
      trustedOptions({
        executeOperationAsync: () => {
          throw new Error("token=server-only https://upstream.example");
        },
      }),
    );

    const response = await postBroker(server);
    expect(response.statusCode).toBe(502);
    expect(response.json<unknown>()).toEqual({
      error: { code: "external_operation_failed" },
    });
    expect(response.body).not.toContain("server-only");
    expect(response.body).not.toContain("upstream.example");
  });
});

/*** Create and track one isolated Fastify server for an external broker transport test. */
function createServer(): FastifyInstance {
  const server = createFastifyApiServer({ logger: false });
  servers.push(server);
  return server;
}

/*** Execute one normal external broker request against the fixed generated-app route. */
async function postBroker(
  server: FastifyInstance,
  payload: Readonly<Record<string, unknown>> = {
    input: { query: "Ankhorage" },
  },
) {
  return await server.inject({ method: "POST", url: brokerUrl, payload });
}

function recordingOptions(calls: string[]): BrokerOptions {
  return trustedOptions({
    authenticateCallerAsync: () => {
      calls.push("authenticate");
      return { id: "caller" };
    },
    resolveScopeAsync: ({ caller }) => {
      calls.push("scope");
      expect(caller).toEqual({ id: "caller" });
      return { appId: "app", projectId: "project", environment: "prod" };
    },
    authorizeAsync: ({ context, request }) => {
      calls.push("authorize");
      expect(context).toEqual({
        caller: { id: "caller" },
        scope: { appId: "app", projectId: "project", environment: "prod" },
      });
      expect(request).toEqual({
        apiId: "zefix",
        endpointId: "company",
        operationId: "search",
        input: { query: "Ankhorage" },
      });
      return true;
    },
    resolveOperationAsync: ({ scope, request }) => {
      calls.push("operation");
      expect(scope).toEqual({
        appId: "app",
        projectId: "project",
        environment: "prod",
      });
      return { ...request, credentialsRequired: true };
    },
    validateInputAsync: ({ input }) => {
      calls.push("validate");
      return input;
    },
    resolveCredentialsAsync: () => {
      calls.push("credentials");
      return { values: { token: "server-only" } };
    },
    executeOperationAsync: ({ credentials, input }) => {
      calls.push("execute");
      expect(credentials).toEqual({ values: { token: "server-only" } });
      expect(input).toEqual({ query: "Ankhorage" });
      return { status: 201, publicBody: { company: "Ankhorage" } };
    },
  });
}

/*** Provide secure host ports with narrow defaults that individual tests can override. */
function trustedOptions(overrides: Partial<BrokerOptions> = {}): BrokerOptions {
  return {
    authenticateCallerAsync: () => ({ id: "caller" }),
    resolveScopeAsync: () => ({
      appId: "app",
      projectId: "project",
      environment: "prod",
    }),
    authorizeAsync: () => true,
    resolveOperationAsync: ({ request }) => ({ ...request }),
    validateInputAsync: ({ input }) => input,
    resolveCredentialsAsync: () => ({ values: { token: "server-only" } }),
    executeOperationAsync: () => ({ status: 200, publicBody: { ok: true } }),
    ...overrides,
  };
}
