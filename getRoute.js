// gets the route of the bus by determining if it is currently above or below the line which 
// marks which station the bus is going, ie if coord is north of 135, or coord is above that line
// bus is traveling to 145 else traveling to 125

function getRoute(coordinate) {
    // Coordinates of Point A and Point B used to calculate the equation of the line
    // const pointA = [-73.951239, 40.820304];
    // const pointB = [-73.948412, 40.819025];

    const m = -0.45242306331741994; // slope (m) = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
    const b = 7.363057915501344    // Calculate y-intercept (b) = pointA[1] - m * pointA[0];

    // Calculate expected y-coordinate
    const yExpected = m * coordinate[0] + b;

    // Compare actual y-coordinate with expected y-coordinate
    if (coordinate[1] > yExpected) { return "145th"; } 
    else { return "125th"; }
}

module.exports = { getRoute }