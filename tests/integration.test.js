// integration.test.js
const getCoordinates = require('../components/getCoords');
const formatCoordinates = require('../components/formatCoords');

global.fetch = require('jest-fetch-mock');

test('Integration test: Fetch and format coordinates', async () => {
    fetch.mockResponseOnce(`40.712776,-74.005974\n40.712280,-74.006596`);

    // Simulate fetching coordinates
    const coordinates = await getCoordinates();

    // Simulate formatting coordinates
    const formattedCoordinates = formatCoordinates(coordinates);

    // Check if formatted coordinates are as expected
    expect(formattedCoordinates).toEqual([
        [-74.005974, 40.712776],
        [-74.006596, 40.712280]
    ]);
});
