# Overview

This is an example of a ESNext typescript vite + vite-plugin-ssr + serverless app.

:construction: This is a WIP and does not work yet

## Running

### Prerequisites

- `nvm install`
- `pnpm install`

### With dev express

- `pnpm run dev:server`

### With prod express

- `pnpm run prod:server`

### With serverless-offline

- `pnpm run prod:lambda`

Boots but runtime throws
```text
cannot test case insensitive FS, CLIENT_ENTRY does not point to an existing file: /Users/chstrydom/Documents/GitHub/vite-production-serverless-build/.esbuild/.build/dist/client/client.mjs
```
