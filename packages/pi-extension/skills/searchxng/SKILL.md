---
name: searchxng
description: Search the web using a configured SearchXNG instance via the searchxng_search tool.
---

# SearchXNG Web Search

Use the `searchxng_search` tool when you need up-to-date web results from a SearchXNG instance.

## When to use it

- searching the web for current information
- querying a local or self-hosted SearchXNG instance
- getting structured JSON search results for follow-up reasoning

## Parameters

- `query`: the search query
- `endpoint`: optional SearchXNG base URL
- `language`: optional language code such as `en`
- `categories`: optional comma-separated categories such as `news,science`
- `maxResults`: optional maximum number of results

## Notes

If `endpoint` is omitted, the CLI uses `SEARCHXNG_URL` when set, otherwise it falls back to its default endpoint.

If SearchXNG returns `403 Forbidden`, ensure the instance has JSON output enabled:

```yaml
search:
  formats:
    - html
    - json
```
