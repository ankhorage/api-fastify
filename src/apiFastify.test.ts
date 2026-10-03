import { describe, expect, test } from "bun:test";

import {
  createFastifyApiAdapter,
  createFastifyApiServer,
  registerFastifyApiAsync,
  registerFastifyCorsAsync,
} from "./apiFastify.js";

describe("@ankhorage/api-fastify public entrypoint", () => {
  test("exports the canonical adapter operations", () => {
    expect(createFastifyApiAdapter).toBeFunction();
    expect(createFastifyApiServer).toBeFunction();
    expect(registerFastifyApiAsync).toBeFunction();
    expect(registerFastifyCorsAsync).toBeFunction();
  });
});
