// getCoords.test.js
// integration test
const getCoordinates = require('../components/getCoords');

// Import jest-fetch-mock to mock the fetch function
global.fetch = require('jest-fetch-mock');

test('fetches coordinates successfully when response is an object', async () => {
    // Mock the response from fetch
    fetch.mockResponseOnce(JSON.stringify({ coordinates: [40.712776,-74.005974] }));
    
    // Call the function and await the result
    const coordinates = await getCoordinates();
    
    // Assert that the result is as expected
    expect(Array.isArray(coordinates)).toBe(true);
    expect(coordinates.length).toBeGreaterThan(0);
});

test('fetches coordinates successfully when response is an array', async () => {
    // Mock the response from fetch
    fetch.mockResponseOnce(JSON.stringify([40.712776,-74.005974]));
    
    // Call the function and await the result
    const coordinates = await getCoordinates();
    
    // Assert that the result is as expected
    expect(Array.isArray(coordinates)).toBe(true);
    expect(coordinates.length).toBeGreaterThan(0);
});

test('throws an error when response is a string', async () => {
    // Mock the response from fetch
    fetch.mockResponseOnce(JSON.stringify("40.712776,-74.005974"));
    
    // Call the function and expect it to throw an error
    await expect(getCoordinates()).rejects.toThrow();
});
