# Overview

This is an example of an ESNext typescript, vite + vite-plugin-ssr, serverless app.

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

## Deploying

- Make sure you have set up your [aws serverless credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials)
- `pnpm run deploy`
