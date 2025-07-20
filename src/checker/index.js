import { checkerLocal } from "./checkerLocal.js";
import { checkerGemini } from "./checkerGemini.js";
import 'dotenv/config'

export function getChecker() {
  // Use env var CHECKER_TYPE=gemini or default to local
  const type = process.env.CHECKER_TYPE;
  if (type === "gemini") return checkerGemini;
  return checkerLocal;
}
