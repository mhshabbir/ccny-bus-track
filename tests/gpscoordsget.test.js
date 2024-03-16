// gpscoordsget.test.js
const getCoordinates = require('../components/getCoords');

// Import jest-fetch-mock to mock the fetch function
global.fetch = require('jest-fetch-mock');

test('fetches coordinates successfully', async () => {
    // Mock the response from fetch
    fetch.mockResponseOnce(`40.712776,-74.005974\n40.712280,-74.006596`);
    
    // Call the function and await the result
    const coordinates = await getCoordinates();
    
    // Assert that the result is as expected
    expect(Array.isArray(coordinates)).toBe(true);
    expect(coordinates.length).toBeGreaterThan(0);
});
