// One Word for Your Wi-Fi — make.fun bounty
// u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72
//
// Writes exactly one word to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: fixed word, no input, no randomness, no time, no I/O
// beyond the single output file.
//
// The chosen word: "Situationship"
//   - A situationship is a relationship with no label and no commitment:
//     hot one minute, distant the next, never quite there when you need
//     it, always back again like nothing happened. That is exactly how
//     home Wi-Fi behaves: full bars in the kitchen, one bar on the sofa,
//     gone mid-call, back before you finish complaining.
//   - Funny at once: the dating-slang frame lands instantly — everyone
//     knows a situationship, and everyone has lived with this Wi-Fi.
//   - True to how home Wi-Fi actually behaves, so the joke lands because
//     it is recognisable, not because it needs explaining.
//   - A surprising angle: it dodges the words everyone reaches for
//     (slow, buffering, laggy, dead) and reframes the annoyance as a
//     relationship status instead of a speed complaint — so it reads as
//     a joke about the Wi-Fi and about the person naming it, at once.
//   - Works as a single word with no context needed: one familiar word,
//     spelled plainly, and the reader gets it instantly.
//   - 13 bytes, well inside the 1–20 character gate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Situationship";

// Own gate: exactly one word, 1–20 chars, no whitespace.
if (WORD.length < 1 || WORD.length > 20) {
  throw new Error(`word length ${WORD.length} outside the 1-20 gate`);
}
if (/\s/.test(WORD)) {
  throw new Error("word must contain no whitespace");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Read back and confirm the file holds exactly the gated entry.
const written = readFileSync(outPath, "utf8");
if (written !== WORD) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`);
}
