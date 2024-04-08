function calculateManhattanDistance(coord1, coord2) {
    // Calculate Manhattan distance (L1 distance)
    return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);
}

function calculateEuclideanDistance(coord1, coord2) {
    // Calculate Euclidean distance (L2 distance)
    return Math.sqrt((coord1[0] - coord2[0]) ** 2 + (coord1[1] - coord2[1]) ** 2);
}

function determineBusDestination(currentCoord, previousCoord, schoolCoord) {
    // Calculate distances
    const manhattanCurrentDistance = calculateManhattanDistance(currentCoord, schoolCoord);
    const manhattanPreviousDistance = calculateManhattanDistance(previousCoord, schoolCoord);

    const euclideanCurrentDistance = calculateEuclideanDistance(currentCoord, schoolCoord);
    const euclideanPreviousDistance = calculateEuclideanDistance(previousCoord, schoolCoord);

    // Compare distances to determine bus direction
    let manhattanDirection, euclideanDirection;

    if (manhattanCurrentDistance < manhattanPreviousDistance) {
        manhattanDirection = "Returning to school";
    } else {
        manhattanDirection = "Going to station";
    }

    if (euclideanCurrentDistance < euclideanPreviousDistance) {
        euclideanDirection = "Returning to school";
    } else {
        euclideanDirection = "Going to station";
    }

    return { manhattanDirection, euclideanDirection };
}

// Example usage
const schoolCoord = [-73.949775, 40.819798]; // School coordinate
const currentCoord = [-73.949422, 40.820287]; // Current bus coordinate
const previousCoord = [-73.949000, 40.820881]; // Previous bus coordinate

const { manhattanDirection, euclideanDirection } = determineBusDestination(currentCoord, previousCoord, schoolCoord);
console.log(`Manhattan distance: ${manhattanDirection}`);
console.log(`Euclidean distance: ${euclideanDirection}`);
