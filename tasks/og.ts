// -----------------------------------------------------------
// Dependencies
import * as fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import data from '../data/data.json';

// -----------------------------------------------------------
// Folders
const ogFolder = './public/og/';

(async () => {
  const nextjs = spawn('npx', ['next', 'dev', '-p', '885']);
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1024, height: 768 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:885/', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'example.png' });
  await page.close();
  await browser.close();
  nextjs.kill('SIGHUP');
})();
