// getCoords.js
async function getCoordinates() {
    const response = await fetch('file://' + __dirname + '/coordinates.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const coordinates = lines.map(line => line.split(',').map(parseFloat));
    return coordinates;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = getCoordinates;
}
