import { describe, expect, test } from "bun:test";

import { CAPABILITIES } from "../capabilities/index.js";
import { createApiAdapterCliProvider } from "./createApiAdapterCliProvider.js";

describe("createApiAdapterCliProvider", () => {
  test("uses the canonical capability catalog for the routes command", () => {
    const provider = createApiAdapterCliProvider();

    expect(provider.category).toBe("api-fastify");
    expect(provider.capabilities).toBe(CAPABILITIES);
    expect(provider.commands).toEqual([
      expect.objectContaining({
        path: ["routes"],
        capability: "api-fastify.routes",
      }),
    ]);
    expect(provider.handlers?.[0]?.path).toEqual(["routes"]);
  });

  test("maps every command to exactly one catalog capability independent of order", () => {
    const provider = createApiAdapterCliProvider();
    const commandCapabilityIds = provider.commands
      .map((command) => command.capability)
      .sort();
    const catalogCapabilityIds = CAPABILITIES.map(
      (capability) => capability.id,
    ).sort();

    expect(commandCapabilityIds).toEqual(catalogCapabilityIds);
  });
});
