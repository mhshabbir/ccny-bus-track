const puppeteer = require('puppeteer');
const path = require('path');

describe('Map Rendering', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    const filePath = path.resolve(__dirname, '..', 'map.html');
    await page.goto('file://' + filePath);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Map is rendered', async () => {
    const mapElement = await page.$('#map');
    expect(mapElement).not.toBeNull();
  });

  test('Map updates when new coordinates are obtained', async () => {
    // Wait for the map to load
    await page.waitForSelector('#map');

    // Log the HTML content of the map element
    const mapHtml = await page.evaluate(() => {
      const map = document.getElementById('map');
      return map.innerHTML;
    });
    console.log('Map HTML:', mapHtml);

    // Get the initial icon position
    const initialIconPosition = await page.evaluate(() => {
      const map = document.getElementById('map');
      const marker = map.querySelector('.mapboxgl-marker');
      if (!marker) {
        console.error('Marker element not found');
        return null;
      }

      const markerRect = marker.getBoundingClientRect();
      return {
        x: markerRect.x,
        y: markerRect.y
      };
    });

    if (!initialIconPosition) {
      // If marker element was not found, fail the test
      throw new Error('Marker element not found');
    }

    // Simulate updating coordinates
    await page.evaluate(() => {
      window.updateLocation();
    });

    // Wait for the map to update
    await page.waitForTimeout(3000);

    // Get the updated icon position
    const updatedIconPosition = await page.evaluate(() => {
      const map = document.getElementById('map');
      const marker = map.querySelector('.mapboxgl-marker');
      if (!marker) {
        console.error('Marker element not found after update');
        return null;
      }

      const markerRect = marker.getBoundingClientRect();
      return {
        x: markerRect.x,
        y: markerRect.y
      };
    });

    if (!updatedIconPosition) {
      // If marker element was not found after update, fail the test
      throw new Error('Marker element not found after update');
    }

    // Check if the icon position has changed
    expect(updatedIconPosition).not.toEqual(initialIconPosition);
  });
});
