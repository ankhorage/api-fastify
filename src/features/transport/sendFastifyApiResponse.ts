import type { ApiResponse } from "@ankhorage/api";

import type { FastifyApiTransportRequest } from "../../types/fastify.js";

/*** Send one framework-neutral API response through the original Fastify reply object. */
export function sendFastifyApiResponse(
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
