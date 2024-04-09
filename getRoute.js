function getRoute(coordinate) {
    // Coordinates of Point A and Point B
    const pointA = [-73.951239, 40.820304];
    const pointB = [-73.948412, 40.819025];

    // Calculate slope (m)
    const m = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);

    // Calculate y-intercept (b)
    const b = pointA[1] - m * pointA[0];

    // Calculate expected y-coordinate
    const yExpected = m * coordinate[0] + b;

    // Compare actual y-coordinate with expected y-coordinate
    if (coordinate[1] > yExpected) {
        return "145th";
    } else {
        return "125th";
    }
}

module.exports = { getRoute }