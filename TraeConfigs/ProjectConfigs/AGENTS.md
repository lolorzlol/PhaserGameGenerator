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

1. **Create a new directory** `<project-name>-standalone/` next to the original project (do NOT modify original files).

2. **Directory structure:**
   ```
   <project-name>-standalone/
   ├── index.html          # Main page with CDN Phaser + script tags
   └── js/
       ├── scenes/         # All scene files (converted from TS)
       │   ├── BootScene.js
       │   ├── GameScene.js
       │   └── ...
       └── main.js         # Game config, loads all scenes
   ```

3. **Convert TypeScript to plain JavaScript:**
   - Remove all TypeScript syntax (`: type`, `as Type`, `interface`, `type`, `private`, `public`, `readonly`, `Record<>`, etc.)
   - Remove `import/export` statements (use global scope, Phaser loaded via CDN)
   - Use plain JS class syntax, no access modifiers
   - Keep `Phaser.GameObjects.Arc` instead of `Phaser.GameObjects.Circle` (the runtime type for `this.add.circle`)
   - Replace template literals in string literals if needed for older browser compatibility (usually fine to keep)
   - Convert `Record<K, V>` to plain `{}` object literals

4. **`index.html` template:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Game Title</title>
     <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
     <style>/* original styles */</style>
   </head>
   <body>
     <div id="game-container"></div>
     <!-- Import all scene files in order -->
     <script src="js/scenes/BootScene.js"></script>
     <script src="js/scenes/GameScene.js"></script>
     <!-- ... other scenes -->
     <script src="js/main.js"></script>
   </body>
   </html>
   ```

5. **`main.js` template:**
   ```js
   const config = {
     type: Phaser.AUTO,
     width: 800,  // adjust to project's original size
     height: 600,
     parent: 'game-container',
     backgroundColor: '#0f3460',
     scene: [BootScene, GameScene /* ... all scenes in order */],
     scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
   };
   const game = new Phaser.Game(config);
   ```

6. **Verify** by serving with `python -m http.server <port>` and testing in browser, or confirm the structure is correct for direct `file://` protocol opening.

