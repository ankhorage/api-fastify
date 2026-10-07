import { isCapability } from "@ankhorage/contracts/capabilities";
import { describe, expect, test } from "bun:test";

import { CAPABILITIES } from "./index.js";

describe("CAPABILITIES", () => {
  test("contains valid canonical capability descriptors", () => {
    expect(CAPABILITIES.every(isCapability)).toBe(true);
  });

  test("contains unique capability identifiers", () => {
    const ids = CAPABILITIES.map((capability) => capability.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
