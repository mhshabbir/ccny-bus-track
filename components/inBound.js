// inBounds.js
function areCoordinatesWithinBounds(coordinates, minLng, maxLng, minLat, maxLat) {
    return coordinates.every(coord => {
        const [lng, lat] = coord;
        return lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat;
    });
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = areCoordinatesWithinBounds;
}
