#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import './config.js';
import { getChecker } from "./checker/index.js";


console.error("Checker Type=" + process.env.CHECKER_TYPE)
const checkCommand = getChecker();

const server = new McpServer({
  name: "Command Safety MCP Server",
  version: "1.0.0",
  capabilities: { tools: {} }
});

server.tool(
  "analyze-command",
  "Analyze a shell/Windows command and return a safety score (0–10) and detected intent",
  {
    command: z.string().describe("Full command string to analyze")
  },
  async ({ command }) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(await checkCommand(command), null, 2)
      }
    ]
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});