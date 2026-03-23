# searchxng monorepo

This repository contains two separate npm packages:

- `packages/cli` — the standalone `searchxng` CLI
- `packages/pi-extension` — a Pi package that exposes the CLI as a tool for Pi/OpenClaw agents

## Workspace layout

```text
packages/
  cli/
  pi-extension/
```

## Install dependencies

```bash
npm install
```

## Publish order

Publish the CLI first, then the Pi package:

```bash
cd packages/cli
npm publish

cd ../pi-extension
npm publish --access public
```

## Packages

### CLI

`packages/cli` publishes the standalone command:

```bash
npm install -g searchxng
searchxng --help
```

### Pi extension

`packages/pi-extension` publishes a Pi package that registers a `searchxng_search` tool and a matching skill.

Install it with Pi:

```bash
pi install npm:@chrisbielinski/pi-searchxng
```
