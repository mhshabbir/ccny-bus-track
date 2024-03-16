const areCoordinatesWithinBounds = require('../components/inBound');

test('coordinates are within bounds', () => {
    const coordinates = [[-73.959, 40.816], [-73.940, 40.820], [-73.950, 40.818]];
    const minLng = -73.960478;
    const maxLng = -73.938767;
    const minLat = 40.812534;
    const maxLat = 40.822371;
    
    const result = areCoordinatesWithinBounds(coordinates, minLng, maxLng, minLat, maxLat);
    
    expect(result).toBe(true);
});

test('coordinates are not within bounds', () => {
    const coordinates = [[-73.959, 40.816], [-73.940, 40.820], [-73.935, 40.818]];
    const minLng = -73.960478;
    const maxLng = -73.938767;
    const minLat = 40.812534;
    const maxLat = 40.822371;
    
    const result = areCoordinatesWithinBounds(coordinates, minLng, maxLng, minLat, maxLat);
    
    expect(result).toBe(false);
});
