// gpscoordformatter.js
function formatCoordinates(coordinates) {
    return coordinates.map(coord => [coord[1], coord[0]]);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = formatCoordinates;
}
