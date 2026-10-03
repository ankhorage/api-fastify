import type {
  ApiOperationBinding,
  ApiRequest,
  ApiResponse,
  ApiTransportAdapter,
} from "@ankhorage/api";

import type { FastifyApiTransportRequest } from "../../types/fastify.js";

/*** Create the Fastify transport mapper for the canonical Ankhorage API runtime. */
export function createFastifyApiAdapter(): ApiTransportAdapter<
  FastifyApiTransportRequest,
  unknown
> {
  return {
    toApiRequestAsync: (transport, binding) =>
      Promise.resolve(toApiRequest(transport, binding)),
    fromApiResponseAsync: (response, transport) =>
      Promise.resolve(sendApiResponse(response, transport)),
  };
}

/*** Normalize one Fastify request into the framework-neutral API request contract. */
function toApiRequest(
  transport: FastifyApiTransportRequest,
  binding: ApiOperationBinding,
): ApiRequest {
  return {
    operationId: binding.operationId,
    method: binding.method,
    params: readStringRecord(transport.request.params),
    query: readQueryRecord(transport.request.query),
    headers: readHeaders(transport.request.headers),
    ...(transport.request.body === undefined
      ? {}
      : { body: transport.request.body }),
  };
}

/*** Send one framework-neutral API response through the original Fastify reply object. */
function sendApiResponse(
  response: ApiResponse,
  transport: FastifyApiTransportRequest,
): unknown {
  for (const [name, value] of Object.entries(response.headers)) {
    transport.reply.header(name, value);
  }
  transport.reply.status(response.status);
  return response.body === undefined
    ? transport.reply.send()
    : transport.reply.send(response.body);
}

/*** Normalize unknown route params into string values. */
function readStringRecord(value: unknown): Readonly<Record<string, string>> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

/*** Normalize Fastify query values to the portable API query contract. */
function readQueryRecord(
  value: unknown,
): Readonly<Record<string, string | readonly string[]>> {
  if (!isRecord(value)) return {};
  const entries = Object.entries(value).flatMap<
    readonly [string, string | readonly string[]]
  >(([name, item]) => {
    if (typeof item === "string") return [[name, item]];
    if (
      Array.isArray(item) &&
      item.every((entry): entry is string => typeof entry === "string")
    ) {
      return [[name, item]];
    }
    return [];
  });

  return Object.fromEntries(entries);
}

/*** Normalize Fastify headers into one stable string-valued record. */
function readHeaders(
  headers: Readonly<Record<string, string | readonly string[] | undefined>>,
): Readonly<Record<string, string>> {
  return Object.fromEntries(
    Object.entries(headers).flatMap(([name, value]) => {
      if (typeof value === "string") return [[name, value] as const];
      if (Array.isArray(value)) return [[name, value.join(", ")] as const];
      return [];
    }),
  );
}

/*** Detect a record at the external transport boundary. */
function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
