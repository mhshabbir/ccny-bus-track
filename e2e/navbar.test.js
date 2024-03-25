// e2e/navbar.test.js
const { chromium } = require('playwright');

describe('Navbar E2E', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  it('navigates to correct route on link click', async () => {
    await page.goto('http://localhost:3000'); // Adjust the port if needed

    await page.click('text=Public Safety');
    expect(await page.url()).toBe('http://localhost:3000/public-safety');

    await page.click('text=Login/Signup');
    expect(await page.url()).toBe('http://localhost:3000/login-signup');
  });
});

