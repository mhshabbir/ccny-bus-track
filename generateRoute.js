// Function to interpolate points between two coordinates
function interpolatePoints(coord1, coord2, numPoints) {
    const latDiff = (coord2[0] - coord1[0]) / numPoints;
    const lonDiff = (coord2[1] - coord1[1]) / numPoints;
    let points = [coord1.slice()]; // Start with the first point
    for (let i = 1; i < numPoints; i++) {
        const lat = parseFloat((coord1[0] + latDiff * i).toFixed(6));
        const lon = parseFloat((coord1[1] + lonDiff * i).toFixed(6));
        points.push([lat, lon]);
    }
    return points;
}

// Function to generate points along the route
function generateRoute(route, numPointsPerSegment) {
    let points = [];
    for (let i = 0; i < route.length - 1; i++) {
        const segmentPoints = interpolatePoints(route[i], route[i + 1], numPointsPerSegment);
        points.push(...segmentPoints);
    }
    // Add the last point
    points.push(route[route.length - 1].slice());
    return points;
}

module.exports = { generateRoute }