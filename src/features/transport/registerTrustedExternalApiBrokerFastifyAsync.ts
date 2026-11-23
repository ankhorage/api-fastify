import {
  type ApiResponse,
  createTrustedExternalApiBroker,
  type TrustedExternalApiBrokerContext,
  type TrustedExternalApiBrokerRequest,
} from "@ankhorage/api";
import type { FastifyInstance, FastifyRequest } from "fastify";

import type {
  FastifyAuthenticatedCaller,
  FastifyTrustedExternalApiBrokerRoute,
  RegisterTrustedExternalApiBrokerFastifyOptions,
} from "../../types/fastify.js";
import { sendFastifyApiResponse } from "./sendFastifyApiResponse.js";

const trustedExternalApiBrokerPath =
  "/api/runtime/external/:apiId/:endpointId/:operationId";
const trustedExternalApiBrokerBodyLimit = 1_048_576;

/*** Register the deployable Fastify transport for trusted generated-app external API operations. */
export function registerTrustedExternalApiBrokerFastifyAsync(
  server: FastifyInstance,
  options: RegisterTrustedExternalApiBrokerFastifyOptions,
): Promise<FastifyTrustedExternalApiBrokerRoute> {
  const broker = createTrustedExternalApiBroker({
    authorizeAsync: options.authorizeAsync,
    resolveOperationAsync: options.resolveOperationAsync,
    validateInputAsync: options.validateInputAsync,
    resolveCredentialsAsync: options.resolveCredentialsAsync,
    executeOperationAsync: options.executeOperationAsync,
  });

  server.post(
    trustedExternalApiBrokerPath,
    { bodyLimit: trustedExternalApiBrokerBodyLimit },
    async (request, reply) => {
      const caller = await resolveCallerAsync(request, options);
      if (caller === undefined) {
        return sendFastifyApiResponse(unauthorizedResponse, { request, reply });
      }

      const scope = await resolveScopeAsync(request, caller, options);
      if (scope === undefined) {
        return sendFastifyApiResponse(forbiddenResponse, { request, reply });
      }

      const brokerRequest = readBrokerRequest(request);
      if (brokerRequest === undefined) {
        return sendFastifyApiResponse(invalidRequestResponse, {
          request,
          reply,
        });
      }

      return sendFastifyApiResponse(
        await broker.executeAsync({
          context: { caller, scope },
          request: brokerRequest,
        }),
        { request, reply },
      );
    },
  );

  return Promise.resolve({ path: trustedExternalApiBrokerPath });
}

/*** Authenticate one caller without exposing host authentication failures to the client. */
async function resolveCallerAsync(
  request: FastifyRequest,
  options: RegisterTrustedExternalApiBrokerFastifyOptions,
): Promise<FastifyAuthenticatedCaller | undefined> {
  try {
    return await options.authenticateCallerAsync(request);
  } catch {
    return undefined;
  }
}

/*** Resolve a complete host-owned application scope without exposing mapping failures to the client. */
async function resolveScopeAsync(
  request: FastifyRequest,
  caller: FastifyAuthenticatedCaller,
  options: RegisterTrustedExternalApiBrokerFastifyOptions,
): Promise<TrustedExternalApiBrokerContext["scope"] | undefined> {
  try {
    const scope = await options.resolveScopeAsync({ request, caller });
    return isTrustedScope(scope) ? scope : undefined;
  } catch {
    return undefined;
  }
}

/*** Read the only client-controlled broker values from an exact Fastify route and bounded request body. */
function readBrokerRequest(
  request: FastifyRequest,
): TrustedExternalApiBrokerRequest | undefined {
  const params = readStringRecord(request.params);
  const { apiId, endpointId, operationId } = params;
  if (!apiId || !endpointId || !operationId) return undefined;

  const body = request.body === undefined ? {} : request.body;
  if (!isRecord(body)) return undefined;
  if (Object.keys(body).some((name) => name !== "input")) return undefined;

  return {
    apiId,
    endpointId,
    operationId,
    ...(body.input === undefined ? {} : { input: body.input }),
  };
}

/*** Accept only a fully specified server-owned generated-app application scope. */
function isTrustedScope(
  value: unknown,
): value is TrustedExternalApiBrokerContext["scope"] {
  if (!isRecord(value)) return false;
  return [value.appId, value.projectId, value.environment].every(
    (item) => typeof item === "string" && item.trim().length > 0,
  );
}

/*** Normalize Fastify route params into string values. */
function readStringRecord(value: unknown): Readonly<Record<string, string>> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

/*** Detect one record at the Fastify transport boundary. */
function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const unauthorizedResponse: ApiResponse = {
  status: 401,
  headers: {},
  body: { error: { code: "unauthorized" } },
};

const forbiddenResponse: ApiResponse = {
  status: 403,
  headers: {},
  body: { error: { code: "forbidden" } },
};

const invalidRequestResponse: ApiResponse = {
  status: 400,
  headers: {},
  body: { error: { code: "invalid_request" } },
};
