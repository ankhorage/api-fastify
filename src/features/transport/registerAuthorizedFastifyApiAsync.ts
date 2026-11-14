import {
  composeAuthorizedApiRuntime,
  type ComposeAuthorizedApiRuntimeOptions,
} from "@ankhorage/api";
import type { FastifyInstance } from "fastify";

import type {
  FastifyRegisteredOperation,
  RegisterFastifyApiOptions,
} from "../../types/fastify.js";
import { registerFastifyApiAsync } from "./registerFastifyApiAsync.js";

/*** Compose authorized API handlers before registering their canonical operation bindings with Fastify. */
export async function registerAuthorizedFastifyApiAsync(
  server: FastifyInstance,
  composition: ComposeAuthorizedApiRuntimeOptions,
  options: RegisterFastifyApiOptions = {},
): Promise<readonly FastifyRegisteredOperation[]> {
  return registerFastifyApiAsync(
    server,
    composeAuthorizedApiRuntime(composition),
    options,
  );
}
