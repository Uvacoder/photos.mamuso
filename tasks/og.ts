// -----------------------------------------------------------
// Dependencies
import * as fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import data from '../data/data.json';

// -----------------------------------------------------------
// Folders
const ogFolder = './public/og/';
const dataFolder = './data/export/';

(async () => {
  const nextjs = spawn('npx', ['next', 'dev', '-p', '885']);
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1024, height: 540 }
  });

  data.map(async (p) => {
    console.log(p);
    const basename = path.basename(p.fileName, path.extname(p.fileName));
    const page = await browser.newPage();
    await page.goto(`http://localhost:885/photo/${basename}–${slugify(p.title, { lower: true })}`, {
      waitUntil: 'networkidle0'
    });
    await page.waitForTimeout(400);
    console.log(`http://localhost:885/photo/${basename}–${slugify(p.title, { lower: true })}`);
    await page.screenshot({ path: `${ogFolder}${basename}.png` });
    await page.waitForTimeout(3000);
  });

  const page = await browser.newPage();
  await page.waitForTimeout(400);
  await page.goto('http://localhost:885/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${ogFolder}index.png` });
  await page.waitForTimeout(400);
  await page.close();
  await page.waitForTimeout(3000);

  await browser.close();
  await nextjs.kill('SIGHUP');
  await process.exit(0);
})();
