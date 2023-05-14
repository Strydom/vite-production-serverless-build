const esbuildPlugins = require('./esbuild-plugins.cjs')

module.exports = () => {
  return {
    packager: 'pnpm',
    platform: 'node',
    format: 'esm',
    bundle: true,
    sourcemap: true,
    // https://github.com/evanw/esbuild/issues/1921
    banner: {
      js: `
import path from 'path';
import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
`
    },
    plugins: esbuildPlugins
  }
}