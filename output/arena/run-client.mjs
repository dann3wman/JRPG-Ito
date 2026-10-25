import { chromium } from 'file:///C:/Users/dnewman/.codex/node_modules/playwright/index.mjs';
const launch = chromium.launch.bind(chromium);
chromium.launch = options => launch({ ...options, executablePath:'C:/Users/dnewman/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe' });
await import('file:///C:/Users/dnewman/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js');
