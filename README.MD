# Command Safety MCP Server

**Author:** Amish Adhvaryu

**Description:** A lightweight Node.js MCP server that analyzes shell linux windows or macOS commands and returns a safety score (0-10) and detected intent, providing a layer of security for command execution. This project was started as a way to learn MCP. This project leverages the ModelContextProtocol SDK to provide an initial simple solution with simple local check or by using AI.

## Table of Contents
*   [Introduction](#introduction)
*   [Features](#features)
*   [Installation](#installation)
*   [Usage](#usage)
    *   `analyze-command` Tool
*   [API Reference](#api-reference)
*   [Contributing](#contributing)
*   [License](#license)

## Introduction

This MCP (Command Safety MCP) server is designed to analyze windows linux or macOS commands and assess their potential risk. Only STDIO is currently implemented. 

It provides a safety score (0-10), indicating the level of danger associated with the command, along with the detected intent behind it. This can be used in environments where automated command execution is required, providing an extra layer of security and control.

![LM-Studio-Usage-Example](LM-Studio-Usage-Example.png)

## Features
*   **Intent Detection:** Identifies common command intents such as file listing, directory creation, removal, network testing, and more.
*   **Risk Scoring:** Assigns a safety score based on the presence of risky tokens and identified intents.
*   **JSON Output:** Returns results in a structured JSON format for easy integration with other systems.
*   **Extensible:** Designed to be easily extended with different analyzers.

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/adhvaa/mcp-command-safety-checker.git
    cd mcp-command-safety-checker
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

## Usage

1.  **Start the Server:**
    ```bash
    npx mcp-command-safety-checker
    ```

### `analyze-command` Tool

The `analyze-command` tool is the core functionality of this MCP. It takes a command string as input and returns a safety score and detected intent.

**Example:**

To analyze the command `rm -rf`, you would typically interact with the server through its API (see section below).  For demonstration purposes, you could potentially pipe commands to the server's standard input (though this is not currently implemented for direct interaction).

## API Reference

The primary API endpoint is the `analyze-command` tool. It accepts a command string as input and returns a JSON object with the following structure:

```json
{
  "content": [
    {
      "type": "text",
      "text": "{safetyScore: 4, intent: 'Command intends to remove all files recursively. It could potentially be risky depending on its execution directory.'}"
    }
  ]
}
```

*   **`safety_score`**: An integer between 0 and 10 representing the safety score of the command. Lower values indicate higher risk.
*   **`intent`**: A string describing the detected intent behind the command (e.g., "file listing", "network test").

## Contributing
//TO DO
