const { schoolCoord } = require('./busRoutes');
const getDistance = require('./getDistance')


// gets destination of a bus using its curr and prev coords
// calculates distance of bus and checks if it is getting further away from school
// if so it must be traveling to a station, else it is returning
function getDestination(currentCoord, previousCoord) {
    const schoolCoord = [-73.949775, 40.819798]
    // Calculate distances
    const manhattanCurrentDistance = getDistance.calculateManhattanDistance(currentCoord, schoolCoord);
    const manhattanPreviousDistance = getDistance.calculateManhattanDistance(previousCoord, schoolCoord);

    const euclideanCurrentDistance = getDistance.calculateEuclideanDistance(currentCoord, schoolCoord);
    const euclideanPreviousDistance = getDistance.calculateEuclideanDistance(previousCoord, schoolCoord);

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

module.exports = { getDestination }