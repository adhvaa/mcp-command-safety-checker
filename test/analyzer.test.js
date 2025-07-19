import { describe, it, expect } from "vitest";
import { analyzeCommand } from "../src/analyzer.js";

describe("analyzeCommand()", () => {
  it("should detect simple list-files intent on Windows", async () => {
    const cmd = "dir C:\\Users\\Alice";
    const { intent, safetyScore } = await analyzeCommand(cmd);

    expect(intent).toBe("list files");
    // low risk: score ≥ 8
    expect(safetyScore).toBeGreaterThanOrEqual(8);
  });

  it("should flag destructive commands with low safety", async () => {
    const cmd = "rm -rf /var/log";
    const { intent, safetyScore } = await analyzeCommand(cmd);

    expect(intent).toBe("remove files");
    expect(safetyScore).toBe(8);
  });

  it("should return unknown intent for unrecognized commands", async () => {
    const cmd = "foo-bar-baz --option";
    const result = await analyzeCommand(cmd);

    expect(result.intent).toBe("unknown");
    expect(result.safetyScore).toBe(10);
  });
});
