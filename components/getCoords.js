// getCoords.js
async function getCoordinates() {
const response = await fetch('coordinates.json'); // Replace with actual endpoint
    if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
    }
    const data = await response.json(); // Assuming response is JSON
    if (Array.isArray(data)) {
        return data;
    } else if (typeof data === 'object' && data !== null && Array.isArray(data.coordinates)) {
        return data.coordinates;
    } else {
        throw new Error('Unexpected data format');
    }
}


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = getCoordinates;
}
