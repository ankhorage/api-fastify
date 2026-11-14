import type {
  ApiOperationBinding,
  ComposeAuthorizedApiRuntimeOptions,
} from "@ankhorage/api";
import type { FastifyCorsOptions } from "@fastify/cors";
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";

export type {
  ComposeAuthorizedApiRuntimeOptions,
  FastifyCorsOptions,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
};

export interface FastifyApiTransportRequest {
  readonly request: FastifyRequest;
  readonly reply: FastifyReply;
}

export interface RegisterFastifyApiOptions {
  readonly prefix?: string;
}

export interface FastifyRegisteredOperation {
  readonly binding: ApiOperationBinding;
  readonly path: string;
}
