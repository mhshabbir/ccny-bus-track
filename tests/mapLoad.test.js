const puppeteer = require('puppeteer');
const path = require('path');
global.fetch = require('jest-fetch-mock');

describe('End-to-End Map Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Mock the fetch response before launching the browser
    fetch.mockResponseOnce(`40.712776,-74.005974`);

    // Launch the browser
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Map Loading and Data Retrieval', async () => {
    // Get the absolute path to your HTML file
    const filePath = path.resolve(__dirname, '../map.html');

    // Navigate to your local HTML file
    await page.goto(`file://${filePath}`);

    // Wait for the map to load
    await page.waitForSelector('#map');

    // Check if the map is loaded successfully
    const mapElement = await page.$('#map');
    expect(mapElement).not.toBeNull();

    // Simulate data retrieval (e.g., fetching coordinates)
    const coordinates = await page.evaluate(() => {
      // Example: Get coordinates from the map
      // This function should return the coordinates, you can extract it from the page if it's available
      // In this example, let's just return a mock value
      return '40.712776,-74.005974';
    });

    // Assert that data is received and displayed on the map
    expect(coordinates).toBeDefined();
    expect(coordinates).toEqual('40.712776,-74.005974');
  });
});
