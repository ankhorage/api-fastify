import { createApiRuntime } from '@ankhorage/api';

import {
  createFastifyApiServer,
  registerFastifyApiAsync,
} from '../../src/apiFastify.js';

/***
 * @title Basic Usage
 *
 * Create a framework-neutral API runtime and expose it through Fastify without moving application
 * handlers into Fastify request/reply code.
 *
 * @usage
 * @readme
 */
const runtime = createApiRuntime({
  definition: {
    id: 'health-api',
    origin: 'internal',
    protocol: 'rest',
    basePath: '/api',
    endpoints: {
      health: {
        id: 'health',
        kind: 'http',
        operations: {
          'health.read': {
            id: 'health.read',
            protocol: 'http',
            intent: 'read',
            method: 'GET',
            path: '/health',
          },
        },
      },
    },
  },
  handlers: {
    'health.read': () => ({ body: { ok: true } }),
  },
});

const server = createFastifyApiServer({ logger: false });
await registerFastifyApiAsync(server, runtime);

export const response = await server.inject({
  method: 'GET',
  url: '/api/health',
});

await server.close();
