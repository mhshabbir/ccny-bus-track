const getDistance = require('./getDistance')

function atStop(current_coord) {
    const schoolCoord = [-73.949775, 40.819798];
    const station125 = [-73.945460, 40.807812];
    const station145 = [-73.944914, 40.824003];

    const radius = .000245;

    // Calculate distances to each stop
    const distanceToSchool = getDistance.calculateEuclideanDistance(current_coord, schoolCoord);
    const distanceToStation125 = getDistance.calculateEuclideanDistance(current_coord, station125);
    const distanceToStation145 = getDistance.calculateEuclideanDistance(current_coord, station145);

    // Check if current coordinate is within radius of each stop
    if (distanceToSchool <= radius) { return "CCNY"; } 
    else if (distanceToStation125 <= radius) { return "125"; } 
    else if (distanceToStation145 <= radius) { return "145"; } 
    else { return false; }
}

module.exports = { atStop };