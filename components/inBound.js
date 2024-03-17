// inBounds.js
function areCoordinatesWithinBounds(coordinates, minLng, maxLng, minLat, maxLat) {
    if (!Array.isArray(coordinates)) {
        throw new Error('Invalid coordinates format: Coordinates must be provided as an array.');
    }

    if (coordinates.length === 0) {
        // If coordinates array is empty, consider it as within bounds
        return true;
    }

    for (const coord of coordinates) {
        if (!Array.isArray(coord) || coord.length !== 2) {
            throw new Error('Invalid coordinates format: Each coordinate must be an array of length 2.');
        }

        const [lng, lat] = coord;
        if (typeof lng !== 'number' || typeof lat !== 'number') {
            throw new Error('Invalid coordinates format: Longitude and latitude must be numbers.');
        }
    }

    return coordinates.every(coord => {
        const [lng, lat] = coord;
        return lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat;
    });
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = areCoordinatesWithinBounds;
}
