# Agent Guidelines

Always respond in Chinese.

## Project Preferences

| Area           | Preference                                                                 |
| :------------- | :------------------------------------------------------------------------- |
| **Tech Stack** | Phaser + TypeScript + Vite for all game projects.                      |
| **Language**   | TypeScript is the primary language for project code.                       |
| **Port**       | Use port **8082** for the local game server.                               |
| **Startup**    | Before starting the local game server, terminate any existing process already listening on the target port. |

---

## Development Workflow
Set up each new game project by running:

```bash
npm install phaser vite && npm install -D typescript
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

When the user says "生成独立版本", create a standalone HTML version that can run by double-clicking `index.html` without any server or build tool.

### Steps


1. **Delete any existing** `<project-name>-standalone/` directory if present, then create a fresh one next to the original project (do NOT modify original files).
2. **Directory structure:** `index.html` + `js/scenes/` + `js/main.js`
3. **Convert TypeScript to plain JavaScript:** remove type annotations, `import/export` statements, and use the global scope.
4. **Load Phaser via CDN:** `https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js`
5. **Verify:** ensure the structure is correct and can be opened directly via the `file://` protocol.

