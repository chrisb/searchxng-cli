# @chrisbielinski/pi-searchxng

Pi package that exposes the standalone `searchxng` CLI as a Pi tool for agents.

## What it includes

- a `searchxng_search` tool
- a matching `searchxng` skill

## Install

```bash
pi install npm:@chrisbielinski/pi-searchxng
```

## Usage

Once installed, agents can call the `searchxng_search` tool to query a SearchXNG instance.

The tool shells out to the published `searchxng` CLI package and returns JSON results to the model.
