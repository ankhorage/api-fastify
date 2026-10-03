import type { ApiOperationBinding } from "@ankhorage/api";
import type { FastifyReply, FastifyRequest } from "fastify";

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
