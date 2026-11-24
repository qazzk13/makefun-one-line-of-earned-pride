process.umask(0o022);
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: one line about persistence in review finally paying off.
const ENTRY =
  'Three weeks of my patches got rejected in review, then yesterday the maintainer merged my fix for the crash nobody else could reproduce and just wrote "finally".';

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf-8");
}

main();
