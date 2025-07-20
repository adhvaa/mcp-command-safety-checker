// Heuristic patterns for intent detection
const INTENT_PATTERNS = [
  { intent: "list files",       regex: /\b(ls|dir)\b/ },
  { intent: "make directory",   regex: /\bmkdir\b/ },
  { intent: "remove files",     regex: /\b(rm|del)\b/ },
  { intent: "download",         regex: /\b(curl|wget)\b/ },
  { intent: "network test",     regex: /\b(ping|traceroute|tracert)\b/ },
  { intent: "process check",    regex: /\b(ps|top|tasklist)\b/ },
  { intent: "file search",      regex: /\b(find|grep)\b/ },
  { intent: "system reboot",    regex: /\b(reboot|shutdown)\b/ },
  { intent: "permission change",regex: /\b(chmod|chown)\b/ },
  { intent: "container action", regex: /\b(docker|kubectl)\b/ },
  { intent: "version control",  regex: /\b(git)\b/ }
];

// Risky tokens/operators that lower safety score
const RISKY_TOKENS = [
  /\b(rm|del|format)\b/,    // destructive commands
  /[;&|]/,                  // pipe, condi- tions, chaining
  /`|\$\(.*\)/,            // command substitution
  />{1,2}/,                 // redirection
  /\b(shutdown|reboot)\b/,  // system-level
  /\b(eval|exec)\b/         // code execution
];


export async function checkerLocal(command) {
    // 1. Compute risk count
    let riskCount = 0;
    for (const tok of RISKY_TOKENS) {
        if (tok.test(command)) riskCount += 2;
    }
    // Cap riskCount so score >= 0
    riskCount = Math.min(riskCount, 10);

    // 2. Calculate safety score
    const safetyScore = Math.max(0, 10 - riskCount);

    // 3. Detect intent (first match)
    let intent = "unknown";
    for (const { intent: desc, regex } of INTENT_PATTERNS) {
        if (regex.test(command)) {
            intent = desc;
            break;
        }
    }

    // 4. Return structured JSON
    return { safetyScore, intent };
}