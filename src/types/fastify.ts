import type {
  ApiOperationBinding,
  ComposeAuthorizedApiRuntimeOptions,
  CreateTrustedExternalApiBrokerOptions,
  TrustedExternalApiBrokerContext,
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

/*** Describe one authenticated caller supplied by the deployable Fastify host. */
export type FastifyAuthenticatedCaller = Readonly<Record<string, unknown>>;

export interface RegisterFastifyApiOptions {
  readonly prefix?: string;
}

export interface FastifyRegisteredOperation {
  readonly binding: ApiOperationBinding;
  readonly path: string;
}

/*** Configure the host-owned dependencies for one generated-app external API broker route. */
export interface RegisterTrustedExternalApiBrokerFastifyOptions {
  readonly authenticateCallerAsync: (
    request: FastifyRequest,
  ) =>
    | FastifyAuthenticatedCaller
    | undefined
    | Promise<FastifyAuthenticatedCaller | undefined>;
  readonly resolveScopeAsync: (input: {
    readonly request: FastifyRequest;
    readonly caller: FastifyAuthenticatedCaller;
  }) =>
    | TrustedExternalApiBrokerContext["scope"]
    | undefined
    | Promise<TrustedExternalApiBrokerContext["scope"] | undefined>;
  readonly authorizeAsync: CreateTrustedExternalApiBrokerOptions["authorizeAsync"];
  readonly resolveOperationAsync: CreateTrustedExternalApiBrokerOptions["resolveOperationAsync"];
  readonly validateInputAsync: CreateTrustedExternalApiBrokerOptions["validateInputAsync"];
  readonly resolveCredentialsAsync: CreateTrustedExternalApiBrokerOptions["resolveCredentialsAsync"];
  readonly executeOperationAsync: CreateTrustedExternalApiBrokerOptions["executeOperationAsync"];
}

/*** Describe the route registered for the deployable generated-app external API broker. */
export interface FastifyTrustedExternalApiBrokerRoute {
  readonly path: string;
}
