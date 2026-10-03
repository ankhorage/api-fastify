import cors, { type FastifyCorsOptions } from "@fastify/cors";
import type { FastifyInstance } from "fastify";

/*** Register Fastify CORS so consumers do not own the plugin directly. */
export async function registerFastifyCorsAsync(
  server: FastifyInstance,
  options: FastifyCorsOptions,
): Promise<void> {
  await server.register(cors, options);
}
