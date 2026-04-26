# Agent Guidelines

Always respond in Chinese.

## Project Preferences

| Area           | Preference                                                                 |
| :------------- | :------------------------------------------------------------------------- |
| **Tech Stack** | Phaser + TypeScript + Vite for all game projects.                      |
| **Language**   | TypeScript is the primary language for project code.                       |
| **Port**       | Use port **8082** for the local game server.                               |
| **Startup**    | Before starting the local game server, terminate any existing process already listening on the target port. |
| **Testing**    | Always run `tsc --noEmit` to type-check for errors before considering tests complete. |

---

## Development Workflow
Set up each new game project by running:

```bash
npm install phaser vite && npm install -D typescript && npm install -D vitest @vitest/ui
```

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: *"Would a senior engineer say this is overcomplicated?"* If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that **your** changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass."
- "Fix the bug" → "Write a test that reproduces it, then make it pass."
- "Refactor X" → "Ensure tests pass before and after."

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria enable independent execution. Weak criteria ("make it work") require constant clarification.

---

## Testing

### Test-Driven Development (TDD)

- Follow the **Red → Green → Refactor** cycle.
- Run tests and use Playwright MCP to mock operations.
- After tests pass, refactor code.

---

## Generating Standalone Version

When the user requests a **standalone version**, generate a self-contained HTML bundle that runs by opening `index.html` directly in a browser — no server or build toolchain required.

### Steps

1. **Clean & Create** — Delete any existing `<project-name>-standalone/` directory, then create a fresh one alongside the original project. Do **not** modify original project files.
2. **Directory Structure** — `index.html` + `js/scenes/` + `js/main.js`
3. **Convert to JavaScript** — Strip type annotations and `import/export` statements from TypeScript sources; expose classes on the global scope.
4. **Copy Assets** — Replicate all asset files (sprites, textures, animations, audio, etc.) into the standalone folder and verify all references resolve correctly.
5. **Load Phaser via CDN** — Use `<script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>` in `index.html`.
6. **Verify** — Ensure the output structure is correct and the game runs via the `file://` protocol.

