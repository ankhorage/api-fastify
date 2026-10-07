import { describe, expect, test } from "bun:test";

import packageJson from "../package.json" with { type: "json" };
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

  test("publishes capabilities through the package subpath", async () => {
    const { CAPABILITIES } =
      await import("@ankhorage/api-fastify/capabilities");

    expect<readonly unknown[]>(packageJson.ankh.capabilities).toEqual(
      CAPABILITIES,
    );
  });
});
