const { test, chromium } = require('@playwright/test');

test('e2e', async () => {
    // Open the browser and launch the Chromium
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Component Page
    await page.goto('http://localhost:3000/');

    // check for the buttons to be present
    await page.waitForSelector('text=Sign Up');
    await page.waitForSelector('text=Login');

    // Sign up State
    await page.click('text=Sign Up');

    // enter details 
    await page.fill('input[placeholder="Name"]', 'Test User');
    await page.fill('input[placeholder="Email ID"]', 'test@example.com');
    await page.fill('input[placeholder="Password"]', 'password123');

    // Click the submit button
    await page.click('input[type="submit"]');

    // Close the browser
    await browser.close();
});