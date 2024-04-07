/**
 * This JavaScript code estimates the time for a bus to reach the 145th station and the school stop.
 * It uses a set of predefined route points, each with coordinates and times to both destinations.
 * The code determines the direction of the bus (towards the 145th station or towards the school)
 * by comparing the distances from the current and previous coordinates to a reference point.
 * Then, it finds the closest route point to the current bus location and estimates the time
 * to the next stop based on the direction of travel.
 */

// School and 145th Station fixed coordinates
const middleCoord = { lat: 40.824003, lon: -73.944914 }; // 145th station coordinates

const routePoints = [
    { coord: { lat: 40.819798, lon: -73.949775 }, timeTo145th: 9, timeToSchool: 0 },
    { coord: { lat: 40.820287, lon: -73.949422 }, timeTo145th: 8, timeToSchool: 16 },
    { coord: { lat: 40.820881, lon: -73.949000 }, timeTo145th: 7, timeToSchool: 15 },
    { coord: { lat: 40.821507, lon: -73.948525 }, timeTo145th: 6, timeToSchool: 14 },
    { coord: { lat: 40.822128, lon: -73.948076 }, timeTo145th: 5, timeToSchool: 13 },
    { coord: { lat: 40.822744, lon: -73.947639 }, timeTo145th: 4, timeToSchool: 12 },
    { coord: { lat: 40.823378, lon: -73.947175 }, timeTo145th: 3, timeToSchool: 11 },
    { coord: { lat: 40.823978, lon: -73.946734 }, timeTo145th: 2, timeToSchool: 10 },
    { coord: { lat: 40.824604, lon: -73.946238 }, timeTo145th: 1, timeToSchool: 9 },
    { coord: { lat: 40.824003, lon: -73.944914 }, timeTo145th: 0, timeToSchool: 8 },
    { coord: { lat: 40.822777, lon: -73.945450 }, timeTo145th: 16, timeToSchool: 7 },
    { coord: { lat: 40.821382, lon: -73.946106 }, timeTo145th: 15, timeToSchool: 6 },
    { coord: { lat: 40.821772, lon: -73.947161 }, timeTo145th: 14, timeToSchool: 5 },
    { coord: { lat: 40.822148, lon: -73.948064 }, timeTo145th: 13, timeToSchool: 4 },
    { coord: { lat: 40.821507, lon: -73.948525 }, timeTo145th: 12, timeToSchool: 3 },
    { coord: { lat: 40.820881, lon: -73.949000 }, timeTo145th: 11, timeToSchool: 2 },
    { coord: { lat: 40.820287, lon: -73.949422 }, timeTo145th: 10, timeToSchool: 1 },
    { coord: { lat: 40.819798, lon: -73.949775 }, timeTo145th: 9, timeToSchool: 0 }
];
  
// Function to calculate Euclidean distance between two points
function calculateDistance(coord1, coord2) {
    const latDiff = coord1.lat - coord2.lat;
    const lonDiff = coord1.lon - coord2.lon;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
}

// Function to determine the direction of the bus
function determineDirection(currentCoord, previousCoord, middleCoord) {
    const distanceTo145th = calculateDistance(currentCoord, middleCoord);
    const previousDistanceTo145th = calculateDistance(previousCoord, middleCoord);
    
    if (distanceTo145th < previousDistanceTo145th) { return 'to_145th'; } 
    else { return 'to_School'; }
}

// Function to estimate the time to the closest stop
function estimateTimeToStops(currentCoord, previousCoord, middleCoord) {
    const closestPoint = routePoints.reduce((closest, point) => {
        const distance = calculateDistance(currentCoord, point.coord);
        return distance < closest.distance ? { distance, point } : closest;
    }, { distance: Infinity, point: null });

    const direction = determineDirection(currentCoord, previousCoord, middleCoord);

    if (direction === 'to_145th') {
        return closestPoint.point.timeTo145th;
    } else {
        return closestPoint.point.timeToSchool;
    }
}

// Example simulation using coordinates from the routePoints array
const prev_coord = routePoints[0].coord; // Using the first coordinate from the routePoints array
const current_coord = routePoints[1].coord; // Using the second coordinate from the routePoints array

const timeToStop = estimateTimeToStops(current_coord, prev_coord, middleCoord);
console.log(`Estimated time to the closest stop is ${timeToStop} minutes.`);

// Expected Output:
// If the bus is moving from the first to the second point in the routePoints array,
// and assuming the bus is moving towards the 145th station, the expected output would be:
// "Estimated time to the closest stop is 8 minutes."
// This output assumes that the second point in the routePoints array has a timeTo145th value of 8.