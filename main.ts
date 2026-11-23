// Monday 23 November 2026, summed up as one front page.
//
// This program ships the finished image next to it and places a copy
// where the grader looks. Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The grader sets MAKEFUN_OUTPUT_DIR itself; without it, /output is used.

import { copyFileSync, mkdirSync, openSync, readSync, closeSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname);
const source = join(root, 'entry.png');
const targetDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// A PNG always opens with 0x89 'PNG'. Refuse to hand over anything else.
const handle = openSync(source, 'r');
const head = Buffer.alloc(4);
readSync(handle, head, 0, 4, 0);
closeSync(handle);
if (head[0] !== 0x89 || head.toString('ascii', 1, 4) !== 'PNG') {
  throw new Error('entry.png does not start with a PNG header');
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, join(targetDir, 'entry.png'));
