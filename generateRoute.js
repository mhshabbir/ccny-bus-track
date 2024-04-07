const route145 = [
    [-73.949775, 40.819798], // school
    [-73.949422, 40.820287],
    [-73.949000, 40.820881],
    [-73.948525, 40.821507],
    [-73.948076, 40.822128],
    [-73.947639, 40.822744],
    [-73.947175, 40.823378],
    [-73.946734, 40.823978],
    [-73.946238, 40.824604],
    [-73.944914, 40.824003], // 145th
    [-73.945450, 40.822777],
    [-73.946106, 40.821382],
    [-73.947161, 40.821772],
    [-73.948064, 40.822148],
    [-73.948525, 40.821507],
    [-73.949000, 40.820881],
    [-73.949422, 40.820287],
    [-73.949775, 40.819798] // school
];

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
function generateRoutePoints(route, numPointsPerSegment) {
    let points = [];
    for (let i = 0; i < route.length - 1; i++) {
        const segmentPoints = interpolatePoints(route[i], route[i + 1], numPointsPerSegment);
        points.push(...segmentPoints);
    }
    // Add the last point
    points.push(route[route.length - 1].slice());
    return points;
}

// Generate points along the route with interpolation
const sampleRoutePoints = generateRoutePoints(route145, 5); // Adjust the number of points per segment as needed

console.log(sampleRoutePoints);
