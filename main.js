const puppeteer = require('puppeteer');
const fs = require('fs');
const { URL } = require('url');

async function captureParagraphs(page, url) {
  console.log(`Capturando párrafos de la página: ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const paragraphs = await page.evaluate(() => {
    const allParagraphs = Array.from(document.querySelectorAll('p'));
    return allParagraphs.map(p => p.textContent.trim());
  });

  return paragraphs;
}

async function captureSubpagesParagraphs(page, baseUrl, domain) {
  const subpages = [];

  console.log(`Capturando subpáginas de: ${baseUrl}`);
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

  const links = await page.evaluate((domain) => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    return allLinks
      .map(link => link.href)
      .filter(link => {
        try {
          const url = new URL(link);
          return url.hostname === domain;
        } catch (error) {
          return false;
        }
      });
  }, domain);

  for (const link of links) {
    const subpage = await captureParagraphs(page, link);
    subpages.push(...subpage);
  }

  return subpages;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url="www.negociapp.com";
  const baseUrl = 'https://'+url;
  const domain = new URL(baseUrl).hostname;
  const allParagraphs = await captureSubpagesParagraphs(page, baseUrl, domain);

  fs.writeFileSync('parrafos.txt' +url, allParagraphs.join('\n\n'));

  await browser.close();
})();
