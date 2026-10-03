import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: [
    'src/apiFastify.ts',
    'paradox.config.ts',
    'eslint.config.mjs',
  ],
});
