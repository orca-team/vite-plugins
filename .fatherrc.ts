import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'es',
    targets: { chrome: 49 },
  },
  cjs: {
    output: 'lib',
    transformer: 'babel',
    targets: { ie: 11 },
  },
});
