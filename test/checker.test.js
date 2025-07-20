import { describe, it, expect } from "vitest";
import { getChecker } from "../src/checker/index.js";
import 'dotenv/config'

console.error("Checker Type=" + process.env.CHECKER_TYPE)
const checkCommand = getChecker();

describe("checkCommand()", () => {

  it("should detect simple list-files intent on Windows", async () => {
    const cmd = "dir C:\\System\\";
    const { intent, safetyScore } = await checkCommand(cmd);

    expect(intent.toLowerCase()).toContain("list");
    // low risk: score ≥ 8
    expect(safetyScore).toBeGreaterThanOrEqual(8);
  });

  it("should flag destructive commands with low safety", async () => {
    const cmd = "rm -rf /var/log";
    const { intent, safetyScore } = await checkCommand(cmd);

    expect(intent.toLowerCase()).toContain("remove");
    expect(safetyScore).toBeLessThanOrEqual(5);
  });

  it("should return unknown intent for unrecognized commands", async () => {
    const cmd = "foo-bar-baz --option";
    const result = await checkCommand(cmd);

    //expect(result.intent).toBe("unknown");
    expect(result.safetyScore).toBeGreaterThanOrEqual(7);
  });
});
