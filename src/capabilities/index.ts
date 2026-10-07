import type { Capability } from "@ankhorage/contracts/capabilities";

/*** Publish the Fastify adapter inspection capabilities. */
export const CAPABILITIES = [
  {
    id: "api-fastify.routes",
    owner: "@ankhorage/api-fastify",
    access: ["invoke"],
    binding: {
      kind: "action",
      bindableAs: ["target"],
    },
    label: "Inspect Fastify routes",
    description:
      "Inspect the Fastify route projection for a portable internal REST API definition.",
  },
] as const satisfies readonly Capability[];
