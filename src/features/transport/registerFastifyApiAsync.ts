import {
  type ApiOperationBinding,
  type ApiRuntime,
  createApiTransportHandler,
} from "@ankhorage/api";
import type { FastifyInstance, HTTPMethods } from "fastify";

import type {
  FastifyApiTransportRequest,
  FastifyRegisteredOperation,
  RegisterFastifyApiOptions,
} from "../../types/fastify.js";
import { createFastifyApiAdapter } from "./createFastifyApiAdapter.js";

/*** Register every runtime operation as a Fastify route using one shared transport adapter. */
export async function registerFastifyApiAsync(
  server: FastifyInstance,
  runtime: ApiRuntime,
  options: RegisterFastifyApiOptions = {},
): Promise<readonly FastifyRegisteredOperation[]> {
  const adapter = createFastifyApiAdapter();
  const registered = runtime.bindings.map((binding) => {
    const path = joinPrefix(options.prefix, binding.path);
    const handler = createApiTransportHandler<
      FastifyApiTransportRequest,
      unknown
    >(runtime, adapter, binding);

    server.route({
      method: toFastifyMethod(binding),
      url: path,
      handler: (request, reply) => handler({ request, reply }),
    });

    return { binding, path };
  });

  await server.ready();
  return registered;
}

/*** Map one portable HTTP method onto the Fastify method union. */
function toFastifyMethod(binding: ApiOperationBinding): HTTPMethods {
  switch (binding.method) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "PATCH":
    case "POST":
    case "PUT":
      return binding.method;
    default:
      throw new Error(
        `Fastify does not support API operation method ${binding.method} for ${binding.operationId}.`,
      );
  }
}

/*** Prefix one generated route without duplicating slash separators. */
function joinPrefix(prefix: string | undefined, path: string): string {
  if (!prefix || prefix === "/") return path;
  const normalizedPrefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
  return path.startsWith("/")
    ? normalizedPrefix + path
    : normalizedPrefix + "/" + path;
}
