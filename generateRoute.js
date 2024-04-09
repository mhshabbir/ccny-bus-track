// Function to interpolate points between two coordinates
// Draws a line between the given coordinates and creates n points approximately lying on that line
function interpolatePoints(coord1, coord2, numPoints) {
    // Calculate the differences in latitude and longitude between the two coordinates
    const latDiff = (coord2[0] - coord1[0]) / numPoints;
    const lonDiff = (coord2[1] - coord1[1]) / numPoints;
    
    // Initialize an array to store the interpolated points, starting with the first point
    let points = [coord1.slice()];

    // Iterate to generate interpolated points
    for (let i = 1; i < numPoints; i++) {
        // Generate random error proportional to the difference
        const latError = latDiff * (Math.random() * 0.2 - 0.1); // Random error
        const lonError = lonDiff * (Math.random() * 0.2 - 0.1); 
        // Calculate the latitude and longitude of the interpolated point with random error
        const lat = parseFloat((coord1[0] + latDiff * i + latError).toFixed(6));
        const lon = parseFloat((coord1[1] + lonDiff * i + lonError).toFixed(6));
        // Add the interpolated point to the array
        points.push([lat, lon]);
    }
    return points; // Return the array of interpolated points
}

// Function to generate points along the route by interpolating between route points
function generateRoute(route, numPointsPerSegment) {
    let points = []; // Initialize an array to store all points along the route
    // Iterate through each segment of the route
    for (let i = 0; i < route.length - 1; i++) {
        // Interpolate points between consecutive route points for the current segment
        const segmentPoints = interpolatePoints(route[i], route[i + 1], numPointsPerSegment);
        points.push(...segmentPoints); // Add the interpolated points to the array
    }
    // Add the last point of the route
    points.push(route[route.length - 1].slice());
    return points; // Return the array of points along the entire route
}

module.exports = { generateRoute };
