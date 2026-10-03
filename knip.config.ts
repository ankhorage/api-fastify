import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: [
    'src/apiFastify.ts',
    'examples/**/*.ts',
    'paradox.config.ts',
    'eslint.config.mjs',
  ],
});
