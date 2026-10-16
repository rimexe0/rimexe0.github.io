<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Protected behavior

Keep these working after every change, including package upgrades and hydration or lint fixes:

- The page background gets a new random pastel color on every fresh load (`generateColor()` in `src/components/helpers/helping.ts`, applied in `src/app/background.tsx`). Card colors stay deterministic for hydration safety.
- The two scrolling logo layers keep their rotation, opposite scroll directions, mouse parallax, and eased pause while the cursor moves.
- Card entrance animations and backdrop blur.
