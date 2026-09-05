// Printing to PDF through headless Chromium, shared by the three build scripts so the
// browser is found and launched the same way everywhere.
//
// Set CHROME_PATH if Edge or Chrome is not at a standard location, and CHROME_FLAGS for
// any extra launch flags. Chromium refuses to start as root, which is how it runs inside
// a container or a CI job, so --no-sandbox is added in that case alone: an ordinary user
// keeps the sandbox.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean);
  for (const p of candidates) if (existsSync(p)) return p;
  throw new Error('No Edge/Chrome found. Set CHROME_PATH to a Chromium browser.');
}

const asRoot = typeof process.getuid === 'function' && process.getuid() === 0;

export function printToPdf(browser, htmlPath, pdfPath, label) {
  const extra = (process.env.CHROME_FLAGS || '').split(/\s+/).filter(Boolean);
  if (asRoot && !extra.includes('--no-sandbox')) extra.push('--no-sandbox');
  try {
    execFileSync(browser, [
      '--headless=new', '--disable-gpu', '--no-pdf-header-footer', ...extra,
      `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href,
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (err) {
    const stderr = err.stderr ? String(err.stderr).trim().split('\n').slice(-5).join('\n') : '';
    throw new Error(`Chrome failed to print ${label}.` + (stderr ? `\n${stderr}` : ''));
  }
}
