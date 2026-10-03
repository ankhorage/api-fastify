export type { FastifyCorsOptions } from "@fastify/cors";
export type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";

export { createFastifyApiServer } from "./features/host/createFastifyApiServer.js";
export { registerFastifyCorsAsync } from "./features/host/registerFastifyCorsAsync.js";
export { createFastifyApiAdapter } from "./features/transport/createFastifyApiAdapter.js";
export { registerFastifyApiAsync } from "./features/transport/registerFastifyApiAsync.js";
export type {
  FastifyApiTransportRequest,
  FastifyRegisteredOperation,
  RegisterFastifyApiOptions,
} from "./types/fastify.js";
