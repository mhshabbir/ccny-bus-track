const getDistance = require('./getDistance')

function getDestination(currentCoord, previousCoord, schoolCoord) {
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