import { readFileSync } from "node:fs";

import { describe, expect, test } from "bun:test";

import { CAPABILITIES } from "../capabilities/index.js";
import { createApiAdapterCliProvider } from "./createApiAdapterCliProvider.js";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

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

  test("publishes full capability descriptors instead of legacy identifier strings", () => {
    const rawPackageJson: unknown = JSON.parse(
      readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
    );
    if (!isRecord(rawPackageJson)) {
      throw new Error("package.json must contain an object.");
    }

    const rawAnkhMetadata = rawPackageJson.ankh;
    if (!isRecord(rawAnkhMetadata)) {
      throw new Error("package.json must contain Ankh metadata.");
    }

    const publishedCapabilities = rawAnkhMetadata.capabilities;
    if (!Array.isArray(publishedCapabilities)) {
      throw new Error("Ankh metadata must contain a capability catalog.");
    }

    expect(JSON.stringify(publishedCapabilities)).toBe(
      JSON.stringify(CAPABILITIES),
    );
    expect(
      publishedCapabilities.every(
        (capability) => typeof capability === "object" && capability !== null,
      ),
    ).toBe(true);
  });
});
