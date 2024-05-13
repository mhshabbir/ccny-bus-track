// Calculate Euclidean distance (L2 distance)
function calculateEuclideanDistance(coord1, coord2) {
    return Math.sqrt(Math.pow(coord1[0] - coord2[0], 2) + Math.pow(coord1[1] - coord2[1], 2));
}

module.exports = { calculateEuclideanDistance }
function atStop(current_coord) {
    const schoolCoord = [-73.949775, 40.819798];
    const station125 = [-73.945460, 40.807812];
    const station145 = [-73.944914, 40.824003];

    const radius = .000245;

    // Calculate distances to each stop
    const distanceToSchool = calculateEuclideanDistance(current_coord, schoolCoord);
    const distanceToStation125 = calculateEuclideanDistance(current_coord, station125);
    const distanceToStation145 = calculateEuclideanDistance(current_coord, station145);

    // Check if current coordinate is within radius of each stop
    if (distanceToSchool <= radius) { return "CCNY"; } 
    else if (distanceToStation125 <= radius) { return "125"; } 
    else if (distanceToStation145 <= radius) { return "145"; } 
    else { return false; }
}

module.exports = { atStop };