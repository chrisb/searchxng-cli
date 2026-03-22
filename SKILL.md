---
name: searchxng
description: Search the web using a local SearchXNG instance for up-to-date information.
---

# SearchXNG Web Search

This skill allows you to search the web using a privacy-focused SearchXNG proxy via the `searchxng` CLI tool. 

## Setup

If this package is published to npm, it will install automatically. Otherwise, run:
```bash
cd /path/to/searchxng && npm install -g .
```

## Usage

To search the web, use the `searchxng` command:

```bash
searchxng "your search query here" --endpoint <url> [options]
```

### Options:
- `-e, --endpoint <url>`: The SearchXNG instance URL (defaults to `http://localhost:8080/` or `SEARCHXNG_URL` env var)
- `-l, --language <lang>`: Language to search in (defaults to `en`)
- `-c, --categories <categories>`: Comma-separated list of categories (e.g. `news,science`)
- `-m, --max-results <number>`: Maximum number of results to return (defaults to `5`)
- `-j, --json`: Output raw JSON instead of formatted text

### Examples:
```bash
# Basic search with a specific endpoint
searchxng "cool new restaurants in orange county" --endpoint "http://192.168.4.4:8081/"

# Search in specific language
searchxng "best restaurants" -e "http://192.168.4.4:8081/" -l "es"

# Search with specific categories
searchxng "latest AI news" -e "http://192.168.4.4:8081/" -c "news,science"
```

## Configuration

You can also omit the `--endpoint` parameter if you export the `SEARCHXNG_URL` environment variable in your session:

```bash
export SEARCHXNG_URL="http://192.168.4.4:8081/"
searchxng "cool new restaurants in orange county"
```

### Troubleshooting: 403 Forbidden Error
If you encounter a `403 Forbidden` error when running a search, it is likely because SearchXNG disables JSON API requests by default for security/privacy. To fix this, enable the `json` format in your SearchXNG's `settings.yml` file:

```yaml
search:
  formats:
    - html
    - json
```
Restart your SearchXNG container or service after updating the settings.