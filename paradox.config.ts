import { defineParadoxConfig } from "@ankhorage/paradox";

export default defineParadoxConfig({
  mode: "write",
  docs: {
    title: "@ankhorage/api-fastify",
    description:
      "Fastify transport adapter and host integration for the Ankhorage API runtime.",
  },
  package: {
    root: ".",
    entrypoints: ["src/apiFastify.ts"],
  },
  output: { dir: "./paradox" },
});
