import { createRequire } from "node:module";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

const require = createRequire(import.meta.url);

export default function searchxngExtension(pi: ExtensionAPI) {
  pi.registerTool({
    name: "searchxng_search",
    label: "SearchXNG Search",
    description: "Search a SearchXNG instance using the searchxng CLI.",
    promptSnippet: "Query a SearchXNG instance for web search results.",
    promptGuidelines: [
      "Use this tool when the user asks for web search through SearchXNG or the configured local SearchXNG instance.",
      "Prefer this tool over generic bash calls when you need SearchXNG results."
    ],
    parameters: Type.Object({
      query: Type.String({ description: "Search query" }),
      endpoint: Type.Optional(Type.String({ description: "SearchXNG base URL. Defaults to SEARCHXNG_URL or the CLI default." })),
      language: Type.Optional(Type.String({ description: "Language code, e.g. en or es." })),
      categories: Type.Optional(Type.String({ description: "Comma-separated categories such as news,science." })),
      maxResults: Type.Optional(Type.Number({ description: "Maximum number of results to return." }))
    }),
    async execute(_toolCallId, params, signal) {
      const cliPath = require.resolve("searchxng/bin/searchxng.js");
      const args: string[] = [cliPath, params.query, "--json"];

      if (params.endpoint) args.push("--endpoint", params.endpoint);
      if (params.language) args.push("--language", params.language);
      if (params.categories) args.push("--categories", params.categories);
      if (typeof params.maxResults === "number") {
        args.push("--max-results", String(params.maxResults));
      }

      const result = await pi.exec(process.execPath, args, { signal });

      if (result.code !== 0) {
        throw new Error(result.stderr || result.stdout || "searchxng failed");
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(result.stdout);
      } catch {
        throw new Error("searchxng returned invalid JSON");
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(parsed, null, 2)
          }
        ],
        details: {
          command: [process.execPath, ...args],
          results: parsed
        }
      };
    }
  });
}
