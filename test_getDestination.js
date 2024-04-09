const busRoutes = require('./busRoutes.js');
const getDestination = require('./getDestination.js')

function testGetDestination(route, schoolCoord) {
    let previousCoord = route[0]; // Start at the first point
    let currentCoord;
    let stationReached = false;

    for (let i = 1; i < route.length; i++) {
        currentCoord = route[i];
        const { manhattanDirection, euclideanDirection } = getDestination.getDestination(currentCoord, previousCoord, schoolCoord);

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

console.log("Testing route 145 to CCNY:");
testGetDestination(busRoutes.route_145_CCNY, busRoutes.schoolCoord);

console.log("-----------------------------------------------------------")

console.log("Testing route 125 to CCNY:");
testGetDestination(busRoutes.route_125_CCNY, busRoutes.schoolCoord);
