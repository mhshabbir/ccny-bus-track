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


const schoolCoord = [-73.949775, 40.819798]
const station125 = [-73.945460, 40.807812]
const station145 = [-73.944914, 40.824003]

const route125 = [
    [-73.949774, 40.819598],
    [-73.950853, 40.818407],
    [-73.952290, 40.817242],
    [-73.952864, 40.815850],
    [-73.952983, 40.815080],
    [-73.953092, 40.814298],
    [-73.953163, 40.812708],
    [-73.953542, 40.812064],
    [-73.954016, 40.811379],
    [-73.952603, 40.810767],
    [-73.951180, 40.810186],
    [-73.949929, 40.809658],
    [-73.948335, 40.808982],
    [-73.946976, 40.808410],
    [-73.945460, 40.807812], // 125th
    [-73.944996, 40.808453],
    [-73.944523, 40.809070],
    [-73.947381, 40.810281],
    [-73.950223, 40.811462],
    [-73.951505, 40.812036],
    [-73.953163, 40.812708],
    [-73.953092, 40.814298],
    [-73.952983, 40.815080],
    [-73.952864, 40.815850],
    [-73.952290, 40.817242],
    [-73.950853, 40.818407],
    [-73.949774, 40.819598] // school
];

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

function testRoute(route, schoolCoord) {
    let previousCoord = route[0]; // Start at the first point
    let currentCoord;
    let stationReached = false;

    for (let i = 1; i < route.length; i++) {
        currentCoord = route[i];
        const { manhattanDirection, euclideanDirection } = determineBusDestination(currentCoord, previousCoord, schoolCoord);

        // Check if the bus has reached the station
        if (!stationReached && manhattanDirection === "Going to station" && euclideanDirection === "Going to station") {
            console.log(`At coordinate ${i}, the bus is going to the station.`);
        } else if (!stationReached && (manhattanDirection === "Returning to school" || euclideanDirection === "Returning to school")) {
            console.log(`At coordinate ${i}, the bus has reached the station and is now returning to school.`);
            stationReached = true;
        } else if (stationReached) {
            console.log(`At coordinate ${i}, the bus is returning to school.`);
        }

        // Update previous coordinate
        previousCoord = currentCoord;
    }
}

console.log("Testing route 145:");
testRoute(route145, schoolCoord);

console.log("-----------------------------------------------------------")

console.log("Testing route 125:");
testRoute(route125, schoolCoord);
