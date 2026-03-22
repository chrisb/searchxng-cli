#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

program
  .name("searchxng")
  .description("CLI to query a local or remote SearchXNG instance")
  .version("1.0.0");

program
  .argument("<query>", "The search query")
  .option("-e, --endpoint <url>", "The SearchXNG instance URL", process.env.SEARCHXNG_URL || "http://localhost:8080/")
  .option("-l, --language <lang>", "Language to search in", "en")
  .option("-c, --categories <categories>", "Comma-separated list of categories (e.g. news,science)")
  .option("-m, --max-results <number>", "Maximum number of results to return", "5")
  .option("-j, --json", "Output raw JSON instead of formatted text")
  .action(async (query, options) => {
    try {
      let endpoint = options.endpoint;
      if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
        endpoint = "http://" + endpoint;
      }
      
      const baseUrl = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
      const url = new URL("search", baseUrl);
      
      url.searchParams.set("q", query);
      url.searchParams.set("format", "json");
      url.searchParams.set("language", options.language);
      
      if (options.categories) {
        url.searchParams.set("categories", options.categories);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(url.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`SearchXNG API returned status ${response.status}`);
        process.exit(1);
      }

      const data = await response.json();
      
      const results = data.results || [];
      
      let limit = parseInt(options.maxResults, 10);
      if (isNaN(limit) || limit <= 0) limit = 5;

      const topResults = results.slice(0, limit);
      
      if (options.json) {
        console.log(JSON.stringify(topResults, null, 2));
        return;
      }

      if (topResults.length === 0) {
        console.log("No results found.");
        return;
      }

      const formatted = topResults.map((r, i) => {
        return `${i + 1}. ${r.title}\n   URL: ${r.url}\n   Snippet: ${r.content || r.snippet || ""}`;
      }).join("\n\n");

      console.log(formatted);
    } catch (error) {
      console.error(`Failed to search: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();
