// One line, best line (Node 22, standard library only).
// The line is the whole entry: it is written to /output/entry.txt, where the gate reads it.
// A scroll-stopping truth about meetings, in one sentence.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE = 'Somewhere right now, a "quick five-minute meeting" is entering its third hour and asking if everyone can see its screen.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// One line means one line: no line breaks, and within the 240-character gate. Verify after
// writing by reading the file back, so the judge receives exactly this sentence.
if (LINE.length > 240 || LINE.includes('\n')) {
  console.error(`line is ${LINE.length} characters or multi-line: outside the gate's limits`);
  process.exit(1);
}
const target = join(outDir, 'entry.txt');
writeFileSync(target, LINE + '\n', 'utf8');
if (readFileSync(target, 'utf8') !== LINE + '\n') {
  console.error('entry.txt does not hold the line as written');
  process.exit(1);
}
