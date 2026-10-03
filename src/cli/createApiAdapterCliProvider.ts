import type { AnkhRuntimeCommandProvider } from "@ankhorage/ankh";

import packageJson from "../../package.json" with { type: "json" };
import { runRoutesCommandAsync } from "./commands/routes.js";

/*** Create the Ankh provider for api-fastify adapter inspection commands. */
export function createApiAdapterCliProvider(): AnkhRuntimeCommandProvider {
  return {
    id: packageJson.name,
    category: "api-fastify",
    version: packageJson.version,
    capabilities: ["api-fastify.routes"],
    commands: [
      {
        path: ["routes"],
        capability: "api-fastify.routes",
        summary:
          "Inspect the Fastify route projection for a portable internal REST API definition.",
      },
    ],
    handlers: [
      {
        path: ["routes"],
        handler: runRoutesCommandAsync,
      },
    ],
  };
}
