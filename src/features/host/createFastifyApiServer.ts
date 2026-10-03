import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from "fastify";

/*** Create the Fastify server owned by the Ankhorage Fastify API adapter package. */
export function createFastifyApiServer(
  options: FastifyServerOptions = {},
): FastifyInstance {
  return Fastify(options);
}
